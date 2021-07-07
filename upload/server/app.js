/*
 * @Author: xiaohuolong
 * @Date: 2021-07-07 14:19:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-07 17:17:11
 * @FilePath: /js-demo/upload/server/app.js
 */
const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const cors = require("@koa/cors");
const multer = require("@koa/multer");
const Router = require("@koa/router");
const fse = require("fs-extra")

const app = new Koa();
const router = new Router();
const PORT = 3000;
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`;
// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, "/public/upload");

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        let relativePath = file.originalname.replace(/@/g, path.sep);
        let index = relativePath.lastIndexOf(path.sep);
        let fileDir = path.join(UPLOAD_DIR, relativePath.substr(0, index));
        // 确保文件目录存在，若不存在的话，会自动创建
        await fse.ensureDir(fileDir); 
        cb(null, fileDir);
    },
    filename: function (req, file, cb) {
        let parts = file.originalname.split("@");
        cb(null, `${parts[parts.length - 1]}`); 
    },
});

const multerUpload = multer({ storage });

router.get("/", async (ctx) => {
    ctx.body = "欢迎使用文件服务";
});

router.post(
    "/upload/single",
    async (ctx, next) => {
        try {
            await next();
            ctx.body = {
                code: 1,
                msg: "文件上传成功",
                url: `${RESOURCE_URL}/${ctx.file.originalname}`,
            };
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: "文件上传失败"
            };
        }
    },
    multerUpload.single("file")
);
router.post(
    "/upload/multiple",
    async (ctx, next) => {
        try {
            await next();
            urls = ctx.files.file.map(file => `${RESOURCE_URL}/${file.originalname.replace(/@/g, path.sep)}`);
            ctx.body = {
                code: 1,
                msg: "文件上传成功",
                urls,
            };
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: "文件上传失败"
            };
        }
    },
    multerUpload.fields([
        {
           name: "file", // 与FormData表单项的fieldName想对应
        },
    ])
);
router.get("/upload/exists", async (ctx) => {
    const { name: fileName, md5: fileMd5 } = ctx.query;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const isExists = await fse.pathExists(filePath);
    if (isExists) {
            ctx.body = {
                status: "success",
                data: {
                isExists: true,
                url: `http://localhost:3000/${fileName}`,
                },
            };
    } else {
        let chunkIds = [];
        const chunksPath = path.join(TMP_DIR, fileMd5);
        const hasChunksPath = await fse.pathExists(chunksPath);
        if (hasChunksPath) {
            let files = await readdir(chunksPath);
            chunkIds = files.filter((file) => {
                return IGNORES.indexOf(file) === -1;
            });
        }
        ctx.body = {
            status: "success",
            data: {
                isExists: false,
                chunkIds,
            },
        };
    }
});

router.get("/upload/concatFiles", async (ctx) => {
    const { name: fileName, md5: fileMd5 } = ctx.query;
    await concatFiles(
        path.join(TMP_DIR, fileMd5),
        path.join(UPLOAD_DIR, fileName)
    );
    ctx.body = {
        status: "success",
        data: {
            url: `http://localhost:3000/${fileName}`,
        },
    };
});

async function concatFiles(sourceDir, targetPath) {
    const readFile = (file, ws) =>
        new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .on("data", (data) => ws.write(data))
            .on("end", resolve)
            .on("error", reject);
        });
    const files = await readdir(sourceDir);
    const sortedFiles = files
        .filter((file) => {
        return IGNORES.indexOf(file) === -1;
        })
        .sort((a, b) => a - b);
    const writeStream = fs.createWriteStream(targetPath);
    for (const file of sortedFiles) {
        let filePath = path.join(sourceDir, file);
        await readFile(filePath, writeStream);
        await unlink(filePath); // 删除已合并的分块
    }
    writeStream.end();
}
// 注册中间件
app.use(cors());
app.use(serve(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`app starting at port ${PORT}`);
});

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-30 08:40:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-30 08:51:35
 * @FilePath: /js-demo/leetcode/面试金典/08.10.js
 */
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
面试题 08.10. 颜色填充
    编写函数，实现许多图片编辑软件都支持的「颜色填充」功能。
    待填充的图像用二维数组 image 表示，元素为初始颜色值。初始坐标点的行坐标为 sr 列坐标为 sc。需要填充的新颜色为 newColor 。
    「周围区域」是指颜色相同且在上、下、左、右四个方向上存在相连情况的若干元素。
示例：
输入：
    image = [
        [1,1,1],
        [1,1,0],
        [1,0,1]
    ] 
    sr = 1, sc = 1, newColor = 2
输出：[[2,2,2],[2,2,0],[2,0,1]]
解释: 
    初始坐标点位于图像的正中间，坐标 (sr,sc)=(1,1) 。
    初始坐标点周围区域上所有符合条件的像素点的颜色都被更改成 2 。
    注意，右下角的像素没有更改为 2 ，因为它不属于初始坐标点的周围区域。
提示：
    image 和 image[0] 的长度均在范围 [1, 50] 内。
    初始坐标点 (sr,sc) 满足 0 <= sr < image.length 和 0 <= sc < image[0].length 。
    image[i][j] 和 newColor 表示的颜色值在范围 [0, 65535] 内。
 */
var floodFill = function(image, sr, sc, newColor) {
    let m = image.length
    let n = image[0].length
    let color = image[sr][sc]
    let draw = (x, y, image, newColor, color) => {
        if(x < 0 || y < 0 || x > m-1 || y > n-1 || image[x][y] != color || image[x][y] == newColor) return
        image[x][y] = newColor
        draw(x + 1, y, image, newColor, color)
        draw(x - 1, y, image, newColor, color)
        draw(x, y - 1, image, newColor, color)
        draw(x, y + 1, image, newColor, color)
    }
    draw(sr, sc, image, newColor, color)
    return image
};
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let oColor = image[sr][sc]
    if(oColor == newColor) return image
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let m = image.length
    let n = image[0].length
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && x < n
    let bfs = (x, y) => {
        let q = [[x, y]]
        while(q.length){
            let [x, y] = q.shift()
            image[x][y] = newColor
            for(let i = 0; i < 4; i++){
                let a = x + dx[i]
                let b = y + dy[i]
                if(inArea(a, b) && image[a][b] == oColor){
                    q.push([a, b])
                }
            }
        }
    }
    bfs(sr, sc)
    return image
};
console.log(floodFill([
    [1,1,1],
    [1,1,0],
    [1,0,1]
], 2, 2, 2))
console.log(floodFill([
    [1,1,1],
    [1,1,0],
    [1,0,1]
], 1, 1, 2))
console.log(floodFill([
    [1,1,1],
    [1,1,0],
    [1,0,1]
], 1, 2, 2))
console.log(floodFill([[0,0,0],[0,0,0]], 0, 0, 2))

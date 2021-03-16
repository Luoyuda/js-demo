/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 11:55:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 12:09:18
 * @FilePath: /js-demo/leetcode/401.js
 */
/**
 * @param {number} num
 * @return {string[]}
    401. 二进制手表
    二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。
    每个 LED 代表一个 0 或 1，最低位在右侧。
    例如，上面的二进制手表读取 “3:25”。
    给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。
    示例：
        输入: n = 1
        返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
    提示：
        输出的顺序没有要求。
        小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
        分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
        超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。
 */
var readBinaryWatch = function(num) {
    let res = []
    let vis = new Array(10).fill(0)
    let dfs = (t, start, vis) => {
        if(t == 0) {
            let hour = vis[0]*1 + vis[1]*2 + vis[2]*4 + vis[3]*8;
            let minutes = vis[4]*1 + vis[5]*2 + vis[6]*4 + vis[7]*8 + vis[8]*16 + vis[9]*32;
            if(hour >= 0 && hour <= 11 && minutes >= 0 && minutes <= 59){
                let tmp = `${hour}:${minutes >= 10? minutes: '0'+minutes}`;
                res.push(tmp);
            }
            return
        }
        for (let i = start; i <= 10 - t; i++) {
            if(vis[i]) return
            vis[i] = 1
            dfs(t - 1, i + 1, vis.slice())
            vis[i] = 0
        }
    }
    dfs(num,0,vis)
    return res
};

console.log(readBinaryWatch(1))
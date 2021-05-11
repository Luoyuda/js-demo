/*
 * @Author: xiaohuolong
 * @Date: 2021-05-03 10:05:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-03 10:17:55
 * @FilePath: /js-demo/leetcode/常规题目/286.js
 */
/*
286. 墙与门
    你被给定一个 m × n 的二维网格 rooms ，网格中有以下三种可能的初始化值：
    -1 表示墙或是障碍物
    0 表示一扇门
    INF 无限表示一个空的房间。然后，我们用 231 - 1 = 2147483647 代表 INF。你可以认为通往门的距离总是小于 2147483647 的。
    你要给每个空房间位上填上该房间到 最近门的距离 ，如果无法到达门，则填 INF 即可。
示例 1：
    输入：rooms = [
        [2147483647,-1,0,2147483647],
        [2147483647,2147483647,2147483647,-1],
        [2147483647,-1,2147483647,-1],
        [0,-1,2147483647,2147483647]
    ]
    输出：[
        [3,-1,0,1],
        [2,2,1,-1],
        [1,-1,2,-1],
        [0,-1,3,4]
    ]
示例 2：
    输入：rooms = [[-1]]
    输出：[[-1]]
示例 3：
    输入：rooms = [[2147483647]]
    输出：[[2147483647]]
示例 4：
    输入：rooms = [[0]]
    输出：[[0]]
提示：
    m == rooms.length
    n == rooms[i].length
    1 <= m, n <= 250
    rooms[i][j] 是 -1、0 或 231 - 1
*/
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
let dx = [-1, 0, 1, 0]
let dy = [0, 1, 0, -1]
let empty = 2147483647
var wallsAndGates = function(rooms) {
    let m = rooms.length
    let n = rooms[0].length
    let q = []
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(rooms[i][j] == 0){
                q.push([i, j])
            }
        }
    }
    while (q.length){
        let [x, y] = q.shift()
        for (let i = 0; i < 4; i++) {
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n && rooms[a][b] == empty){
                rooms[a][b] = rooms[x][y] + 1
                q.push([a, b])
            }
        }
    }
    return rooms
};
console.log(wallsAndGates([
    [2147483647,-1,0,2147483647],
    [2147483647,2147483647,2147483647,-1],
    [2147483647,-1,2147483647,-1],
    [0,-1,2147483647,2147483647]
]))
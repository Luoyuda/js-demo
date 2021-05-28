/*
 * @Author: xiaohuolong
 * @Date: 2021-05-20 17:01:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 17:26:07
 * @FilePath: /js-demo/leetcode/常规题目/934.js
 */
/*
934. 最短的桥
    在给定的二维二进制数组 A 中，存在两座岛。（岛是由四面相连的 1 形成的一个最大组。）
    现在，我们可以将 0 变为 1，以使两座岛连接起来，变成一座岛。
    返回必须翻转的 0 的最小数目。（可以保证答案至少是 1 。）
示例 1：
    输入：A = [
        [0,1],
        [1,0]
    ]
    输出：1
示例 2：
    输入：A = [
        [0,1,0],
        [0,0,0],
        [0,0,1]
    ]
    输出：2
示例 3：
    输入：A = [
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1]
    ]
    输出：1
提示：
    2 <= A.length == A[0].length <= 100
    A[i][j] == 0 或 A[i][j] == 1
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function(grid) {
    // 1.先找出两个岛
    let m = grid.length
    let n = grid[0].length
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && y < n
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let dfs = (x, y, s, list) => {
        list.push([x, y])
        grid[x][y] = s
        for (let i = 0; i < 4; i++) {
            let a = x + dx[i]
            let b = y + dy[i]
            if(inArea(a, b) && grid[a][b] == 1){
                dfs(a, b, s, list)
            }
        }
    }
    let s = 1
    let lands = {
        2: [],
        3: []
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(grid[i][j] == 1){
                dfs(i, j, ++s, lands[s])
            }
        }
    }
    // 用点最少的岛 bfs
    let list = lands[2].length > lands[3].length ? lands[3] : lands[2]
    let bfs = (q) => {
        let len = 0
        while(q.length){
            let length = q.length
            for (let i = 0; i < length; i++) {
                const [x, y] = q.shift()
                const s = grid[x][y]
                for (let i = 0; i < 4; i++) {
                    let a = x + dx[i]
                    let b = y + dy[i]
                    if(!inArea(a, b)) continue
                    if(grid[a][b] != 0 && grid[a][b] != s) return len
                    if(grid[a][b] == 0){
                        grid[a][b] = s
                        q.push([a, b])
                    }
                }
            }
            len++
        }
    }
    return bfs(list)
};

console.log(shortestBridge([
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
]))

console.log(shortestBridge([
    [0,1,0],
    [0,0,0],
    [0,0,1]
]))
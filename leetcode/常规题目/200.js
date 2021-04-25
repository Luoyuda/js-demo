/*
 * @Author: xiaohuolong
 * @Date: 2021-04-21 21:39:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 20:32:01
 * @FilePath: /js-demo/leetcode/常规题目/200.js
 */
/*
200. 岛屿数量
    给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
    岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
    此外，你可以假设该网格的四条边均被水包围。
示例 1：
    输入：grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    输出：1
示例 2：
    输入：grid = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ]
    输出：3
提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] 的值为 '0' 或 '1'
*/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let bfs = (x, y) => {
        if(x < 0 || y < 0 || x >= m || y >= n || grid[x][y] == 0) return
        grid[x][y] = 0
        bfs(x + 1, y)
        bfs(x - 1, y)
        bfs(x, y + 1)
        bfs(x, y - 1)
    }
    let ans = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(grid[i][j] == 1){
                ans += 1
                bfs(i, j)
            }
        }
    }
    return ans
};
let dx = [-1, 0, 1, 0]
let dy = [0, -1, 0, 1]
let dfs = (grid, x, y) => {
    grid[x][y] = 0
    for (let i = 0; i < 4; i++) {
        let a = x + dx[i]
        let b = y + dy[i]
        if(a >= 0 && b >=0 && a < grid.length && b < grid[0].length && grid[a][b] == 1){
            dfs(grid, a, b)
        }
    }
}
var numIslands = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let ans = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(grid[i][j] == 1){
                ans += 1
                dfs(grid, i, j)
            }
        }
    }
    return ans
};
console.log(numIslands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]))
console.log(numIslands([
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]))
console.log(numIslands([["1","1","1"],["0","1","0"],["1","1","1"]]))
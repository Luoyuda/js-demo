/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 14:37:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 15:50:41
 * @FilePath: /js-demo/leetcode/offer.47.js
 */
/**
 * @param {number[][]} grid
 * @return {number}
    剑指 Offer 47. 礼物的最大价值
        在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。
        你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。
        给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？
    示例 1:
        输入: 
        [
            [1,3,1],
            [1,5,1],
            [4,2,1]
        ]
        输出: 12
        解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
    提示：
        0 < grid.length <= 200
        0 < grid[0].length <= 200
 */
var maxValue = function(grid) {
    let m = grid.length
    let n = grid[0].length
    for (let j = 1; j < n; j++) {
        grid[0][j] = grid[0][j] + (grid[0][j-1] || 0)
    }
    for (let i = 1; i < m; i++) {
        grid[i][0] = grid[i][0] + (grid[i - 1][0] || 0)
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] = Math.max(grid[i][j-1], grid[i-1][j]) + grid[i][j]
        }
    }
    // console.log(grid)
    return grid[m-1][n-1]
};

console.log(maxValue([
    [1,2],
    [5,6],
    [1,1]
]))
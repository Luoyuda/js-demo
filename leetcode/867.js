/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 10:37:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-25 10:48:51
 * @FilePath: /js-demo/leetcode/867.js
 */
/**
 * @param {number[][]} matrix
 * @return {number[][]}
    867. 转置矩阵
        给你一个二维整数数组 matrix， 返回 matrix 的 转置矩阵 。
        矩阵的 转置 是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。
    示例 1：
        输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
        输出：[[1,4,7],[2,5,8],[3,6,9]]
    示例 2：
        输入：matrix = [[1,2,3],[4,5,6]]
        输出：[[1,4],[2,5],[3,6]]
    提示：
        m == matrix.length
        n == matrix[i].length
        1 <= m, n <= 1000
        1 <= m * n <= 105
        -109 <= matrix[i][j] <= 109
 */
var transpose = function(matrix) {
    let n = matrix.length
    let m = matrix[0].length
    let grid = []
    for (let i = 0; i < m; i++) {
        grid.push(new Array(n))
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            grid[j][i] = matrix[i][j]
        }
    }
    return grid
};

console.log(transpose([
    [1,2,3],
    [4,5,6],
    [7,8,9]
]))
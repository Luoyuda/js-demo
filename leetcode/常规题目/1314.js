/*
 * @Author: xiaohuolong
 * @Date: 2021-03-23 08:12:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-23 08:49:39
 * @FilePath: /js-demo/leetcode/常规题目/1314.js
 */
/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
1314. 矩阵区域和
    给你一个 m * n 的矩阵 mat 和一个整数 K ，请你返回一个矩阵 answer，
    其中每个 answer[i][j] 是所有满足下述条件的元素 mat[r][c] 的和： 
    i - K <= r <= i + K, j - K <= c <= j + K  (r, c) 在矩阵内。
示例 1：
    输入：mat = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ], K = 1
    输出：[
        [12,21,16],
        [27,45,33],
        [24,39,28]
    ]
示例 2：
    输入：mat = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ], K = 2
    输出：[
        [45,45,45],
        [45,45,45],
        [45,45,45]
    ]
提示：
    m == mat.length
    n == mat[i].length
    1 <= m, n, K <= 100
    1 <= mat[i][j] <= 100
 */
var matrixBlockSum = function(mat, K) {
    let m = mat.length
    let n = mat[0].length
    let prefix = new Array(m+1)
    let ans = new Array(m)
    for (let i = 0; i <= m; i++) {
        prefix[i] = new Array(n+1).fill(0)
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + mat[i-1][j-1]
        }
    }
    // console.log(prefix)
    for (let i = 0; i < m; i++) {
        ans[i] = []
        for (let j = 0; j < n; j++) {
            let row1 = Math.max(i - K, 0)
            let row2 = Math.min(i + K, m - 1)
            let col1 = Math.max(j - K, 0)
            let col2 = Math.min(j + K, n - 1)
            ans[i][j] = prefix[row2 + 1][col2 + 1] - prefix[row2 + 1][col1] - prefix[row1][col2 + 1] + prefix[row1][col1]
        }
    }
    return ans
};

console.log(matrixBlockSum([
    [1,2,3],
    [4,5,6],
    [7,8,9]
], 1))
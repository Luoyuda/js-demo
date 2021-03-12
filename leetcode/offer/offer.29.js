/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 08:13:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 08:22:50
 * @FilePath: /js-demo/leetcode/offer.29.js
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
    剑指 Offer 29. 顺时针打印矩阵
        输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
    示例 1：
        输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
        输出：[1,2,3,6,9,8,7,4,5]
    示例 2：
        输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
        输出：[1,2,3,4,8,12,11,10,9,5,6,7]
    限制：
        0 <= matrix.length <= 100
        0 <= matrix[i].length <= 100
 */
var spiralOrder = function(matrix) {
    let res = []
    let n = matrix.length
    if(!n) return res
    let m = matrix[0].length
    if(!m) return res
    let top = 0
    let bottom = n - 1
    let left = 0
    let right = m - 1
    let total = n * m
    while(res.length < total){
        for (let i = left; i <= right; i++) res.push(matrix[top][i])
        top++
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right])
        right--
        if(res.length >= total) break
        for (let i = right; i >= left; i--) res.push(matrix[bottom][i])
        bottom--
        for (let i = bottom; i >= top; i--) res.push(matrix[i][left])
        left++
    }
    return res
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))
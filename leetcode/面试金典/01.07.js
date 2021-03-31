/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 22:15:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 22:39:26
 * @FilePath: /js-demo/leetcode/面试金典/01.07.js
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
面试题 01.07. 旋转矩阵
    给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
示例 1:
    给定 matrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ],
原地旋转输入矩阵，使其变为:
    [
        [7,4,1],
        [8,5,2],
        [9,6,3]
    ]
示例 2:
    给定 matrix =[
        [ 5, 1, 9,11],
        [ 2, 4, 8,10],
        [13, 3, 6, 7],
        [15,14,12,16]
    ], 
原地旋转输入矩阵，使其变为:
    [
        [15,13, 2, 5],
        [14, 3, 4, 1],
        [12, 6, 8, 9],
        [16, 7,10,11]
    ]
 */
var rotate = function(matrix) {
    let n = matrix.length
    let mid = Math.floor(n / 2)
    let len = Math.floor((n + 1) / 2)
    for (let i = 0; i < mid; i++) {
        for (let j = 0; j < len; j++) {
            // console.log(`${matrix[i][j]} <= ${matrix[n - j - 1][i]}`)
            // console.log(`${ matrix[n - j - 1][i]} <= ${matrix[n - i - 1][n - j - 1]}`)
            // console.log(`${matrix[n - i - 1][n - j - 1]} <= ${matrix[j][n - i - 1]}`)
            // console.log(`${matrix[j][n - i - 1]} <= ${matrix[i][j]}`)
            let temp = matrix[i][j]
            matrix[i][j] = matrix[n - j - 1][i]
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
            matrix[j][n - i - 1] = temp
        }
    }
    return matrix
};

// console.log(rotate([
//     [ 5, 1, 9,11],
//     [ 2, 4, 8,10],
//     [13, 3, 6, 7],
//     [15,14,12,16]
// ]))
console.log(rotate([
    [1,2,3],
    [4,5,6],
    [7,8,9]
]))
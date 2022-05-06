/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 12:14:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-18 12:34:12
 * @FilePath: /js-demo/leetcode/59.js
 */
/**
  给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
  示例 1：
  输入：n = 3
  输出：[[1,2,3],[8,9,4],[7,6,5]]
  示例 2：
  输入：n = 1
  输出：[[1]]
 */
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let top = 0
  let left = 0
  let bottom = n - 1
  let right = n - 1
  let start = 0
  let total = n * n
  let matrix = []
  for (let index = 0; index < n; index++) matrix.push([])
  while (total > start) {
    for (let i = left; i <= right; i++) {
      matrix[top][i] = ++start
    }
    top++
    for (let i = top; i <= bottom; i++) {
      matrix[i][right] = ++start
    }
    right--
    for (let i = right; i >= left; i--) {
      matrix[bottom][i] = ++start
    }
    bottom--
    for (let i = bottom; i >= top; i--) {
      matrix[i][left] = ++start
    }
    left++
  }
  return matrix
}

console.log(generateMatrix(1))
console.log(generateMatrix(3))

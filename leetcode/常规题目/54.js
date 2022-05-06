/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 12:01:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-18 12:11:09
 * @FilePath: /js-demo/leetcode/54.js
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
    给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
    示例 1：
    输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
    输出：[1,2,3,6,9,8,7,4,5]
    示例 2：
    输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
var spiralOrder = function (matrix) {
  let result = []
  let n = matrix.length
  if (!n) return result
  let m = matrix[0].length
  if (!m) return result
  let top = 0
  let right = m - 1
  let bottom = n - 1
  let left = 0
  let total = n * m
  while (result.length < total) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i])
    top++
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right])
    right--
    if (result.length >= total) break
    for (let i = right; i >= left; i--) result.push(matrix[bottom][i])
    bottom--
    for (let i = bottom; i >= top; i--) result.push(matrix[i][left])
    left++
  }

  return result
}
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const res = []
  const m = matrix.length
  const n = matrix[0].length
  const total = n * m
  let t = 0
  let b = m - 1
  let l = 0
  let r = n - 1
  while (res.length < total) {
    for (let i = l; i <= r; i++) res.push(matrix[t][i])
    t++
    for (let i = t; i <= b; i++) res.push(matrix[i][r])
    r--
    if (res.length >= total) break
    for (let i = r; i >= l; i--) res.push(matrix[b][i])
    b--
    for (let i = b; i >= t; i--) res.push(matrix[i][l])
    l++
  }
  return res
}
console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)

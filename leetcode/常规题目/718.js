/*
 * @Author: xiaohuolong
 * @Date: 2020-07-01 08:29:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-01 08:44:04
 * @FilePath: /js-demo/leetcode/718.js
 */
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
  let n = A.length
  let m = B.length
  let ret = 0
  if (!n || !m) return ret
  for (let i = 0; i < n; i++) {
    let len = Math.min(m, n - i)
    let maxLen = maxLength(A, B, i, 0, len)
    ret = Math.max(ret, maxLen)
  }
  for (let i = 0; i < m; i++) {
    let len = Math.min(m, n - i)
    let maxLen = maxLength(A, B, 0, i, len)
    ret = Math.max(ret, maxLen)
  }
  return ret
}

var maxLength = (A, B, addA, addB, len) => {
  let ret = 0
  let k = 0
  for (let i = 0; i < len; i++) {
    if (A[addA + i] == B[addB + i]) {
      k++
    } else {
      k = 0
    }
    ret = Math.max(ret, k)
  }
  return ret
}

findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])

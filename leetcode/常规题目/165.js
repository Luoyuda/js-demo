/*
 * @Author: xiaohuolong
 * @Date: 2021-05-12 09:09:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-12 10:11:09
 * @FilePath: /js-demo/leetcode/常规题目/165.js
 */
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  let m = version1.length,
    n = version2.length
  let i = 0,
    j = 0
  for (; i < m || j < n; ) {
    let a = 0,
      b = 0
    while (i < m && version1[i] != '.') a += a * 10 + (version1[i++] - 0)
    while (j < n && version2[j] != '.') b += b * 10 + (version2[j++] - 0)
    i++, j++
    if (a > b) return 1
    else if (a < b) return -1
  }
  return 0
}
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const n = version1.length
  const m = version2.length
  let i = 0
  let j = 0
  while (i < n || j < m) {
    let a = 0
    while (i < n && version1[i] !== '.') a += a * 10 + (version1[i++] - 0)
    let b = 0
    while (j < m && version2[j] !== '.') b += b * 10 + (version2[j++] - 0)
    if (a > b) return 1
    else if (a < b) return -1
    i++
    j++
  }
  return 0
}
console.log(compareVersion('1.0', '1.0.1'))

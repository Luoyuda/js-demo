/*
 * @Author: xiaohuolong
 * @Date: 2021-02-26 21:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-26 21:55:02
 * @FilePath: /js-demo/leetcode/10.01.js
 */
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
    面试题 10.01. 合并排序的数组
        给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B。 编写一个方法，将 B 合并入 A 并排序。
        初始化 A 和 B 的元素数量分别为 m 和 n。
    示例:
        输入:
        A = [1,2,3,0,0,0], m = 3
        B = [2,5,6],       n = 3
        输出: [1,2,2,3,5,6]
    说明:
        A.length == n + m
 */
var merge = function (A, m, B, n) {
  let i = m + n - 1
  m--
  n--
  while (m >= 0 && n >= 0) {
    A[i--] = A[m] > B[n] ? A[m--] : B[n--]
  }
  while (n >= 0) A[i--] = B[n--]
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
console.log(merge([0], 0, [1], 1))

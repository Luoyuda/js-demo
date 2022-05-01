/*
440. 字典序的第K小数字
给定整数 n 和 k，返回  [1, n] 中字典序第 k 小的数字。
示例 1:
  输入: n = 13, k = 2
  输出: 10
  解释: 字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。
示例 2:
  输入: n = 1, k = 1
  输出: 1
提示:
  1 <= k <= n <= 109
*/
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  let curr = 1
  k--
  while (k > 0) {
    const m = getMid(curr, n)
    if (m <= k) {
      k -= m
      curr++
    } else {
      curr = curr * 10
      k--
    }
  }
  return curr
}

var getMid = function (curr, n) {
  let m = 0
  let fast = curr
  let slow = curr
  while (fast <= n) {
    m += Math.min(slow, n) - fast + 1
    fast = fast * 10
    slow = slow * 10 + 9
  }
  return m
}

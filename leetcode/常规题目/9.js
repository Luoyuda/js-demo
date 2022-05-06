/*
 * @Author: xiaohuolong
 * @Date: 2020-07-02 22:50:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-02 23:27:21
 * @FilePath: /js-demo/leetcode/9.js
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false
  let num = 0
  while (x > num) {
    let mod = x % 10
    num = num * 10 + mod
    x = Math.floor(x / 10)
  }
  return x === num || x === Math.floor(num / 10)
}

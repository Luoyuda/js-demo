/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 08:47:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 08:56:03
 * @FilePath: /js-demo/leetcode/常规题目/67.js
 */
/* 
67. 二进制求和
    给你两个二进制字符串，返回它们的和（用二进制表示）。
    输入为 非空 字符串且只包含数字 1 和 0。
示例 1:
    输入: a = "11", b = "1"
    输出: "100"
示例 2:
    输入: a = "1010", b = "1011"
    输出: "10101"
提示：
    每个字符串仅由字符 '0' 或 '1' 组成。
    1 <= a.length, b.length <= 10^4
    字符串如果不是 "0" ，就都不含前导零。
*/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let carry = 0
  let i = a.length - 1
  let j = b.length - 1
  let res = ''
  while (i >= 0 || j >= 0 || carry) {
    let sum = carry
    if (i >= 0) sum += a[i--] - 0
    if (j >= 0) sum += b[j--] - 0
    carry = Math.floor(sum / 2)
    sum %= 2
    res = `${sum}${res}`
  }
  return res
}

console.log(addBinary('11', '1'))
console.log(addBinary('1010', '1011'))

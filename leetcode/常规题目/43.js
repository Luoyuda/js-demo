/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 07:49:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 08:44:58
 * @FilePath: /js-demo/leetcode/常规题目/43.js
 */
/**
43. 字符串相乘
    给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
示例 1:
    输入: num1 = "2", num2 = "3"
    输出: "6"
示例 2:
    输入: num1 = "123", num2 = "456"
    输出: "56088"
说明：
    num1 和 num2 的长度小于110。
    num1 和 num2 只包含数字 0-9。
    num1 和 num2 均不以零开头，除非是数字 0 本身。
    不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 == '0' || num2 == '0') return '0'
  let res = '0'
  for (let i = num2.length - 1; i >= 0; i--) {
    let carry = 0
    let temp = new Array(num2.length - 1 - i).fill(0)
    let n2 = num2[i] - '0'
    for (let j = num1.length - 1; j >= 0 || carry != 0; j--) {
      let n1 = j < 0 ? 0 : num1[j] - 0
      let result = n1 * n2 + carry
      let product = result % 10
      temp.push(product)
      carry = Math.floor(result / 10)
    }
    res = addStrings(res, temp.reverse().join(''))
  }
  return res
}
let addStrings = (num1, num2) => {
  let carry = 0
  let res = []
  for (
    let i = num1.length - 1, j = num2.length - 1;
    i >= 0 || j >= 0 || carry != 0;
    i--, j--
  ) {
    let x = i < 0 ? 0 : num1[i] - 0
    let y = j < 0 ? 0 : num2[j] - 0
    let sum = x + y + carry
    res.push(sum % 10)
    carry = Math.floor(sum / 10)
  }
  return res.reverse().join('')
}

console.log(multiply('123', '456') === '56088')

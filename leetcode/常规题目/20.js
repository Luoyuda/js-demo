/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 22:59:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 15:02:43
 * @FilePath: /js-demo/leetcode/常规题目/20.js
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if ((s.length & 1) == 1) return false
  const hash = {
    ')': '(',
    ']': '[',
    '}': '{',
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    const k = hash[ch]
    if (k) {
      if (stack.pop() !== k) return false
    } else {
      stack.push(ch)
    }
  }
  return stack.length === 0
}
console.log(isValid('()'))
console.log(isValid('()[]{}'))
console.log(isValid('(]'))
console.log(isValid('(])['))
console.log(isValid('{[]}'))

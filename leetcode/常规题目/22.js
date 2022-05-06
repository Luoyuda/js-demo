/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 15:43:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-21 12:00:27
 * @FilePath: /js-demo/leetcode/常规题目/22.js
 */
/**
 * @param {number} n
 * @return {string[]}
    22. 括号生成
    数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
    示例 1：
        输入：n = 3
        输出：["((()))","(()())","(())()","()(())","()()()"]
    示例 2：
        输入：n = 1
        输出：["()"]
    提示：
        1 <= n <= 8
 */
var generateParenthesis = function (n) {
  let res = []
  let dfs = (curr, left, right) => {
    // left：左括号剩下个数
    // right：右括号剩下个数
    if (curr.length === 2 * n) {
      res.push(curr)
      return
    }
    if (left > 0) dfs(curr + '(', left - 1, right)
    if (right > left) dfs(curr + ')', left, right - 1)
  }
  dfs('', n, n)
  return res
}
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let q = [['', n, n]]
  let res = []
  while (q.length) {
    let [str, left, right] = q.shift()
    if (left == 0 && right == 0) {
      res.push(str)
    } else {
      if (left > 0) {
        q.push([str + '(', left - 1, right])
      }
      if (right > 0 && right > left) {
        q.push([str + ')', left, right - 1])
      }
    }
  }
  return res
}
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = []
  const dfs = (s, l, r) => {
    if (l === 0 && r === 0) return result.push(s)
    if (l > 0) dfs(s + '(', l - 1, r)
    if (r > l) dfs(s + ')', l, r - 1)
  }
  dfs('', n, n)
  return result
}
console.log(generateParenthesis(3))

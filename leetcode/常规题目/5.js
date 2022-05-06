/*
 * @Author: xiaohuolong
 * @Date: 2020-06-30 21:12:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 17:07:06
 * @FilePath: /js-demo/leetcode/5.js
    5. 最长回文子串
    给你一个字符串 s，找到 s 中最长的回文子串。
    示例 1：
        输入：s = "babad"
        输出："bab"
        解释："aba" 同样是符合题意的答案。
    示例 2：
        输入：s = "cbbd"
        输出："bb"
    示例 3：
        输入：s = "a"
        输出："a"
    示例 4：
        输入：s = "ac"
        输出："a"
    提示：
        1 <= s.length <= 1000
        s 仅由数字和英文字母（大写和/或小写）组成
 */
var longestPalindrome = function (s) {
  let n = s.length
  let dp = []
  for (let i = 0; i < n; i++) {
    dp[i] = []
  }
  let str = ''
  for (let l = 0; l < n; l++) {
    for (let i = 0; i + l < n; i++) {
      let j = i + l
      if (l == 0) {
        dp[i][j] = true
      } else if (l == 1) {
        dp[i][j] = s[i] == s[j]
      } else {
        dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1]
      }
      if (dp[i][j] && l + 1 > str.length) {
        str = s.substring(i, i + l + 1)
      }
    }
  }
  return str
}
var longestPalindrome = function (s) {
  if (s == null || s.length < 1) return ''
  let start = 0
  let end = 0
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i)
    let len2 = expandAroundCenter(s, i, i + 1)
    let len = Math.max(len1, len2)
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)
}
var expandAroundCenter = (s, left, right) => {
  while (left >= 0 && right < s.length && s[left] == s[right]) {
    --left
    ++right
  }
  return right - left - 1
}
console.log(longestPalindrome('babad'))
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let start = 0
  let end = 0
  const n = s.length
  for (let i = 0; i < n; i++) {
    const len1 = expand(s, i, i)
    const len2 = expand(s, i, i + 1)
    const len = Math.max(len1, len2)
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)
}
const expand = (s, l, r) => {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--
    r++
  }
  return r - l - 1
}

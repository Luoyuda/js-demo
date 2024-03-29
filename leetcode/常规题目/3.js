/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 22:17:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-25 16:28:21
 * @FilePath: /js-demo/leetcode/常规题目/3.js
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (string) {
  let len = string.length
  if (!len) return 0
  let end = 1
  let endStr = ''
  let temp = string[0]
  let set = new Set()
  while (end < len) {
    let i = 0
    let j = -1
    let add = string[end]
    while (i < temp.length) {
      if (temp[i] == add) {
        j = i
      }
      i++
    }
    if (j == -1) {
      temp = temp + add
      if (temp.length > endStr.length) {
        endStr = temp
      }
    } else {
      temp = temp.substr(j + 1) + add
    }
    end++
  }
  return endStr.length || temp.length
}

var lengthOfLongestSubstring2 = (string) => {
  const set = new Set()
  const len = string.length
  let num = 0
  if (!len) return num
  let end = -1
  let i = 0
  while (i < len) {
    if (i != 0) {
      set.delete(string[i - 1])
    }
    while (end + 1 < len) {
      // 遇到相同字符，跳出
      if (set.has(string[end + 1])) break
      // 不同字符 添加
      set.add(string[++end])
    }
    num = Math.max(num, end - i + 1)
    i++
  }
  return num
}

var lengthOfLongestSubstring = (string) => {
  let left = 0
  let right = -1
  let max = 0
  if (!string.length) return max
  let set = new Set()
  while (left < string.length) {
    // console.log(left, right)
    // console.log(string[left], string[right])
    if (left != 0) set.delete(string[left - 1])
    while (right + 1 < string.length) {
      if (set.has(string[right + 1])) break
      set.add(string[++right])
    }
    // console.log(right - left, max)
    max = Math.max(max, right - left + 1)
    left++
  }
  return max
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let i = 0
  let j = -1
  let n = s.length
  let set = new Set()
  let max = 0
  while (j < n - 1) {
    j++
    if (set.has(s[j])) {
      while (i <= j && set.has(s[j])) {
        set.delete(s[i])
        i++
      }
    }
    set.add(s[j])
    max = Math.max(j - i + 1, max)
  }
  return max
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let set = new Set()
  let i = 0
  let j = 0
  let max = 0
  const n = s.length
  while (i < n) {
    const ch = s[i]
    while (set.has(ch)) {
      set.delete(s[j])
      j++
    }
    set.add(ch)
    max = Math.max(max, set.size)
    i++
  }
  return max
}

console.log(lengthOfLongestSubstring('abceabcefdb'))
console.log(lengthOfLongestSubstring('bbbbbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))

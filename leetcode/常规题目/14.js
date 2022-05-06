/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 21:43:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 08:32:48
 * @FilePath: /js-demo/leetcode/常规题目/14.js
 */
var longestCommonPrefix = function (strs) {
  let length = strs.length
  if (!length) return ''
  if (length == 1) return strs[0]
  // console.log(strs)
  let i = 1
  let prefix = strs[0]
  let lastPrefix = ''
  while (i < length && prefix != '') {
    let nextStr = strs[i]
    let j = 0
    lastPrefix = ''
    while (j < nextStr.length || j < prefix.length) {
      if (nextStr[j] == prefix[j]) {
        lastPrefix += nextStr[j]
        j++
      } else {
        break
      }
    }
    prefix = lastPrefix
    i++
  }
  // console.log(lastPrefix, prefix)
  return prefix
}

var longestCommonPrefix2 = function (strs) {
  let length = strs.length
  if (!length) return ''
  if (length == 1) return strs[0]
  let minLength = Infinity
  for (let i = 0; i < strs.length; i++) {
    minLength = Math.min(minLength, strs[i].length)
  }
  let low = 0
  let high = minLength

  while (low < high) {
    let mid = Math.floor((high - low + 1) / 2) + low
    // console.log(high, mid, low)
    if (isCommonPrefix(strs, mid)) {
      low = mid
    } else {
      high = mid - 1
    }
  }

  return strs[0].substr(0, low)
}

var isCommonPrefix = function (strs, len) {
  let str = strs[0].substr(0, len)
  let count = strs.length
  for (let i = 1; i < count; i++) {
    let temp = strs[i]
    for (let j = 0; j < len; j++) {
      if (str[j] !== temp[j]) return false
    }
  }
  return true
}

var longestCommonPrefix2 = function (strs) {
  let length = strs.length
  if (!length) return ''
  if (length == 1) return strs[0]
  let min = Infinity
  for (let i = 0; i < strs.length; i++) {
    min = Math.min(strs[i].length, min)
  }
  let low = 0
  let high = min
  while (low < high) {
    let mid = Math.ceil((high - low) / 2) + low
    if (isCommonPrefix(strs, mid)) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return strs[0].substr(0, low)
}

var isCommonPrefix = function (strs, len) {
  let T = strs[0].substr(0, len)
  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j < len; j++) {
      if (T[j] !== strs[i][j]) return false
    }
  }
  return true
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let len = strs.length
  if (!len) return ''
  if (len == 1) return strs[0]
  // 1.找出最短的
  let min = Infinity
  let T = ''
  let index = 0
  for (let i = 0; i < strs.length; i++) {
    if (strs[i].length < min) {
      min = strs[i].length
      T = strs[i]
      index = i
    }
  }
  let s = ''
  for (let i = 0; i < strs.length; i++) {
    if (i == index) continue
    if (min == 0) return ''
    let left = 0
    let right = min
    let str = strs[i]
    s = ''
    while (left < right) {
      if (T[left] == str[left]) {
        s += T[left]
        left++
      } else {
        // console.log(min, T, s)
        min = left
        T = s
        break
      }
    }
  }
  // console.log(min, T, index)
  return s
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const n = strs.length
  if (n === 1) return strs[0]
  let min = strs[0].length
  let T = strs[0]
  let index = 0
  for (let i = 1; i < n; i++) {
    if (strs[i].length < min) {
      min = strs[i].length
      T = strs[i]
      index = i
    }
  }
  let s = ''
  for (let i = 0; i < n; i++) {
    if (i === index) continue
    if (min === 0) return ''
    let l = 0
    let r = min
    let str = strs[i]
    s = ''
    while (l < r && T[l] === str[l]) {
      s += str[l]
      l++
    }
    min = l
    T = s
  }
  return s
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight']))
console.log(longestCommonPrefix(['dog', 'racecar', 'car']))
console.log(longestCommonPrefix(['aaa', 'aa', 'aaa']))
console.log(longestCommonPrefix2(['flower', 'flow', 'flight']))
console.log(longestCommonPrefix2(['dog', 'racecar', 'car']))
console.log(longestCommonPrefix2(['aaa', 'aa', 'aaa']))

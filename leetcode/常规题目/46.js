/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 14:12:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 08:12:26
 * @FilePath: /js-demo/leetcode/常规题目/46.js
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
    46. 全排列
    给定一个 没有重复 数字的序列，返回其所有可能的全排列。
    示例:
    输入: [1,2,3]
    输出:
    [
        [1,2,3],
        [1,3,2],
        [2,1,3],
        [2,3,1],
        [3,1,2],
        [3,2,1]
    ]
 */
var permute = function (nums) {
  let res = []
  let numLen = nums.length
  let vis = {}
  let dfs = (t) => {
    // 如果 t.length == numLen 返回
    if (t.length >= numLen) return res.push(t)
    // 遍历开始
    for (let i = 0; i < numLen; i++) {
      if (vis[i]) continue
      // 递归之前
      vis[i] = true
      t.push(nums[i])
      dfs(t.slice())
      // 递归之后回溯
      t.pop()
      vis[i] = false
    }
  }
  dfs([])
  return res
}

var permute = function (nums) {
  let res = []
  let vis = {}
  let len = nums.length
  let dfs = (t) => {
    if (t.length == len) return res.push(t)
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      if (vis[num]) continue
      vis[num] = true
      t.push(num)
      dfs(t.slice())
      t.pop()
      vis[num] = false
    }
  }
  dfs([])
  return res
}

var permute = function (nums) {
  let res = []
  let vis = {}
  let len = nums.length
  let dfs = (t) => {
    if (t.length == len) {
      res.push(t)
      return
    }
    for (let i = 0; i < len; i++) {
      if (vis[i]) continue
      vis[i] = true
      t.push(nums[i])
      dfs(t.slice())
      t.pop()
      vis[i] = false
    }
  }
  dfs([])
  return res
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = []
  const vis = {}
  const dfs = (t) => {
    if (t.length === nums.length) return res.push(t)
    for (const x of nums) {
      if (vis[x]) continue
      vis[x] = true
      t.push(x)
      dfs(t.slice())
      t.pop()
      vis[x] = false
    }
  }
  dfs([])
  return res
}
console.log(permute([1, 2, 3]))

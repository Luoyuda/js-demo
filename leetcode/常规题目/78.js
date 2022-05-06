/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 17:06:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 08:35:38
 * @FilePath: /js-demo/leetcode/常规题目/78.js
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
    78. 子集
    给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
    解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
    示例 1：
    输入：nums = [1,2,3]
    输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
    示例 2：
    输入：nums = [0]
    输出：[[],[0]]
 */
var subsets = function (nums) {
  let res = []
  let numLen = nums.length
  let dfs = (t, start) => {
    res.push(t)
    // 遍历开始
    for (let i = start; i < numLen; i++) {
      t.push(nums[i])
      dfs(t.slice(), i + 1)
      // 递归之后回溯
      t.pop()
    }
  }
  dfs([], 0)
  return res
}

var subset = function (nums) {
  let res = []
  let n = nums.length
  // 000 001 010 100 101 110 011 111
  let b = 1 << n
  for (let i = 0; i < b; i++) {
    let now = []
    for (let j = 0; j < n; j++) {
      if ((i >> j) & 1) {
        now.push(nums[j])
      }
    }
    res.push(now)
  }
  return res
}

console.log(subsets([1, 2, 3]))

/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 17:27:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-27 17:24:12
 * @FilePath: /js-demo/leetcode/常规题目/90.js
 */
/**
    90. 子集 II
    给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
    说明：解集不能包含重复的子集。
    示例:
    输入: [1,2,2]
    输出:
    [
        [2],
        [1],
        [1,2,2],
        [2,2],
        [1,2],
        []
    ]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b)
  const res = []
  const n = nums.length
  const dfs = (t, start) => {
    res.push(t)
    for (let i = start; i < n; i++) {
      if (i > start && nums[i - 1] === nums[i]) continue
      t.push(nums[i])
      dfs(t.slice(), i + 1)
      t.pop()
    }
  }
  dfs([], 0)
  return res
}

console.log(subsetsWithDup([2, 1, 2]))

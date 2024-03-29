/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 17:49:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 18:01:28
 * @FilePath: /js-demo/leetcode/40.js
 */
/**
  40. 组合总和 II
  给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
  candidates 中的每个数字在每个组合中只能使用一次。
  说明：
    所有数字（包括目标数）都是正整数。
    解集不能包含重复的组合。 
  示例 1:
  输入: candidates = [10,1,2,7,6,1,5], target = 8,
  所求解集为:
    [
        [1, 7],
        [1, 2, 5],
        [2, 6],
        [1, 1, 6]
    ]
  示例 2:
  输入: candidates = [2,5,2,1,2], target = 5,
  所求解集为:
    [
        [1,2,2],
        [5]
    ]
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b)
  const res = []
  const n = candidates.length
  const dfs = (t, start, sum) => {
    if (sum === target) return res.push(t)
    if (sum > target) return
    for (let i = start; i < n; i++) {
      const x = candidates[i]
      if (i > start && candidates[i - 1] === x) continue
      t.push(x)
      dfs(t.slice(), i + 1, x + sum)
      t.pop()
    }
  }
  dfs([], 0, 0)
  return res
}
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
console.log(combinationSum2([2, 5, 2, 1, 2], 5))

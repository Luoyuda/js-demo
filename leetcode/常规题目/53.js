/*
 * @Author: xiaohuolong
 * @Date: 2021-03-20 08:58:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 13:32:48
 * @FilePath: /js-demo/leetcode/常规题目/53.js
 */
/**
53. 最大子序和
  给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例 1：
  输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
  输出：6
  解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：
  输入：nums = [1]
  输出：1
示例 3：
  输入：nums = [0]
  输出：0
示例 4：
  输入：nums = [-1]
  输出：-1
示例 5：
  输入：nums = [-100000]
  输出：-100000
提示：
  1 <= nums.length <= 3 * 104
  -105 <= nums[i] <= 105
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // f(x) = max(f(x - 1) + f(x), f(x))
  const n = nums.length
  const dp = []
  dp[0] = nums[0]
  let max = dp[0]
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
    max = Math.max(max, dp[i])
  }
  return max
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // f(x) = max(f(x - 1) + f(x), f(x))
  const n = nums.length
  let pre = nums[0]
  let max = pre
  for (let i = 1; i < n; i++) {
    pre = Math.max(nums[i], pre + nums[i])
    max = Math.max(max, pre)
  }
  return max
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log(maxSubArray([2, 3, -6, 2, 4]))

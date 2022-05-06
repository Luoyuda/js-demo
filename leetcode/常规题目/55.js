/*
 * @Author: xiaohuolong
 * @Date: 2021-04-07 23:13:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-07 23:23:31
 * @FilePath: /js-demo/leetcode/常规题目/55.js
 */
/**
 * @param {number[]} nums
 * @return {boolean}
55. 跳跃游戏
    给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
    数组中的每个元素代表你在该位置可以跳跃的最大长度。
    判断你是否能够到达最后一个下标。
示例 1：
    输入：nums = [2,3,1,1,4]
    输出：true
    解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：
    输入：nums = [3,2,1,0,4]
    输出：false
    解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
提示：
    1 <= nums.length <= 3 * 104
    0 <= nums[i] <= 105
 */
var canJump = function (nums) {
  let n = nums.length
  let right = 0
  for (let i = 0; i < n; i++) {
    if (i <= right) {
      right = Math.max(right, i + nums[i])
      if (right >= n - 1) {
        return true
      }
    }
  }
  return false
}
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let k = 0
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (i <= k) {
      k = Math.max(k, i + nums[i])
      if (k >= n - 1) {
        return true
      }
    }
  }
  return false
}
var nums = [2, 3, 1, 1, 4]
// var nums = [3,2,1,0,4]
var nums = [0]
// var nums = [2,5,0,0]
console.log(canJump(nums))

/*
 * @Author: xiaohuolong
 * @Date: 2021-04-07 23:26:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 10:29:44
 * @FilePath: /js-demo/leetcode/常规题目/45.js
 */
/**
 * @param {number[]} nums
 * @return {number}
45. 跳跃游戏 II
    给定一个非负整数数组，你最初位于数组的第一个位置。
    数组中的每个元素代表你在该位置可以跳跃的最大长度。
    你的目标是使用最少的跳跃次数到达数组的最后一个位置。
示例:
    输入: [2,3,1,1,4]
    输出: 2
    解释: 跳到最后一个位置的最小跳跃数是 2。
        从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
说明:
    假设你总是可以到达数组的最后一个位置。
 */
var jump = function (nums) {
  let len = nums.length
  let end = 0
  let maxPosition = 0
  let steps = 0
  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i])
    if (i == end) {
      end = maxPosition
      steps++
    }
  }
  return steps
}
var jump = function (nums) {
  let n = nums.length
  if (n == 1) return 0
  let l = 0
  let r = 0
  let steps = 0
  while (l <= r) {
    let max = 0
    for (let i = l; i <= r; i++) {
      max = Math.max(max, nums[i] + i)
    }
    l = r + 1
    r = max
    steps++
    if (r >= n - 1) break
  }
  return steps
}
var nums = [2, 3, 1, 1, 4]
console.log(jump(nums))

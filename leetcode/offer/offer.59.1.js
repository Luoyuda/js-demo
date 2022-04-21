/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 20:37:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-28 14:16:02
 * @FilePath: /js-demo/leetcode/offer/offer.59.1.js
 */
/**
剑指 Offer 59 - I. 滑动窗口的最大值
    给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
示例:
    输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
    输出: [3,3,5,5,6,7] 
解释: 
    滑动窗口的位置                最大值
    ---------------               -----
    [1  3  -1] -3  5  3  6  7       3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7
提示：
    你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length
  if (!k || !n) return []
  const q = []
  const res = []
  for (let i = 0; i < k; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) {
      q.pop()
    }
    q.push(i)
  }
  res.push(nums[q[0]])
  for (let i = k; i < n; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) {
      q.pop()
    }
    q.push(i)
    if (i - k === q[0]) q.shift()
    res.push(nums[q[0]])
  }
  return res
}
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))

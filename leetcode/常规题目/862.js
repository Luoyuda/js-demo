/*
862. 和至少为 K 的最短子数组
  给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，
  并返回该子数组的长度。如果不存在这样的 子数组 ，返回 -1 。
  子数组 是数组中 连续 的一部分。
示例 1：
  输入：nums = [1], k = 1
  输出：1
示例 2：
  输入：nums = [1,2], k = 4
  输出：-1
示例 3：
  输入：nums = [2,-1,2], k = 3
  输出：3
提示：
  1 <= nums.length <= 105
  -105 <= nums[i] <= 105
  1 <= k <= 109
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  const n = nums.length
  const P = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    P[i + 1] = P[i] + nums[i]
  }
  const queue = []
  let min = n + 1
  for (let j = 0; j < P.length; j++) {
    while (queue.length && P[queue[queue.length - 1]] >= P[j]) {
      queue.pop()
    }
    while (queue.length && P[j] - P[queue[0]] >= k) {
      min = Math.min(j - queue.shift(), min)
    }
    queue.push(j)
  }
  return min === n + 1 ? -1 : min
}

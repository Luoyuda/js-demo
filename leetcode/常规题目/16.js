/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 10:34:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 11:04:48
 * @FilePath: /js-demo/leetcode/16.js
 */
/**
16. 最接近的三数之和
  给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，
  使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
示例：
  输入：nums = [-1,2,1,-4], target = 1
  输出：2
解释：
  与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
提示：
  3 <= nums.length <= 10^3
  -10^3 <= nums[i] <= 10^3
  -10^4 <= target <= 10^4
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let n = nums.length
  nums.sort((a, b) => a - b)
  let res = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n - 2; i++) {
    const a = nums[i]
    let l = i + 1
    let r = n - 1
    while (l < r) {
      const b = nums[l]
      const c = nums[r]
      const sum = a + b + c
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum
      }
      if (sum > target) {
        r--
      } else {
        l++
      }
    }
  }
  return res
}

console.log(threeSumClosest([1, 2, 4, 8, 16, 32, 64, 128], 82))

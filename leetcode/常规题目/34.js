/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 18:30:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 07:54:52
 * @FilePath: /js-demo/leetcode/常规题目/34.js
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
34. 在排序数组中查找元素的第一个和最后一个位置
    给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
    如果数组中不存在目标值 target，返回 [-1, -1]。
进阶：
    你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
示例 1：
    输入：nums = [5,7,7,8,8,10], target = 8
    输出：[3,4]
示例 2：
    输入：nums = [5,7,7,8,8,10], target = 6
    输出：[-1,-1]
示例 3：
    输入：nums = [], target = 0
    输出：[-1,-1]
提示：
    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
    nums 是一个非递减数组
    -109 <= target <= 109
 */
var binarySearch = function (nums, target, low) {
  let l = 0
  let r = nums.length - 1
  let ans = nums.length
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2)
    if (nums[mid] > target || (low && nums[mid] >= target)) {
      r = mid - 1
      ans = mid
    } else {
      l = mid + 1
    }
  }
  return ans
}
var searchRange = function (nums, target) {
  let res = [-1, -1]
  if (!nums.length) return res
  let left = binarySearch(nums, target, true)
  let right = binarySearch(nums, target, false) - 1
  if (
    left <= right &&
    right < nums.length &&
    nums[left] === target &&
    nums[right] === target
  ) {
    res = [left, right]
  }
  return res
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l < r) {
    let m = l + ((r - l + 1) >> 1)
    if (nums[m] <= target) l = m
    else r = m - 1
  }
  if (nums[l] !== target) return [-1, -1]
  let end = l
  l = 0
  r = end
  while (l < r) {
    let m = l + ((r - l) >> 1)
    if (nums[m] >= target) r = m
    else l = m + 1
  }
  return [l, end]
}
let params = [
  [[5, 7, 7, 8, 8, 10], 8],
  [[1], 1],
]
params.forEach((item) => {
  console.log(searchRange(...item))
})

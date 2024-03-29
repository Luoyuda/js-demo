/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 22:53:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-09 17:34:18
 * @FilePath: /js-demo/leetcode/常规题目/33.js
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
33. 搜索旋转排序数组
    整数数组 nums 按升序排列，数组中的值 互不相同 。
    在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
    给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
示例 1：
    输入：nums = [4,5,6,7,0,1,2], target = 0
    输出：4
示例 2：
    输入：nums = [4,5,6,7,0,1,2], target = 3
    输出：-1
示例 3：
    输入：nums = [1], target = 0
    输出：-1
提示：
    1 <= nums.length <= 5000
    -10^4 <= nums[i] <= 10^4
    nums 中的每个值都 独一无二
    题目数据保证 nums 在预先未知的某个下标上进行了旋转
    -10^4 <= target <= 10^4
进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？
 */
var search = function (nums, target) {
  if (nums.length == 0) return -1
  let n = nums.length - 1
  if (n == 0) return nums[0] == target ? 0 : -1
  let low = 0
  let high = n
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2)
    // console.log(low, high, nums[mid])
    if (nums[mid] == target) return mid
    if (nums[low] <= nums[mid]) {
      if (nums[mid] > target && nums[low] <= target) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else {
      if (nums[mid] < target && nums[high] >= target) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }
  return -1
}

var search = function (nums, target) {
  let n = nums.length
  if (!n) return -1
  // 先找到分界点
  let l = 0
  let r = n - 1
  while (l < r) {
    let m = l + Math.floor((r - l) / 2)
    if (nums[m] <= nums[r]) r = m
    else l = m + 1
  }
  if (target <= nums[n - 1]) r = n - 1
  else {
    l = 0
    r--
  }
  while (l < r) {
    let m = l + Math.floor((r - l) / 2)
    if (nums[m] >= target) r = m
    else l = m + 1
  }
  return nums[l] == target ? l : -1
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2)
    if (nums[m] === target) return m
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) {
        r = m - 1
      } else {
        l = m + 1
      }
    } else {
      if (nums[m] < target && target <= nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
  }
  return -1
}
console.log(search([4, 4, 5, 6, 7, 0, 1, 2], 4))
// console.log(search([4,5,6,7,0,1,2], 2))
// console.log(search([4,5,6,7,0,1,2], 4))
// console.log(search([4,5,6,7,8,1,2,3], 8))
// console.log(search([1], 0))
// console.log(search([3,1], 1))

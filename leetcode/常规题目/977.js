/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 09:26:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-27 09:47:57
 * @FilePath: /js-demo/leetcode/977.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
    977. 有序数组的平方
        给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
    示例 1：
        输入：nums = [-4,-1,0,3,10]
        输出：[0,1,9,16,100]
        解释：平方后，数组变为 [16,1,0,9,100]
        排序后，数组变为 [0,1,9,16,100]
    示例 2：
        输入：nums = [-7,-3,2,3,11]
        输出：[4,9,9,49,121]
    提示：
        1 <= nums.length <= 104
        -104 <= nums[i] <= 104
        nums 已按 非递减顺序 排序
 */
var sortedSquares = function (nums) {
  let left = 0
  let right = nums.length - 1
  let pos = nums.length - 1
  let arr = []
  while (left <= right) {
    // console.log(nums[left], nums[right])
    arr[pos--] =
      Math.pow(nums[left], 2) > Math.pow(nums[right], 2)
        ? Math.pow(nums[left++], 2)
        : Math.pow(nums[right--], 2)
    // left++
    // right--
  }
  return arr
}
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let n = nums.length
  let l = 0
  let r = n - 1
  let i = n - 1
  const res = []
  while (l <= r) {
    const l1 = Math.pow(nums[l], 2)
    const l2 = Math.pow(nums[r], 2)
    let l3
    if (l1 > l2) {
      l++
      l3 = l1
    } else {
      r--
      l3 = l2
    }
    res[i--] = l3
  }
  return res
}
console.log(sortedSquares([-4, -1, 0, 3, 10]))
console.log(sortedSquares([-7, -3, 2, 3, 11]))

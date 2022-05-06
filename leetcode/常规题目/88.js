/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 18:37:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 12:16:05
 * @FilePath: /js-demo/leetcode/常规题目/88.js
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
    88. 合并两个有序数组
        给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
        初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
        你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。
    示例 1：
        输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
        输出：[1,2,2,3,5,6]
    示例 2：
        输入：nums1 = [1], m = 1, nums2 = [], n = 0
        输出：[1]
    提示：
        nums1.length == m + n
        nums2.length == n
        0 <= m, n <= 200
        1 <= m + n <= 200
        -109 <= nums1[i], nums2[i] <= 109
 */
var merge = function (nums1, m, nums2, n) {
  let pos1 = m - 1
  let pos2 = n - 1
  let pos = m + n - 1
  while (pos1 >= 0 && pos2 >= 0) {
    nums1[pos--] = nums1[pos1] > nums2[pos2] ? nums1[pos1--] : nums2[pos2--]
  }
  if (pos1 == -1) {
    for (let i = 0; i < pos2 + 1; i++) {
      nums1[i] = nums2[i]
    }
  }
  return nums1
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
console.log(merge([1], 1, [], 0))
console.log(merge([0], 0, [1], 1))
console.log(merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3))
console.log(merge([4, 0, 0, 0, 0, 0], 1, [1, 2, 3, 5, 6], 5))
console.log(merge([1, 2, 4, 5, 6, 0], 5, [3], 1))
console.log(merge([-1, 0, 0, 3, 3, 3, 0, 0, 0], 6, [1, 2, 2], 3))

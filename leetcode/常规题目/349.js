/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 10:04:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-16 11:52:52
 * @FilePath: /js-demo/leetcode/常规题目/349.js
 */
/**
349. 两个数组的交集
    给定两个数组，编写一个函数来计算它们的交集。
示例 1：
    输入：nums1 = [1,2,2,1], nums2 = [2,2]
    输出：[2]
示例 2：
    输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出：[9,4]
说明：
    输出结果中的每个元素一定是唯一的。
    我们可以不考虑输出结果的顺序。
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i = 0
  let j = 0
  let res = []
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      let x = nums1[i]
      res.push(x)
      while (nums1[i] === x) i++
      while (nums2[j] === x) j++
    } else if (nums1[i] < nums2[j]) {
      i++
    } else {
      j++
    }
  }
  return res
}

console.log(intersection([1, 2, 2, 1], [2, 2]))
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]))

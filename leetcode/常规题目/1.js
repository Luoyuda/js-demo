/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:41:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-16 14:13:31
 * @FilePath: /js-demo/leetcode/常规题目/1.js
 */
var twoSum = function (nums, target) {
  let len = nums.length
  let res = []
  if (!len) return res
  let hash = {}
  for (let i = 0; i < len; i++) {
    let el = nums[i]
    let self = target - el
    let index = hash[self]
    if (index != undefined) {
      res.push(index, i)
    }
    hash[el] = i
  }
  return res
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
1. 两数之和
    给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
    你可以按任意顺序返回答案。
示例 1：
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：
    输入：nums = [3,2,4], target = 6
    输出：[1,2]
示例 3：
    输入：nums = [3,3], target = 6
    输出：[0,1]
提示：
    2 <= nums.length <= 103
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    只会存在一个有效答案
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const hash = {}
  const n = nums.length
  for (let i = 0; i < n; i++) {
    const x = nums[i]
    if (hash[x] !== undefined) {
      return [hash[x], i]
    }
    hash[target - x] = i
  }
  return []
}
console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 2, 4], 6))
console.log(twoSum([3, 3], 6))

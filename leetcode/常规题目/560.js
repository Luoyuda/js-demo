/*
 * @Author: xiaohuolong
 * @Date: 2021-04-07 08:25:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-07 08:45:27
 * @FilePath: /js-demo/leetcode/常规题目/560.js
 */
/**
560. 和为K的子数组
    给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
示例 1 :
    输入:nums = [1,1,1], k = 2
    输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
说明 :
    数组的长度为 [1, 20,000]。
    数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。
 */
var subarraySum = function (nums, k) {
  let pre = new Array(nums.length + 1)
  pre[0] = 0
  for (let i = 0; i < nums.length; i++) {
    pre[i + 1] = pre[i] + nums[i]
  }
  // console.log(pre)
  let ans = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (pre[j + 1] - pre[i] == k) {
        ans++
      }
    }
  }
  return ans
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const map = new Map()
  map.set(0, 1)
  let count = 0
  let pre = 0
  for (const x of nums) {
    pre += x
    if (map.has(pre - k)) {
      count += map.get(pre - k)
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
  }
  return count
}
var nums = [3, 4, 7, 2, -3, 1, 4, 2]
var k = 7
// var nums = [1, 1, 1]
// var k = 2
console.log(subarraySum(nums, k))

/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 00:13:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-15 08:17:51
 * @FilePath: /js-demo/leetcode/26.js
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let n = nums.length
  if (!n) return n
  let l = 0
  let r = 1
  while (r < n) {
    if (nums[l] !== nums[r]) {
      nums[++l] = nums[r]
    }
    r++
  }
  return l + 1
}
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
// console.log(removeDuplicates([1,1,2,3]))

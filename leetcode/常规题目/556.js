/*
556. 下一个更大元素 III
  给你一个正整数 n ，请你找出符合条件的最小整数，
  其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
  注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
示例 1：
  输入：n = 12
  输出：21
示例 2：
  输入：n = 21
  输出：-1
提示：
  1 <= n <= 231 - 1
*/
/**
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {
  const nums = n.toString().split('')
  const len = nums.length
  let i = len - 2
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--
  }
  if (i < 0) return -1
  let j = len - 1
  while (j >= 0 && nums[j] <= nums[i]) {
    j--
  }
  swap(nums, i, j)
  reverse(nums, i + 1, len - 1)
  const x = nums.join('') - 0
  return x >= Math.pow(2, 31) ? -1 : x
}
var swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
var reverse = (arr, l, r) => {
  while (l < r) {
    swap(arr, l++, r--)
  }
}

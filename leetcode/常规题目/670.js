/*
670. 最大交换
  给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
示例 1 :
  输入: 2736
  输出: 7236
  解释: 交换数字2和数字7。
示例 2 :
  输入: 9973
  输出: 9973
  解释: 不需要交换。
注意:
  给定数字的范围是 [0, 108]
*/
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
  const nums = num.toString().split('')
  const last = new Array(10).fill(0)
  const n = nums.length
  for (let i = 0; i < n; i++) {
    last[nums[i] - '0'] = i
  }
  for (let i = 0; i < n - 1; i++) {
    for (let d = 9; d > nums[i] - '0'; d--) {
      if (last[d] > i) {
        swap(nums, i, last[d])
        return +nums.join('')
      }
    }
  }
  return num
}
var swap = function (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

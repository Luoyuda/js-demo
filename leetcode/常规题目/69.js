/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 16:23:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 16:47:52
 * @FilePath: /js-demo/leetcode/69.js
 */
/**
 * @param {number} x
 * @return {number}
    69. x 的平方根
        实现 int sqrt(int x) 函数。
        计算并返回 x 的平方根，其中 x 是非负整数。
        由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
    示例 1:
        输入: 4
        输出: 2
    示例 2:
        输入: 8
        输出: 2
        说明: 8 的平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
 */
var mySqrt = function (x) {
  let left = 0
  let right = Math.floor(x / 2) + 1
  let ans = -1
  while (left <= right) {
    let mid = Math.floor((right + left) / 2)
    let num = mid * mid
    if (num < x) {
      ans = mid
      left = mid + 1
    } else if (num > x) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return ans
}

console.log(mySqrt(100))
// console.log(Math.sqrt(100))

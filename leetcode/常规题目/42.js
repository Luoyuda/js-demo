/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 15:29:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-11 08:51:47
 * @FilePath: /js-demo/leetcode/常规题目/42.js
 */
/**
  42. 接雨水
    给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
  示例 1：
    输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
    输出：6
    解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
  示例 2：
    输入：height = [4,2,0,3,2,5]
    输出：9
  提示：
    n == height.length
    0 <= n <= 3 * 104
    0 <= height[i] <= 105
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let l = 0
  let r = height.length - 1
  let lHeight = 0
  let rHeight = 0
  let ans = 0
  while (l < r) {
    if (height[l] < height[r]) {
      lHeight = Math.max(lHeight, height[l])
      ans += lHeight - height[l]
      l++
    } else {
      rHeight = Math.max(rHeight, height[r])
      ans += rHeight - height[r]
      r--
    }
  }
  return ans
}
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let ans = 0
  const stack = []
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[stack[stack.length - 1]] < height[i]) {
      const k = stack.pop()
      if (!stack.length) break
      const j = stack[stack.length - 1]
      const w = i - j - 1
      const h = Math.min(height[j], height[i]) - height[k]
      ans += h * w
    }
    stack.push(i)
  }
  return ans
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

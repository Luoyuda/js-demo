/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 11:56:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-06 22:16:13
 * @FilePath: /js-demo/leetcode/常规题目/11.js
 */
/**
 * @param {number[]} height
 * @return {number}
    11. 盛最多水的容器
        给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
        在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
        找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
        说明：你不能倾斜容器。
    示例 1：
        输入：[1,8,6,2,5,4,8,3,7]
        输出：49 
        解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
    示例 2：
        输入：height = [1,1]
        输出：1
    示例 3：
        输入：height = [4,3,2,1,4]
        输出：16
    示例 4：
        输入：height = [1,2,1]
        输出：2
    提示：
        n = height.length
        2 <= n <= 3 * 104
        0 <= height[i] <= 3 * 104
 */
var maxArea = function (height) {
  let left = 0
  let right = height.length - 1
  let getArea = (l, r) => {
    // console.log(l, r)
    // console.log(height[l], height[r])
    // console.log(r - l) * Math.min(height[r], height[l])
    return (r - l) * Math.min(height[r], height[l])
  }
  let area = getArea(left, right)
  let i = right
  while (left <= right) {
    i = right
    while (left <= i) {
      area = Math.max(area, getArea(left, i))
      i--
    }
    left++
  }
  return area
}
var maxArea = function (height) {
  let len = height.length - 1
  let left = 0
  let right = len
  let res = 0
  while (left < right) {
    if (height[left] < height[right]) {
      res = Math.max(res, (right - left) * height[left])
      left++
    } else {
      res = Math.max(res, (right - left) * height[right])
      right--
    }
  }
  return res
}

var maxArea = function (height) {
  let len = height.length - 1
  let left = 0
  let right = len
  let res = 0
  while (left < right) {
    let area = Math.min(height[left], height[right]) * (right - left)
    res = Math.max(area, res)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return res
}
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let l = 0
  let r = height.length - 1
  let max = 0
  while (l < r) {
    max = Math.max(Math.min(height[l], height[r]) * (r - l), max)
    if (height[l] < height[r]) l++
    else r--
  }
  return max
}

console.log(maxArea([2, 3, 4, 5, 18, 17, 6]))

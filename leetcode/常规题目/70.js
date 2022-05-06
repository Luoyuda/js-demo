/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 13:20:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-20 09:49:44
 * @FilePath: /js-demo/leetcode/常规题目/70.js
 */
/**
 * @param {number} n
 * @return {number}
    70. 爬楼梯
        假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
        每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
        注意：给定 n 是一个正整数。
    示例 1：
        输入： 2
        输出： 2
        解释： 有两种方法可以爬到楼顶。
        1.  1 阶 + 1 阶
        2.  2 阶
    示例 2：
        输入： 3
        输出： 3
        解释： 有三种方法可以爬到楼顶。
        1.  1 阶 + 1 阶 + 1 阶
        2.  1 阶 + 2 阶
        3.  2 阶 + 1 阶
 */
var climbStairs = function (n) {
  // f(x) = f(x-1)+f(x-2)
  // let dp = []
  // dp[0] = 1
  // dp[1] = 1
  let one = 1
  let two = 1
  let sum = 1
  for (let i = 2; i <= n; i++) {
    sum = one + two
    two = one
    one = sum
    // dp[i] = dp[i-1] + dp[i-2]
  }
  // return dp[n]
  return sum
}
var climbStairs2 = function (n) {
  let steps = [1, 2]
  let dp = []
  dp[0] = 1
  // 排列数
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < steps.length; j++) {
      const step = steps[j]
      if (step > i) continue
      dp[i] = (dp[i] || 0) + dp[i - step]
    }
  }
  // console.log(dp)
  return dp[n]
}

var climbStairs3 = function (n) {
  // f(x) = f(x-1) + f(x-2)
  let one = 1
  let two = 1
  for (let i = 2; i <= n; i++) {
    let tem = two
    two = one + two
    one = tem
  }
  return two
}
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // f(x) = f(x - 1) + f(x - 2)
  const dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // f(x) = f(x - 1) + f(x - 2)
  let one = 1
  let two = 1
  for (let i = 2; i <= n; i++) {
    let temp = one + two
    one = two
    two = temp
  }
  return two
}
// console.log(climbStairs(2))
// console.log(climbStairs(3))
// console.log(climbStairs2(2))
console.log(climbStairs3(3))
console.log(climbStairs3(5))
console.log(climbStairs2(3))
console.log(climbStairs2(5))

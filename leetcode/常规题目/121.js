/*
 * @Author: xiaohuolong
 * @Date: 2021-03-15 16:44:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 13:07:05
 * @FilePath: /js-demo/leetcode/常规题目/121.js
 */
/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
    给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
    你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
    返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
    示例 1：
        输入：[7,1,5,3,6,4]
        输出：5
        解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
            注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
    示例 2：
        输入：prices = [7,6,4,3,1]
        输出：0
        解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
    提示：
        1 <= prices.length <= 105
        0 <= prices[i] <= 104
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0
  let n = prices.length
  for (let i = 0; i < n; i++) {
    const price = prices[i]
    let j = i + 1
    while (j < n) {
      max = Math.max(prices[j] - price, max)
      j++
    }
  }
  return max
}
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length
  if (n < 2) return 0
  // 第 i 天 0 卖出， 1 持有
  // dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + p)
  // dp[i][1] = max(dp[i - 1][1], -p)
  const dp = new Array(n).fill(0).map(() => new Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  return dp[n - 1][0]
}
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length
  // 最低的一天买进，最高的一天卖出
  let max = 0
  let min = Infinity
  for (let i = 0; i < n; i++) {
    min = Math.min(min, prices[i])
    max = Math.max(max, prices[i] - min)
  }
  return max
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))

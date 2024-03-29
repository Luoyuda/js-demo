/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 09:47:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 19:29:01
 * @FilePath: /js-demo/leetcode/常规题目/322.js
 */
/**
  322. 零钱兑换
    给定不同面额的硬币 coins 和一个总金额 amount。
    编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
    你可以认为每种硬币的数量是无限的。
  示例 1：
    输入：coins = [1, 2, 5], amount = 11
    输出：3 
    解释：11 = 5 + 5 + 1
  示例 2：
    输入：coins = [2], amount = 3
    输出：-1
  示例 3：
    输入：coins = [1], amount = 0
    输出：0
  示例 4：
    输入：coins = [1], amount = 1
    输出：1
  示例 5：
    输入：coins = [1], amount = 2
    输出：2
  提示：
    1 <= coins.length <= 12
    1 <= coins[i] <= 231 - 1
    0 <= amount <= 104
*/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(0)
  // f(X) = min(f(X-2)+1, f(X-5)+1, f(X-7)+1)
  for (let i = 1; i <= amount; i++) {
    let min = Number.MAX_SAFE_INTEGER
    for (const c of coins) {
      if (c <= i) {
        min = Math.min(min, dp[i - c] + 1)
      }
    }
    dp[i] = min
  }
  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
}

console.log(coinChange([2, 5, 7], 27))
console.log(coinChange([1, 2, 5], 11))
console.log(coinChange([2], 3))

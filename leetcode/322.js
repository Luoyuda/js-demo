/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 09:47:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 10:20:25
 * @FilePath: /js-demo/leetcode/322.js
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
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
var coinChange = function(coins, amount) {
    // f(X) = min(f(X-2)+1, f(X-5)+1, f(X-7)+1)
    let dp = []
    dp[0] = 0
    let getNumber = (i, j) => {
        return dp[i-j] === undefined ? Infinity : dp[i-j] + 1
    }
    for (let i = 1; i <= amount; i++) {
        // dp[i] = Math.min(...coins.map(j => getNumber(i, j)))
        let min = Infinity
        for (let j = 0; j < coins.length; j++) {
            min = Math.min(min, getNumber(i, coins[j]))
        }
        dp[i] = min
    }
    // console.log(dp)
    return dp[amount] == Infinity ? -1 : dp[amount]
};

console.log(coinChange([2,5,7], 27))
console.log(coinChange([1,2,5], 11))
console.log(coinChange([2], 3))
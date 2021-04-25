/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 12:21:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 19:34:47
 * @FilePath: /js-demo/leetcode/常规题目/518.js
 */
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
    518. 零钱兑换 II
        给定不同面额的硬币和一个总金额。
        写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 
    示例 1:
        输入: amount = 5, coins = [1, 2, 5]
        输出: 4
        解释: 有四种方式可以凑成总金额:
        5=5
        5=2+2+1
        5=2+1+1+1
        5=1+1+1+1+1
    示例 2:
        输入: amount = 3, coins = [2]
        输出: 0
        解释: 只用面额2的硬币不能凑成总金额3。
    示例 3:
        输入: amount = 10, coins = [10] 
        输出: 1
    注意:
        0 <= amount (总金额) <= 5000
        1 <= coin (硬币面额) <= 5000
        硬币种类不超过 500 种
        结果符合 32 位符号整数
 */
var change = function(amount, coins) {
    let dp = []
    for (let i = 0; i <= amount; i++) {
        dp[i] = 0
    }
    dp[0] = 1
    // 组合数
    for (let j = 0; j < coins.length; j++) {
        for (let i = 1; i <= amount; i++) {
            const coin = coins[j];
            if(coin > i) continue
            dp[i] = dp[i] + dp[i - coin]
        }
    }
    // console.log(dp)
    return dp[amount]
}

var change = function(amount, coins){
    let dp = new Array(amount + 1).fill(0)
    dp[0] = 1
    for (let j = 0; j < coins.length; j++) {
        for (let i = 1; i <= amount; i++) {
            let coin = coins[j]
            if(coin > i) continue
            dp[i] = dp[i] + dp[i - coin]
        }
    }
    return dp[amount]
}

console.log(change(5, [1, 2, 5]))
console.log(change(3, [2]))
console.log(change(10, [10]))


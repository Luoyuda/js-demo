/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 15:35:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 15:36:58
 * @FilePath: /js-demo/leetcode/05.11.js
 */
/**
 * @param {number} n
 * @return {number}
    面试题 08.11. 硬币
        硬币。给定数量不限的硬币，币值为25分、10分、5分和1分，
        编写代码计算n分有几种表示法。(结果可能会很大，你需要将结果模上1000000007)
    示例1:
        输入: n = 5
        输出：2
        解释: 有两种方式可以凑成总金额:
        5=5
        5=1+1+1+1+1
    示例2:
        输入: n = 10
        输出：4
        解释: 有四种方式可以凑成总金额:
        10=10
        10=5+5
        10=5+1+1+1+1+1
        10=1+1+1+1+1+1+1+1+1+1
    说明：
        0 <= n (总金额) <= 1000000
 */
var waysToChange = function(amount) {
    let dp = []
    for (let i = 0; i <= amount; i++) {
        dp[i] = 0
    }
    dp[0] = 1
    coins = [1, 5, 10, 25]
    // 组合数
    for (let j = 0; j < coins.length; j++) {
        for (let i = 1; i <= amount; i++) {
            const coin = coins[j];
            if(coin > i) continue
            dp[i] = dp[i] + dp[i - coin]
        }
    }
    // console.log(dp)
    return dp[amount] % 1000000007
}

console.log(waysToChange(1000000))
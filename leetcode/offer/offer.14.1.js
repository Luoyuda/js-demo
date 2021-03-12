/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 11:36:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-25 12:19:29
 * @FilePath: /js-demo/leetcode/offer.14.1.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 14- I. 剪绳子
        给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1）
        每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？
        例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
    示例 1：
        输入: 2
        输出: 1
        解释: 2 = 1 + 1, 1 × 1 = 1
    示例 2:
        输入: 10
        输出: 36
        解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
    提示：
        2 <= n <= 58
 */
var cuttingRope = function(n) {
    let dp = []
    dp[1] = 0
    dp[2] = 1
    // console.log(dp)
    for (let i = 3; i < n + 1; i++) {
        // console.log(`长度为 ${i} 的绳子`)
        dp[i] = 0
        for (let j = 2; j < i; j++) {
            // console.log(j, i - j)
            // console.log(j * dp[i - j], (i - j) * j)
            dp[i] = Math.max(dp[i], Math.max(j * dp[i - j], (i - j) * j))
        }
        // console.log(dp[i])
    }
    return dp[n]
};

var cuttingRope = function(n) {
    if(n <= 3) return n - 1;
    let a = parseInt(n / 3);
    b = (n % 3);
    if(b == 0) return parseInt(Math.pow(3, a));
    if(b == 1) return parseInt(Math.pow(3, a - 1)) * 4;
    return parseInt(Math.pow(3, a)) * 2;
};

console.log(cuttingRope(10))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 10:27:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 10:34:55
 * @FilePath: /js-demo/leetcode/offer.49.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 49. 丑数
        我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。
    示例:
        输入: n = 10
        输出: 12
        解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
    说明:  
        1 是丑数。
        n 不超过1690。
 */
var nthUglyNumber = function(n) {
    let a = 0
    let b = 0
    let c = 0
    let dp = []
    dp[0] = 1
    for (let i = 1; i < n; i++) {
        let n2 = dp[a] * 2
        let n3 = dp[b] * 3
        let n5 = dp[c] * 5
        let min = Math.min(n2, n3, n5)
        dp[i] = min
        if(min == n2) a++
        if(min == n3) b++
        if(min == n5) c++
    }
    return dp[n - 1]
};

console.log(nthUglyNumber(10))
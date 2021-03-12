/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 09:50:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 10:08:46
 * @FilePath: /js-demo/leetcode/offer.10.1.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 10- I. 斐波那契数列
    写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
    F(0) = 0,   F(1) = 1
    F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
    斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
    答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
    示例 1：
        输入：n = 2
        输出：1
    示例 2：
        输入：n = 5
        输出：5
    提示：
        0 <= n <= 100
 */
var fib = function(n) {
    if (n < 2) return n;
    return fib(n-1) + fib(n-2)
};

// 动态规划的四个步骤
var fib = function(n) {
    if (n <= 1) return n;
    let constant = 1000000007;
    // 1. 定义状态数组，dp[i] 表示的是数字 i 的斐波那契数
    let dp = []

    // 2. 状态初始化
    dp[0] = 0;
    dp[1] = 1;

    // 3. 状态转移
    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % constant;
    }

    // 4. 返回最终需要的状态值
    // console.log(dp)
    return dp[n];
}

var fib = function(n){
    if (n < 2) return n;
    let constant = 1000000007;
    let one = 0
    let two = 1
    while(n-- > 0){
        let temp = two % constant
        two = one
        one = (one + temp) % constant
    }
    return one
}

console.log(fib(81)) // 107920472
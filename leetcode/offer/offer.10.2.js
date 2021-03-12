/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 10:11:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 10:20:09
 * @FilePath: /js-demo/leetcode/offer.10.2.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 10- II. 青蛙跳台阶问题
    一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
    答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
    示例 1：
        输入：n = 2
        输出：2
    示例 2：
        输入：n = 7
        输出：21
    示例 3：
        输入：n = 0
        输出：1
    提示：
        0 <= n <= 100
 */
var numWays = function(n) {
    if (n < 2) return 1;
    let constant = 1000000007;
    let one = 1
    let two = 1
    while(n-- > 1){
        let temp = two % constant
        two = one
        one = (one + temp) % constant
    }
    return one
}

console.log(numWays(7)) // 21
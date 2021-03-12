/*
 * @Author: xiaohuolong
 * @Date: 2021-03-09 18:25:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-09 18:33:23
 * @FilePath: /js-demo/leetcode/offer.43.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 43. 1～n 整数中 1 出现的次数
        输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。
        例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。
    示例 1：
        输入：n = 12
        输出：5
    示例 2：
        输入：n = 13
        输出：6
    限制：
        1 <= n < 2^31
 */
var countDigitOne = function(n) {
    let digit = 1
    let res = 0
    let high = parseInt(n / 10)
    let cur = n % 10 
    let low = 0
    while(high > 0 || cur > 0){
        if(cur == 0) res += high * digit
        else if(cur == 1) res += high * digit + low + 1
        else res += (high + 1) * digit
        low += cur * digit
        cur = high % 10
        high = parseInt(high / 10)
        digit *= 10
        // console.log(high, cur, low)
    }
    return res
};

console.log(countDigitOne(12))
console.log(countDigitOne(100))
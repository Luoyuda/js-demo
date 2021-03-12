/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 08:40:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 08:58:42
 * @FilePath: /js-demo/leetcode/offer.44.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 44. 数字序列中某一位的数字
        数字以0123456789101112131415…的格式序列化到一个字符序列中。
        在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。
    请写一个函数，求任意第n位对应的数字。
    示例 1：
        输入：n = 3
        输出：3
    示例 2：
        输入：n = 11
        输出：0
    限制：
        0 <= n < 2^31
 */
var findNthDigit = function(n) {
    let digit = 1
    let start = 1
    let count = 9
    while(n > count){
        n -= count
        digit += 1
        start *= 10
        count = digit * start * 9
    }
    let num = start + parseInt((n - 1) / digit)
    return String(num).charAt((n - 1) % digit) - '0'
};

console.log(findNthDigit(15))
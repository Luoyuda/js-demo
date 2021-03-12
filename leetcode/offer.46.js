/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 10:10:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 10:20:51
 * @FilePath: /js-demo/leetcode/offer.46.js
 */
/**
 * @param {number} num
 * @return {number}
剑指 Offer 46. 把数字翻译成字符串
    给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，
    11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。
    请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
示例 1:
    输入: 12258
    输出: 5
    解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
提示：
    0 <= num < 231
 */
var translateNum = function(num) {
    let a = 1
    let b = 1
    let x = num % 10
    let y = num % 10
    while(num != 0){
        num = parseInt(num / 10)
        x = num % 10
        let temp = 10 * x + y
        let c = temp >= 10 && temp <= 25 ? a + b : a
        b = a
        a = c
        y = x
    }
    return a
};

console.log(translateNum(12258))
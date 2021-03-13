/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 18:16:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 18:20:49
 * @FilePath: /js-demo/leetcode/offer/offer.65.js
 */
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
    剑指 Offer 65. 不用加减乘除做加法
        写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。
    示例:
        输入: a = 1, b = 1
        输出: 2
    提示：
        a, b 均可能是负数或 0
        结果不会溢出 32 位整数
 */
var add = function(a, b) {
    while(b != 0){
        // 进位
        let c = (a & b) << 1
        a ^= b
        b = c
    }
    return a
};

console.log(add(10, 29))
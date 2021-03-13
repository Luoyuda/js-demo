/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 10:20:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 10:22:55
 * @FilePath: /js-demo/leetcode/offer/offer.64.js
 */
/**
 * @param {number} n
 * @return {number}
    剑指 Offer 64. 求1+2+…+n
        求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
    示例 1：
        输入: n = 3
        输出: 6
    示例 2：
        输入: n = 9
        输出: 45
    限制：
        1 <= n <= 10000
 */
var sumNums = function(n) {
    return n == 0 ? 0 : n + sumNums(n - 1)
};

console.log(sumNums(3))
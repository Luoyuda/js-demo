/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 08:35:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 08:36:43
 * @FilePath: /js-demo/leetcode/面试金典/05.06.js
 */
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
面试题 05.06. 整数转换
    整数转换。编写一个函数，确定需要改变几个位才能将整数A转成整数B。
示例1:
    输入：A = 29 （或者0b11101）, B = 15（或者0b01111）
    输出：2
示例2:
    输入：A = 1，B = 2
    输出：2
提示:
    A，B范围在[-2147483648, 2147483647]之间
 */
var convertInteger = function(A, B) {
    let ans = 0
    let C = A ^ B
    while (C) {
        C = C & (C - 1)
        ans++
    }
    return ans
};

console.log(convertInteger(29, 15))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-26 08:55:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 08:58:02
 * @FilePath: /js-demo/leetcode/常规题目/371.js
 */
/* 
371. 两整数之和
    不使用运算符 + 和 - ​​​​​​​，计算两整数 ​​​​​​​a 、b ​​​​​​​之和。
示例 1:
    输入: a = 1, b = 2
    输出: 3
示例 2:
    输入: a = -2, b = 3
    输出: 1
*/
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    if(!b) return a
    let sum = a ^ b
    let carry = (a & b) << 1
    return getSum(sum, carry)
};

console.log(getSum(1, 2))
console.log(getSum(5, 5))
console.log(getSum(-2, 3))
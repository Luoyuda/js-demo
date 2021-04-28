/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 11:30:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 11:34:04
 * @FilePath: /js-demo/leetcode/常规题目/504.js
 */
/* 
504. 七进制数
    给定一个整数，将其转化为7进制，并以字符串形式输出。
示例 1:
    输入: 100
    输出: "202"
示例 2:
    输入: -7
    输出: "-10"
注意: 输入范围是 [-1e7, 1e7] 。
*/
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(n) {
    let sign = n > 0 ? '' : "-"
    n = Math.abs(n)
    let k = 7
    let str = ''
    while (n) {
        str = (n % k) + str
        n = Math.floor(n / k)
    }
    return sign + str
};

console.log(convertToBase7(100))
console.log(convertToBase7(-2))
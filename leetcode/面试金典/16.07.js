/*
 * @Author: xiaohuolong
 * @Date: 2021-03-14 13:44:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-14 13:51:29
 * @FilePath: /js-demo/leetcode/16.07.js
 */
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
    面试题 16.07. 最大数值
        编写一个方法，找出两个数字a和b中最大的那一个。不得使用if-else或其他比较运算符。
    示例：
        输入： a = 1, b = 2
        输出： 2
*/
var maximum = function(a, b) {
    let c = a, d = b;
    let k = 1 + ((c - d) >> 63);
    return k * a + (!k) * b;
};

console.log(maximum(1, 2))
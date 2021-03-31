/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 23:07:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 23:10:38
 * @FilePath: /js-demo/leetcode/面试金典/17.01.js
 */
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
面试题 17.01. 不用加号的加法
    设计一个函数把两个数字相加。不得使用 + 或者其他算术运算符。
示例:
    输入: a = 1, b = 1
    输出: 2
提示：
    a, b 均可能是负数或 0
    结果不会溢出 32 位整数
 */
var add = function(a, b) {
    while(b != 0){
        let carry = (a & b) << 1
        a ^= b
        b = carry
    }
    return a
};

console.log(add(5, 6))
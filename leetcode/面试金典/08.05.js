/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 08:23:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 08:29:47
 * @FilePath: /js-demo/leetcode/面试金典/08.05.js
 */
/**
面试题 08.05. 递归乘法
    递归乘法。 写一个递归函数，不使用 * 运算符， 实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。
示例1:
    输入：A = 1, B = 10
    输出：10
示例2:
    输入：A = 3, B = 4
    输出：12
提示:
    保证乘法范围不会溢出
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var multiply = function(A, B) {
    let sum = 0
    for (let i = 0; i < B; i++) {
        sum = A + sum
    }
    return sum
};

var multiply = function(A, B) {
    let res = 0
    while (B){
        if(B & 1){
            res += A
        }
        B >>= 1
        if(B){
            A += A
        }
    }
    return res
}

console.log(multiply(3, 4))
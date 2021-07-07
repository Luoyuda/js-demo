/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 18:16:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-07 22:44:16
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
        let c = a ^ b
        let d = (a & b) << 1
        a = c
        b = d
        // 进位
    //     let c = (a & b) << 1
    //     a ^= b
    //     b = c
    }
    return a
};

var minus = function(a, b){
    return add(a, -b)
}

var multiply = function(a, b){
    let ans = 0
    while(b) {
        if(b & 1) {
            ans = add(a, ans);
        }
        a = add(a, a);
        b >>= 1;
    }
    return ans
}

var division = function(a, b){
    let count = 0
    while(a >= b){
        a = minus(a, b)
        count++
    }
    return count
}

var pow = function(a, b){
    let ans = 1
    while(b) {
        if(b & 1) {
            ans = multiply(ans, a);
        }
        a = multiply(a, a);
        b >>= 1;
    }
    return ans
}

console.log(add(5, 6))
console.log(minus(5, 106))
console.log(multiply(5, 101))
console.log(division(100, 5))
console.log(pow(2, 10))
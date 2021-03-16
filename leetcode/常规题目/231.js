/*
 * @Author: xiaohuolong
 * @Date: 2021-03-13 09:20:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-13 09:22:03
 * @FilePath: /js-demo/leetcode/231.js
 */
/**
 * @param {number} n
 * @return {boolean}
    231. 2的幂
        给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
    示例 1:
        输入: 1
        输出: true
        解释: 20 = 1
    示例 2:
        输入: 16
        输出: true
        解释: 24 = 16
    示例 3:
        输入: 218
        输出: false
 */
var isPowerOfTwo = function(n) {
    return n > 0 && ((n & (n - 1)) == 0)
};

console.log(isPowerOfTwo(2))
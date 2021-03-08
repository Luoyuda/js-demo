/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 18:08:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 18:28:06
 * @FilePath: /js-demo/leetcode/326.js
 */
/**
 * @param {number} n
 * @return {boolean}
    326. 3的幂
        给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。
        整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3x
    示例 1：
        输入：n = 27
        输出：true
    示例 2：
        输入：n = 0
        输出：false
    示例 3：
        输入：n = 9
        输出：true
    示例 4：
        输入：n = 45
        输出：false
    提示：
        -231 <= n <= 231 - 1
    进阶：
        你能不使用循环或者递归来完成本题吗？
 */
// 迭代
var isPowerOfThree = function(n) {
    if(n < 1) return false
    while(n > 1){
        if(n % 3 != 0) return false
        n /= 3
    }
    return true
};
// 递归
var isPowerOfThree = function(n) {
    if(n === 1) return true
    if(n <= 0) return false
    if(n % 3 != 0) return false
    return isPowerOfThree(n/3)
};
// 最大
const maxPow =parseInt((Math.log(0x7fffffff)/ Math.log(3)));
const max = Math.pow(3, maxPow)
var isPowerOfThree = function(n){
    if(n <= 0) return false
    return max % n === 0
}
console.log(isPowerOfThree(27))
console.log(isPowerOfThree(28))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-15 08:30:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-16 12:01:42
 * @FilePath: /js-demo/leetcode/常规题目/66.js
 */
/**
 * @param {number[]} digits
 * @return {number[]}
66. 加一
    给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
    最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
    你可以假设除了整数 0 之外，这个整数不会以零开头。
示例 1：
    输入：digits = [1,2,3]
    输出：[1,2,4]
    解释：输入数组表示数字 123。
示例 2：
    输入：digits = [4,3,2,1]
    输出：[4,3,2,2]
    解释：输入数组表示数字 4321。
示例 3：
    输入：digits = [0]
    输出：[1]
*/
var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++
        digits[i] %= 10
        if(digits[i] !== 0){
            return digits
        }
    }
    digits.splice(0, 0, 1)
    return digits
};
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let carry = 1
    let len = digits.length - 1
    for (let i = len; i >= 0; i--) {
        let sum = digits[i] + carry
        carry = Math.floor(sum / 10)
        digits[i] = sum % 10
        if(carry == 0) return digits
    }
    if(carry) digits.unshift(carry)
    return digits
};

console.log(plusOne([9, 9]))
console.log(plusOne([4,3,2,1]))
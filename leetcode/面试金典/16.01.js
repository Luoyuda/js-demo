/*
 * @Author: xiaohuolong
 * @Date: 2021-03-14 13:11:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-14 13:16:22
 * @FilePath: /js-demo/leetcode/16.01.js
 */
/**
 * @param {number[]} numbers
 * @return {number[]}
    面试题 16.01. 交换数字
        编写一个函数，不用临时变量，直接交换numbers = [a, b]中a与b的值。
    示例：
        输入: numbers = [1,2]
        输出: [2,1]
    提示：
        numbers.length == 2
 */
var swapNumbers = function(numbers) {
    numbers[0] ^= numbers[1]
    numbers[1] ^= numbers[0]
    numbers[0] ^= numbers[1]
    return numbers
};

console.log(swapNumbers([1,2]))
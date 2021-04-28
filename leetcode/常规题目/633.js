/*
 * @Author: xiaohuolong
 * @Date: 2021-04-28 00:04:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 00:07:53
 * @FilePath: /js-demo/leetcode/常规题目/633.js
 */
/* 
633. 平方数之和
    给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a2 + b2 = c 。
示例 1：
    输入：c = 5
    输出：true
    解释：1 * 1 + 2 * 2 = 5
示例 2：
    输入：c = 3
    输出：false
示例 3：
    输入：c = 4
    输出：true
示例 4：
    输入：c = 2
    输出：true
示例 5：
    输入：c = 1
    输出：true
提示：
    0 <= c <= 231 - 1
*/
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let left = 0
    let right = Math.floor(Math.sqrt(c))
    while (left <= right){
        let sum = left * left + right * right
        if(sum < c){
            left++
        }else if(sum > c){
            right--
        }else {
            return true
        }
    }
    return false
};

console.log(judgeSquareSum(5))
console.log(judgeSquareSum(4))
console.log(judgeSquareSum(3))
console.log(judgeSquareSum(2))
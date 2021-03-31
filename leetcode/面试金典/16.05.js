/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 08:39:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 08:41:59
 * @FilePath: /js-demo/leetcode/面试金典/16.05.js
 */
/**
 * @param {number} n
 * @return {number}
面试题 16.05. 阶乘尾数
    设计一个算法，算出 n 阶乘有多少个尾随零。
示例 1:
    输入: 3
    输出: 0
    解释: 3! = 6, 尾数中没有零。
示例 2:
    输入: 5
    输出: 1
    解释: 5! = 120, 尾数中有 1 个零.
说明: 你算法的时间复杂度应为 O(log n) 。
 */
var trailingZeroes = function(n) {
    let ans = 0
    while(n >= 5){
        let temp = parseInt(n / 5) 
        ans += temp
        n = temp
    }
    return ans
};

console.log(trailingZeroes(3))
console.log(trailingZeroes(5))
console.log(trailingZeroes(10))
console.log(trailingZeroes(100))
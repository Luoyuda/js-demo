/*
 * @Author: xiaohuolong
 * @Date: 2021-05-19 08:46:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 08:49:07
 * @FilePath: /js-demo/leetcode/常规题目/343.js
 */
/*
343. 整数拆分
    给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
示例 1:
    输入: 2
    输出: 1
    解释: 2 = 1 + 1, 1 × 1 = 1。
示例 2:
    输入: 10
    输出: 36
    解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
说明: 你可以假设 n 不小于 2 且不大于 58。
*/
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
    if(n <= 3) return 1 * (n - 1)
    let ans = 1
    if(n % 3 == 1){
        n -= 4
        ans *= 4
    }else if(n % 3 == 2){
        n -= 2
        ans *= 2
    }
    while(n){
        n -= 3
        ans *= 3
    }
    return ans
};
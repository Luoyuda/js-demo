/*
 * @Author: xiaohuolong
 * @Date: 2021-04-10 14:37:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-10 14:48:08
 * @FilePath: /js-demo/leetcode/常规题目/263.js
 */
/**
 * @param {number} n
 * @return {boolean}
263. 丑数
    给你一个整数 n ，请你判断 n 是否为 丑数 。如果是，返回 true ；否则，返回 false 。
    丑数 就是只包含质因数 2、3 和/或 5 的正整数。
示例 1：
    输入：n = 6
    输出：true
    解释：6 = 2 × 3
示例 2：
    输入：n = 8
    输出：true
    解释：8 = 2 × 2 × 2
示例 3：
    输入：n = 14
    输出：false
    解释：14 不是丑数，因为它包含了另外一个质因数 7 。
示例 4：
    输入：n = 1
    输出：true
    解释：1 通常被视为丑数。
提示：
    -231 <= n <= 231 - 1
 */
var isUgly = function(n) {
    if(n <= 0) return false
    while(n > 1){
        if(n % 5 == 0){
            n /= 5
        }else if(n % 3 == 0){
            n /= 3
        }else if(n % 2 == 0){
            n /= 2
        }else {
            return false
        }
    }
    return true
};
var isUgly = function(n) {
    if(n <= 0) return false
    let factors = [5,3,2]
    for (const factor of factors) {
        while(n % factor == 0){
            n /= factor
        }
    }
    return n == 1
}
let params = [6, 8 , 14, 1, -1]
params.forEach(item => {
    console.log(isUgly(item))
})
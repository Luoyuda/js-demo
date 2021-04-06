/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 08:18:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-06 08:23:17
 * @FilePath: /js-demo/leetcode/常规题目/1304.js
 */
/**
 * @param {number} n
 * @return {number[]}
1304. 和为零的N个唯一整数
    给你一个整数 n，请你返回 任意 一个由 n 个 各不相同 的整数组成的数组，并且这 n 个数相加和为 0 。
示例 1：
    输入：n = 5
    输出：[-7,-1,1,3,4]
    解释：这些数组也是正确的 [-5,-1,1,2,3]，[-3,-1,2,-2,4]。
示例 2：
    输入：n = 3
    输出：[-1,0,1]
示例 3：
    输入：n = 1
    输出：[0]
提示：
    1 <= n <= 1000
 */
var sumZero = function(n) {
    let sum = 0
    let ans = []
    for (let i = 1; i < n; i++) {
        ans[i] = i
        sum -= i
    }
    ans[0] = sum
    return ans
};

console.log(sumZero(5))
console.log(sumZero(3))
console.log(sumZero(1))
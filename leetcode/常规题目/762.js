/*
 * @Author: xiaohuolong
 * @Date: 2021-04-26 08:16:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 08:23:33
 * @FilePath: /js-demo/leetcode/常规题目/762.js
 */
/*
762. 二进制表示中质数个计算置位
    给定两个整数 L 和 R ，找到闭区间 [L, R] 范围内，计算置位位数为质数的整数个数。
    （注意，计算置位代表二进制表示中1的个数。例如 21 的二进制表示 10101 有 3 个计算置位。还有，1 不是质数。）
示例 1:
    输入: L = 6, R = 10
    输出: 4
解释:
    6 -> 110 (2 个计算置位，2 是质数)
    7 -> 111 (3 个计算置位，3 是质数)
    9 -> 1001 (2 个计算置位，2 是质数)
    10-> 1010 (2 个计算置位，2 是质数)
示例 2:
    输入: L = 10, R = 15
    输出: 5
解释:
    10 -> 1010 (2 个计算置位, 2 是质数)
    11 -> 1011 (3 个计算置位, 3 是质数)
    12 -> 1100 (2 个计算置位, 2 是质数)
    13 -> 1101 (3 个计算置位, 3 是质数)
    14 -> 1110 (3 个计算置位, 3 是质数)
    15 -> 1111 (4 个计算置位, 4 不是质数)
注意:
    L, R 是 L <= R 且在 [1, 10^6] 中的整数。
    R - L 的最大值为 10000。
*/
/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var primes = [2,3,5,7,11,13,17,19]
var countPrimeSetBits = function(L, R) {
    let ans = 0
    for (let i = L; i <= R; i++) {
        let s = 0
        // i 右移 1位 1的个数会等于 k & 1
        for (let k = i; k > 0; k >>= 1) s += k & 1
        if(primes.includes(s)) ans += 1
    }
    return ans
};
console.log(countPrimeSetBits(10, 15))

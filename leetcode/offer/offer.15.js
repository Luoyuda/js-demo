/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 10:16:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-25 10:36:14
 * @FilePath: /js-demo/leetcode/offer.15.js
 */
/**
 * @param {number} n - a positive integer
 * @return {number}
    剑指 Offer 15. 二进制中1的个数
        请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。
        例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。
    示例 1：
        输入：00000000000000000000000000001011
        输出：3
        解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
    示例 2：
        输入：00000000000000000000000010000000
        输出：1
        解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
    示例 3：
        输入：11111111111111111111111111111101
        输出：31
        解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
    提示：
        输入必须是长度为 32 的 二进制串 。
 */
var hammingWeight = function(n) {
    let count = 0
    while(n!==0){
        // console.log('--')
        // console.log(n.toString(2))
        // console.log((n-1).toString(2))
        // console.log('-------------------')
        n = (n-1) & n
        // console.log(n.toString(2))
        count++
    }
    return count
};

// var hammingWeight = function(n) {
//     let count = 0
//     while(n!==0){
//         // console.log('--')
//         // console.log(n.toString(2))
//         // console.log('-------------------')
//         count += n & 1
//         n >>= 1
//         // console.log(n.toString(2))

//     }
//     return count
// };

console.log(hammingWeight(10))
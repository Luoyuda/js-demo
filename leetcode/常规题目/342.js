/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 10:23:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 10:26:11
 * @FilePath: /js-demo/leetcode/常规题目/342.js
 */
/*
342. 4的幂
    给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。
    整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4x
示例 1：
    输入：n = 16
    输出：true
示例 2：
    输入：n = 5
    输出：false
示例 3：
    输入：n = 1
    输出：true
提示：
    -231 <= n <= 231 - 1
进阶：
    你能不使用循环或者递归来完成本题吗？
    
0xaaaaaaaa = 10101010101010101010101010101010 (偶数位为1，奇数位为0）
0x55555555 = 1010101010101010101010101010101 (偶数位为0，奇数位为1）
0x33333333 = 110011001100110011001100110011 (1和0每隔两位交替出现)
0xcccccccc = 11001100110011001100110011001100(0和1每隔两位交替出现)
0x0f0f0f0f = 00001111000011110000111100001111 (1和0每隔四位交替出现)
0xf0f0f0f0 = 11110000111100001111000011110000 (0和1每隔四位交替出现)
*/
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    return n > 0 && (n & (n - 1)) == 0 && (n & 0xAAAAAAAA) == 0
};

let params = [
    16,
    15,
    4,
    1,
    0
]

for (const param of params) {
    console.log(isPowerOfFour(param))
}
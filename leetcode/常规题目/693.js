/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 10:32:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 10:46:52
 * @FilePath: /js-demo/leetcode/常规题目/693.js
 */
/*
693. 交替位二进制数
    给定一个正整数，检查它的二进制表示是否总是 0、1 交替出现：换句话说，就是二进制表示中相邻两位的数字永不相同。
示例 1：
    输入：n = 5
    输出：true
    解释：5 的二进制表示是：101
示例 2：
    输入：n = 7
    输出：false
    解释：7 的二进制表示是：111.
示例 3：
    输入：n = 11
    输出：false
    解释：11 的二进制表示是：1011.
示例 4：
    输入：n = 10
    输出：true
    解释：10 的二进制表示是：1010.
示例 5：
    输入：n = 3
    输出：false
提示：
    1 <= n <= 231 - 1 
0xaaaaaaaa = 10101010101010101010101010101010 (偶数位为1，奇数位为0）
0x55555555 = 1010101010101010101010101010101 (偶数位为0，奇数位为1）
*/
/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    // console.log(n.toString(2))
    // console.log((n >> 1).toString(2))
    // console.log((n ^ (n >> 1)).toString(2))
    n = (n ^ (n >> 1));
    // console.log(n)
    return (n & (n + 1)) == 0;
};

let params = [
    2,
    4,
    5,
    7,
    11,
    10,
    17,
    3
]

for (const param of params) {
    console.log(hasAlternatingBits(param))
}
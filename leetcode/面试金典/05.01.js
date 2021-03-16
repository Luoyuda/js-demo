/*
 * @Author: xiaohuolong
 * @Date: 2021-03-14 15:36:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-14 15:58:20
 * @FilePath: /js-demo/leetcode/05.01.js
 */
/**
 * @param {number} N
 * @param {number} M
 * @param {number} i
 * @param {number} j
 * @return {number}
    面试题 05.01. 插入
        给定两个整型数字 N 与 M，以及表示比特位置的 i 与 j（i <= j，且从 0 位开始计算）。
        编写一种方法，使 M 对应的二进制数字插入 N 对应的二进制数字的第 i ~ j 位区域，不足之处用 0 补齐。
        具体插入过程如图所示。
    示例1:
        输入：N = 1024(10000000000), M = 19(10011), i = 2, j = 6
        输出：N = 1100(10001001100)
    示例2:
        输入： N = 0, M = 31(11111), i = 0, j = 4
        输出：N = 31(11111)
 */
var insertBits = function(N, M, i, j) {
    return ((~((((-1) << (31 - j)) >>> (31 - j + i)) << i)) & N) | (M << i);
};

console.log(insertBits(1024, 19, 2, 6))
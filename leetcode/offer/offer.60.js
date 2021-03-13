/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 17:48:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 18:16:22
 * @FilePath: /js-demo/leetcode/offer/offer.60.js
 */
/**
 * @param {number} n
 * @return {number[]}
    剑指 Offer 60. n个骰子的点数
        把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
        你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。
    示例 1:
        输入: 1
        输出: [0.16667,0.16667,0.16667,0.16667,0.16667,0.16667]
    示例 2:
        输入: 2
        输出: [0.02778,0.05556,0.08333,0.11111,0.13889,0.16667,0.13889,0.11111,0.08333,0.05556,0.02778]
    限制：
        1 <= n <= 11
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var dicesProbability = function(n) {
    let dp = [ 1/6, 1/6, 1/6, 1/6, 1/6, 1/6 ];
    for (let i = 2; i <= n; i++) {
        const temp = [];
        for (let j = 1; j <= 6; j++) {
            for (let k = 0; k < dp.length; k++) {
                const sum = k + j - 1;
                temp[ sum ] = (temp[ sum ] || 0) + dp[ k ] * 1/6;
            }
        }
        dp = temp;
    }
    return dp;
};

console.log(dicesProbability(2))
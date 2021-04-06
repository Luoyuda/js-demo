/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 16:48:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 16:54:52
 * @FilePath: /js-demo/leetcode/LCP/06.js
 */
/**
 * @param {number[]} coins
 * @return {number}
 * LCP 06. 拿硬币
    桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，
    拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。
示例 1：
    输入：[4,2,1]
    输出：4
    解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。
示例 2：
    输入：[2,3,10]
    输出：8
限制：
    1 <= n <= 4
    1 <= coins[i] <= 10
 */
var minCount = function(coins) {
    let sum = 0
    for (let i = 0; i < coins.length; i++) {
        const count = coins[i];
        sum += parseInt(((count + 1) / 2))
    }
    return sum
};
var coins = [4, 2, 1]
var coins = [2,3,10]
console.log(minCount(coins))
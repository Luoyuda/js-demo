/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 11:44:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 11:47:47
 * @FilePath: /js-demo/leetcode/常规题目/1423.js
 */
/*
1423. 可获得的最大点数
    几张卡牌 排成一行，每张卡牌都有一个对应的点数。点数由整数数组 cardPoints 给出。
    每次行动，你可以从行的开头或者末尾拿一张卡牌，最终你必须正好拿 k 张卡牌。
    你的点数就是你拿到手中的所有卡牌的点数之和。
    给你一个整数数组 cardPoints 和整数 k，请你返回可以获得的最大点数。
示例 1：
    输入：cardPoints = [1,2,3,4,5,6,1], k = 3
    输出：12
    解释：第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
示例 2：
    输入：cardPoints = [2,2,2], k = 2
    输出：4
    解释：无论你拿起哪两张卡牌，可获得的点数总是 4 。
示例 3：
    输入：cardPoints = [9,7,7,9,7,7,9], k = 7
    输出：55
    解释：你必须拿起所有卡牌，可以获得的点数为所有卡牌的点数之和。
示例 4：
    输入：cardPoints = [1,1000,1], k = 1
    输出：1
    解释：你无法拿到中间那张卡牌，所以可以获得的最大点数为 1 。 
示例 5：
    输入：cardPoints = [1,79,80,1,1,1,200,1], k = 3
    输出：202
提示：
    1 <= cardPoints.length <= 10^5
    1 <= cardPoints[i] <= 10^4
    1 <= k <= cardPoints.length
*/
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let n = cardPoints.length
    let pre = new Array(n + 1).fill(0)
    pre[0] = 0
    for(let i = 1; i <= n; i++){
        pre[i] = pre[i - 1] + cardPoints[i - 1]
    }
    let min = Infinity
    let j = n - k
    for(let i = 0; i + j <= n; i++){
        min = Math.min(min, pre[i + j] - pre[i])
    }
    return pre[n] - min
};
var maxScore = function(cardPoints, k) {
    let n = cardPoints.length
    let j = n - k
    let sum = 0
    for(let i = 0; i < j; i++) sum += cardPoints[i]
    let minSum = total = sum
    for(let i = j; i < n; i++){
        sum = sum - cardPoints[i - j] + cardPoints[i]
        total += cardPoints[i]
        minSum = Math.min(sum, minSum)
    }
    return total - minSum
};
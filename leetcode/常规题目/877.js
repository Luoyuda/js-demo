/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 21:25:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 22:01:50
 * @FilePath: /js-demo/leetcode/常规题目/877.js
 */
/**
 * @param {number[]} piles
 * @return {boolean}
877. 石子游戏
    亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子 piles[i] 。
    游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。
    亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。
    假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回 true ，当李赢得比赛时返回 false 。
示例：
    输入：[5,3,4,5]
    输出：true
    解释：
    亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。
    假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
    如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。
    如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。
    这表明，取前 5 颗石子对亚历克斯来说是一个胜利的举动，所以我们返回 true 。
提示：
    2 <= piles.length <= 500
    piles.length 是偶数。
    1 <= piles[i] <= 500
    sum(piles) 是奇数。
 */
var stoneGame = function(piles) {
    /**
     * dp[i][j] 代表 i 到 j 所能获得到最大的绝对分数
     * 例：dp[0][3] = 1  0到3这个区间可以赢1分
     * dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])
     */
    let dp = []
    for (let i = 0; i < piles.length; i++) {
        dp.push(new Array(piles.length).fill(0))
        dp[i][i] = piles[i]
    }
    /**
     * [5, 2, 4, 1]
     * [0, 3, 1, 4]
     * [0, 0, 4, 1]
     * [0, 0, 0, 5]
     */
    for (let j = 1; j < piles.length; j++) {
        for (let i = 0; i < piles.length - j; i++) {
            let J = j + i
            // console.log(i, J)
            // console.log(piles[i], dp[i+1][J], piles[J], dp[i][J-1])
            dp[i][J] = Math.max(piles[i] - dp[i+1][J], piles[J] - dp[i][J-1])
        }
    }
    // console.log(dp)
    return dp[0][piles.length - 1] > 0
};

console.log(stoneGame([5, 3, 4, 5]))
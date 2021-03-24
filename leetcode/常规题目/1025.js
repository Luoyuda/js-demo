/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 17:56:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 18:32:17
 * @FilePath: /js-demo/leetcode/常规题目/1025.js
 */
/**
 * @param {number} N
 * @return {boolean}
1025. 除数博弈
    爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。
    最初，黑板上有一个数字 N 。在每个玩家的回合，玩家需要执行以下操作：
    选出任一 x，满足 0 < x < N 且 N % x == 0 。
    用 N - x 替换黑板上的数字 N 。
    如果玩家无法执行这些操作，就会输掉游戏。
    只有在爱丽丝在游戏中取得胜利时才返回 True，否则返回 False。假设两个玩家都以最佳状态参与游戏。
示例 1：
    输入：2
    输出：true
    解释：爱丽丝选择 1，鲍勃无法进行操作。
示例 2：
    输入：3
    输出：false
    解释：爱丽丝选择 1，鲍勃也选择 1，然后爱丽丝无法进行操作。
提示：
    1 <= N <= 1000
 */
var divisorGame = function(N) {
    if(N == 1) return false
    let dp = new Array(N + 1).fill(false)
    dp[0] = true
    dp[1] = false
    dp[2] = true
    for (let i = 3; i <= N; i++) {
        for (let j = 1; j <= parseInt(i / 2); j++) {
            // 只要做出的选择的其中之一，能让对方输，在当前这一步我们就可以赢
            // console.log(i, j)
            if ((i % j == 0) && !dp[i - j]) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[N]
};

// console.log(divisorGame(2))
console.log(divisorGame(4))
console.log(divisorGame(5))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 20:27:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-21 17:29:11
 * @FilePath: /js-demo/leetcode/常规题目/62.js
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
    一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
        机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
        问总共有多少条不同的路径？
    示例 1：
        输入：m = 3, n = 7
        输出：28
    示例 2：
        输入：m = 3, n = 2
        输出：3
    解释：
        从左上角开始，总共有 3 条路径可以到达右下角。
        1. 向右 -> 向下 -> 向下
        2. 向下 -> 向下 -> 向右
        3. 向下 -> 向右 -> 向下
    示例 3：
        输入：m = 7, n = 3
        输出：28
    示例 4：
        输入：m = 3, n = 3
        输出：6
    提示：
        1 <= m, n <= 100
        题目数据保证答案小于等于 2 * 109
 */
var uniquePaths = function(m, n) {
    let dp = []
    for (let i = 0; i < m; i++) {
        dp.push(new Array(n).fill(0))
    }
    // for (let i = 0; i < n; i++){
    //     dp[0][i] = 1
    // }
    // for (let i = 0; i < m; i++){
    //     dp[i][0] = 1
    // }
    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++) {
            if(i == 0 || j == 0) dp[i][j] = 1
            else dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    // console.log(dp)
    return dp[m-1][n - 1]
};

console.log(uniquePaths(3, 7))
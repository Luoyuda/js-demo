/*
 * @Author: xiaohuolong
 * @Date: 2020-07-06 23:40:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-06 23:40:14
 * @FilePath: /js-demo/leetcode/63.js
 */ 

const uniquePathsWithObstacles = (ob) => {
    let m = ob.length
    let n = ob[0].length
    if(m == 0 || n == 0) return 0
    let dp = []
    for(let i = 0; i < m; i++ ){
        dp.push([])
        for(let j = 0; j < n; j++ ){
            dp[i].push(0)
        }
    }
    console.log(dp)
    for(let i = 0; i < m; i++){
        if(ob[i][0] == 1) break
        else dp[i][0] = 1
    }
    for(let i = 0; i < n; i++){
        if(ob[0][i] == 1) break
        else dp[0][i] = 1
    }
    for (let i = 0; i < m; i++) {
        console.log(dp[i])
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            // `ob[i][j] == 1`表示有障碍物，直接令`dp[i][j] = 0`;
            if(ob[i][j] == 1) dp[i][j] = 0;
            // `ob[i][j] == 0`表示无障碍物，`dp[i][j] = dp[i - 1][j] + d[i][j - 1]`
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    for (let i = 0; i < m; i++) {
        console.log(dp[i])
    }
    return dp[m - 1][n - 1];
}

console.log(uniquePathsWithObstacles([
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
]))
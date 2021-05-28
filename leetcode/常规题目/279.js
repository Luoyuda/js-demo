/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 20:27:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-21 10:41:07
 * @FilePath: /js-demo/leetcode/常规题目/279.js
 */
/**
 * @param {number} n
 * @return {number}
279. 完全平方数
    给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）
    使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
    给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。
    完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，
    其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
示例 1：
    输入：n = 12
    输出：3 
    解释：12 = 4 + 4 + 4
示例 2：
    输入：n = 13
    输出：2
    解释：13 = 4 + 9
提示：
    1 <= n <= 104
 */
var numSquares = function(n) {
    let dp = new Array(n+1).fill(0)
    for (let i = 1; i <= n; i++) {
        dp[i] = i
        for (let j = 1; i - j * j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
        }
    }
    return dp[n]
};

var numSquares = function(n) {
    let q = [0]
    let dist = new Array(n + 1).fill(Infinity)
    dist[0] = 0
    while (q.length){
        // console.log(q, dist)
        let t = q.shift()
        if(t == n) return dist[t]
        for (let i = 1; i*i + t <= n; i++) {
            let j = t + i*i
            if(dist[j] > dist[t] + 1){
                dist[j] = dist[t] + 1
                q.push(j)
            }
        }
    }
    return 0
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    let q = [n]
    let visited = []
    let step = 1
    while(q.length){
        let size = q.length
        while(size--){
            let n = q.shift()
            for(let i = 1; i * i <= n; i++){
                if(i * i == n) return step
                let next = n - i * i
                if(!visited[i]){
                    q.push(next)
                    visited[next] = true
                }
            }
        }
        step++
    }
    return 0
};

// console.log(numSquares(3))
console.log(numSquares(13))
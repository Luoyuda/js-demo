/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 15:50:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 15:58:50
 * @FilePath: /js-demo/leetcode/77.js
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
    77. 组合
    给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
    示例:
        输入: n = 4, k = 2
    输出:
        [
            [2,4],
            [3,4],
            [2,3],
            [1,2],
            [1,3],
            [1,4],
        ]

 */
var combine = function(n, k) {
    let res = []
    // let vis = {}
    let dfs = (t, start) => {
        if(t.length == k){
            return res.push(t) 
        }
        for (let i = start; i <= n; i++) {
            // if(vis[i]) continue
            // vis[i] = true
            t.push(i)
            dfs(t.slice(), i + 1)
            t.pop()
            // vis[i] = false
        }
    }
    dfs([], 1)
    return res
};

console.log(combine(4, 2))
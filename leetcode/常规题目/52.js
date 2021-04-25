/*
 * @Author: xiaohuolong
 * @Date: 2021-04-25 08:56:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 09:10:24
 * @FilePath: /js-demo/leetcode/常规题目/52.js
 */
/*
52. N皇后 II
    n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
    给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。
示例 1：
    输入：n = 4
    输出：2
    解释：如上图所示，4 皇后问题存在两个不同的解法。
示例 2：
    输入：n = 1
    输出：1
提示：
    1 <= n <= 9
    皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
*/
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    /*
        依次枚举每一行皇后的位置
        1. 每一列只能有一个 col[N]
        2. 每条斜线只能有一个皇后 d[2N - 1], ud[2N - 1]
    */
    let col = new Array(n).fill(false)
    let d = new Array(2 * n).fill(false)
    let ud = new Array(2 * n).fill(false)
    let ans = 0
    let dfs = (u) => {
        if(u == n){
            ans++
            return
        }
        for (let i = 0; i < n; i++) {
            if(!col[i] && !d[u + i] && !ud[u-i+n]){
                // console.log(u + i, u-i+n)
                col[i] = d[u + i] = ud[u-i+n] = true
                dfs(u + 1)
                col[i] = d[u + i] = ud[u-i+n] = false
            }
        }
    }
    dfs(0)
    return ans
};

// console.log(totalNQueens(1))
console.log(totalNQueens(4))
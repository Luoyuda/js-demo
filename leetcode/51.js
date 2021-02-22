/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 12:16:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 14:16:33
 * @FilePath: /js-demo/leetcode/51.js
 */
/**
 * @param {number} n
 * @return {string[][]}
    51. N 皇后
    n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
    给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
    每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
    示例 1：
        输入：n = 4
        输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
        解释：如上图所示，4 皇后问题存在两个不同的解法。
    示例 2：
        输入：n = 1
        输出：[["Q"]]
 */
var solveNQueens = function(n) {
    let res = []
    let grid = new Array(n)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(n).fill('.')
    }
    // 剪枝条件 
    let check = (x,y)=>{
        for(let i=0;i<x;i++){
            for(let j=0;j<n;j++){
                // 判断同列 或者 同一斜线即可（不需要判断同行是因为一行一行放的，一定不同行）
                if(grid[i][j] == 'Q' && (j == y || i+j == x+y || i-j == x-y) ){
                    return true;
                }
            }
        }
        return false;
    }
    let dfs = (t) => {
        if(t == n){
            res.push(grid.map((item) => {
                return item.join('')
            }))
            return
        }
        for (let i = 0; i < n; i++) {
            if(check(t, i)) continue
            grid[t][i] = 'Q'
            dfs(t + 1, grid.slice())
            grid[t][i] = '.'
        }
    }
    dfs(0);
    return res;
};

console.log(solveNQueens(4))
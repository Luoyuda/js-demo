/*
 * @Author: xiaohuolong
 * @Date: 2021-04-02 08:19:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 08:26:39
 * @FilePath: /js-demo/leetcode/面试金典/08.12.js
 */
/**
 * @param {number} n
 * @return {string[][]}
面试题 08.12. 八皇后
设计一种算法，打印 N 皇后在 N × N 棋盘上的各种摆法，其中每个皇后都不同行、不同列，
也不在对角线上。这里的“对角线”指的是所有的对角线，不只是平分整个棋盘的那两条对角线。
示例:
输入：4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释: 4 皇后问题存在如下两个不同的解法。
[
    [".Q..",  // 解法 1
    "...Q",
    "Q...",
    "..Q."],
    ["..Q.",  // 解法 2
    "Q...",
    "...Q",
    ".Q.."]
]
 */
var solveNQueens = function(n) {
    let res = []
    let grid = []
    for (let i = 0; i < n; i++) {
        grid.push(new Array(n).fill('.'))
    }
    // 剪枝条件 
    let check = (x, y)=>{
        for(let i = 0; i < x; i++){
            for(let j = 0; j < n; j++){
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
    dfs(0)
    return res
};

console.log(solveNQueens(4))
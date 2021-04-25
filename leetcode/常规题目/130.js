/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 20:37:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 20:54:22
 * @FilePath: /js-demo/leetcode/常规题目/130.js
 */
/* 
130. 被围绕的区域
    给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，
    并将这些区域里所有的 'O' 用 'X' 填充。
示例 1：
    输入：board = [
        ["X","X","X","X"],
        ["X","O","O","X"],
        ["X","X","O","X"],
        ["X","O","X","X"]
    ]
    输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
    解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
示例 2：
    输入：board = [["X"]]
    输出：[["X"]]
提示：
    m == board.length
    n == board[i].length
    1 <= m, n <= 200
    board[i][j] 为 'X' 或 'O'
*/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    let m = board.length
    let n = board[0].length
    for (let i = 0; i < m; i++) {
        if(board[i][0] == 'O') dfs(board, i, 0)
        if(board[i][n-1] == 'O') dfs(board, i, n-1)
    }
    for (let i = 0; i < n; i++) {
        if(board[0][i] == 'O') dfs(board, 0, i)
        if(board[m-1][i] == 'O') dfs(board, m-1, i)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++){
            board[i][j] = board[i][j] == 'Y' ? 'O' : 'X'
        }
    }
    return board
};

var dx = [-1, 0, 1, 0]
var dy = [0, 1, 0, -1]
var dfs = (board, x, y) => {
    board[x][y] = 'Y'
    for (let i = 0; i < 4; i++) {
        let a = x + dx[i]
        let b = y + dy[i]
        if(a >= 0 && b >= 0 && a < board.length && b < board[0].length && board[a][b] == 'O'){
            dfs(board, a, b)
        }
    }
}


console.log(solve([
    ["X","X","X","X"],
    ["X","O","O","X"],
    ["X","X","O","X"],
    ["X","O","X","X"]
]))
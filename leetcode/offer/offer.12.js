/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 18:15:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 18:30:21
 * @FilePath: /js-demo/leetcode/offer.12.js
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
    剑指 Offer 12. 矩阵中的路径
        请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。
        路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。
        如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。
        例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。
        [["a","b","c","e"],
        ["s","f","c","s"],
        ["a","d","e","e"]]
        但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。
    示例 1：
        输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
        输出：true
    示例 2：
        输入：board = [["a","b"],["c","d"]], word = "abcd"
        输出：false
    提示：
        1 <= board.length <= 200
        1 <= board[i].length <= 200
 */
var exist = function(board, word) {
    let n = board.length
    let m = board[0].length
    let dfs = (i, j, t) => {
        if(t >= word.length) return true
        if(i < 0 || j < 0 || i >= n || j >= m || board[i][j] == '#' || board[i][j] != word[t]) return false
        let temp = board[i][j]
        board[i][j] = '#'
        let flag = dfs(i+1, j, t+1) || dfs(i-1, j, t+1) || dfs(i, j+1, t+1) || dfs(i, j-1, t+1)
        if(flag) return true
        board[i][j] = temp
        return false
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if(board[i][j] == word[0]){
                let res = dfs(i,j,0)
                if(res) return true
            }
        }
    }
    return false
};

console.log(exist([
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
], 'ABCCED'))
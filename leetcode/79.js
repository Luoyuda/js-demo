/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 12:21:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 14:45:50
 * @FilePath: /js-demo/leetcode/79.js
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
    79. 单词搜索
    给定一个二维网格和一个单词，找出该单词是否存在于网格中。
    单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
    示例:
        board = [
            ['A','B','C','E'],
            ['S','F','C','S'],
            ['A','D','E','E']
        ]
    给定 word = "ABCCED", 返回 true
    给定 word = "SEE", 返回 true
    给定 word = "ABCB", 返回 false
    提示：
    board 和 word 中只包含大写和小写英文字母。
        1 <= board.length <= 200
        1 <= board[i].length <= 200
        1 <= word.length <= 10^3

 */

var exist = function(board, word) {
    let dfs = (x, y, t) => {
        if(t > word.length - 1) return true
        // 剪枝条件
        if(x < 0 || y < 0 || x >= board.length || y >= board[0].length || board[x][y] == '#' || board[x][y] != word[t]) return false
        let temp = board[x][y]
        board[x][y] = '#'
        let flag = dfs(x+1,y,t+1) || dfs(x,y+1,t+1) || dfs(x-1,y,t+1) || dfs(x,y-1,t+1)
        if(flag) return true
        board[x][y] = temp
        return false
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
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
], "ABCB"))
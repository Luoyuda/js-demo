/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 16:14:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 21:17:26
 * @FilePath: /js-demo/leetcode/常规题目/37.js
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
    37. 解数独
        编写一个程序，通过填充空格来解决数独问题。
    一个数独的解法需遵循如下规则：
        数字 1-9 在每一行只能出现一次。
        数字 1-9 在每一列只能出现一次。
        数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
        空白格用 '.' 表示。
    提示：
        给定的数独序列只包含数字 1-9 和字符 '.' 。
        你可以假设给定的数独只有唯一解。
        给定数独永远是 9x9 形式的。
 */
var solveSudoku = function (board) {
    let check = (x, y, val) => {
        // 一行或者一列有重复元素，剪掉
        for (let i = 0; i < 9; i++) {
            if(board[i][y] == val || board[x][i] == val) return true
        }
        // 3x3宫格内重复的情况，剪掉
        // 计算3*3起点
        let startX = Math.floor(x / 3) * 3;
        let startY = Math.floor(y / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startX + i][startY + j] == val) return true;
            }
        }
        return false; // 没有冲突情况
    }
    let dfs = (x, y) => {
        // 从 x, y 开始填
        if(y == 9){
            x++
            y = 0
            if(x == 9) {
                // 填完
                return true
            }
        }
        // 如果不是空位，直接下一个
        if(board[x][y] != '.') return dfs(x, y+1)
        for (let i = 1; i < 10; i++) {
            // 1 - 9 检查所填是否符合规则
            if(check(x, y, i)) continue
            // 填空
            board[x][y] = String(i)
            // 如果这里返回 true 证明东西填完了
            if(dfs(x, y+1)) return true
            // 此条路径失败 回溯
            board[x][y] = '.'
        }
        return false;
    }
    dfs(0, 0);
    return board;
};

var solveSudoku = function (board) {
    let row = new Array(9)
    let col = new Array(9)
    let cell = new Array(3)
    for (let i = 0; i < 3; i++) {
        cell[i] = new Array(3)
        for (let j = 0; j < 3; j++) {
            cell[i][j] = new Array(9)
        }
    }
    for (let i = 0; i < 9; i++) {
        row[i] = new Array(9)
        col[i] = new Array(9)
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let c = board[i][j]
            if(c != '.'){
                let t = c - 1
                row[i][t] = col[j][t] = cell[Math.floor(i / 3)][Math.floor(j / 3)][t] = true
            }
        }
    }
    let dfs = (x, y) => {
        if(y === 9){
            x++
            y = 0
        }
        if(x === 9) return true
        if(board[x][y] != '.') return dfs(x, y + 1)
        for (let i = 0; i < 9; i++) {
            let cellX = Math.floor(x / 3)
            let cellY = Math.floor(y / 3)
            if(!row[x][i] && !col[y][i] && !cell[cellX][cellY][i]){
                board[x][y] = String(i + 1)
                row[x][i] = col[y][i] = cell[cellX][cellY][i] = true
                if(dfs(x, y + 1)) return true
                row[x][i] = col[y][i] = cell[cellX][cellY][i] = false
                board[x][y] = '.'
            }
        }
    }
    dfs(0, 0)
    return board
};
var solveSudoku = function (board) {
    let cellNum = num => Math.floor(num / 3)
    let row = new Array(9)
    let col = new Array(9)
    let cell = new Array(3)
    for (let i = 0; i < 3; i++) {
        cell[i] = new Array(3)
        for (let j = 0; j < 3; j++) {
            cell[i][j] = new Array(9)    
        }
    }
    for (let i = 0; i < 9; i++) {
        row[i] = new Array(9)
        col[i] = new Array(9)
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let c = board[i][j]
            if(c != '.'){
                let t = c - 1
                row[i][t] = col[j][t] = cell[cellNum(i)][cellNum(j)][t] = true
            }
        }
    }
    var dfs = function(x, y) {
        if(y === 9){
            x += 1;
            y = 0
        }
        if(x === 9) return true
        if(board[x][y] != '.') return dfs(x, y + 1)
        let a = cellNum(x)
        let b = cellNum(y)
        for (let i = 0; i < 9; i++) {
            if(!row[x][i] && !col[y][i] && !cell[a][b][i]){
                board[x][y] = String(i + 1)
                row[x][i] = col[y][i] = cell[a][b][i] = true
                if(dfs(x, y + 1)) return true
                row[x][i] = col[y][i] = cell[a][b][i] = false
                board[x][y] = '.'
            }
        }
    }
    dfs(0, 0)
    return board
}
console.log(solveSudoku([
    [5,3,'.','.',7,'.','.','.','.'],
    [6,'.','.',1,9,5,'.','.','.'],
    ['.',9,8,'.','.','.','.',6,'.'],
    [8,'.','.','.',6,'.','.','.',3],
    [4,'.','.',8,'.',3,'.','.',1],
    [7,'.','.','.',2,'.','.','.',6],
    ['.',6,'.','.','.','.',2,8,'.'],
    ['.','.','.',4,1,9,'.','.',5],
    ['.','.','.','.',8,'.','.',7,9]
]))
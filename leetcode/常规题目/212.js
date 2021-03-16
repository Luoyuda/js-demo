/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 14:55:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 15:12:38
 * @FilePath: /js-demo/leetcode/212.js
 */
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
    212. 单词搜索 II
    给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，找出所有同时在二维网格和字典中出现的单词。
    单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。
    示例 1：
    输入：
    board = [
        ["o","a","a","n"],
        ["e","t","a","e"],
        ["i","h","k","r"],
        ["i","f","l","v"]
    ], 
    words = ["oath","pea","eat","rain"]
    输出：["eat","oath"]
    示例 2：
    输入：board = [
        ["a","b"],
        ["c","d"]
    ], 
    words = ["abcb"]
    输出：[]
    提示：
        m == board.length
        n == board[i].length
        1 <= m, n <= 12
        board[i][j] 是一个小写英文字母
        1 <= words.length <= 3 * 104
        1 <= words[i].length <= 10
        words[i] 由小写英文字母组成
        words 中的所有字符串互不相同
 */
var findWords = function(board, words) {
    class TrieNode {
        constructor(){
            this.end = false
            this.child = {}
        }
    }
    let root = null 
    let Trie = function(){
        root = new TrieNode()
    }
    Trie.prototype.insert = function(word){
        let cur = root
        for (let i = 0; i < word.length; i++) {
            const element = word[i];
            if(!cur.child[element]){
                cur.child[element] = new TrieNode()
            }
            cur = cur.child[element]
        }
        cur.end = true
    }
    // 创建根节点
    let trie = new Trie()
    for (let i = 0; i < words.length; i++) {
        trie.insert(words[i])
    }
    let res = []
    let dfs = (x, y, t, cur) => {
        if(cur.end){
            res.push(t)
            cur.end = false // 避免重复计算
        }
        // 剪枝条件：
        // 1.边界处理 
        // 2.下一步是否可走 
        // 3.下一步字典树是否可走
        if(x<0 || x>=board.length || y<0 || y>=board[0].length || board[x][y] == '#' || !cur.child[board[x][y]]) return
        let tmp = board[x][y]
        board[x][y] = '#'  // 走
        cur = cur.child[tmp]
        dfs(x+1,y,t+tmp,cur)  // 上下左右四个方向遍历
        dfs(x,y+1,t+tmp,cur)
        dfs(x-1,y,t+tmp,cur)
        dfs(x,y-1,t+tmp,cur)
        board[x][y] = tmp // 回溯（还原）
    }
    // 对单词表进行全局搜索
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            dfs(i,j,'',root)
        }
    }
    return res
};

console.log(findWords(
    [
        ["o","a","a","n"],
        ["e","t","a","e"],
        ["i","h","k","r"],
        ["i","f","l","v"]
    ], 
    ["oath","pea","eat","rain"]
))
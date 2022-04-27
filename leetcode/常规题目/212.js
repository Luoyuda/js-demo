/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 14:55:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 19:03:31
 * @FilePath: /js-demo/leetcode/常规题目/212.js
 */
/**
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
var TrieNode = function () {
  this.end = false
  this.children = {}
}
var Trie = function () {
  this.root = new TrieNode()
}
Trie.prototype.insert = function (word) {
  let cur = this.root
  for (const ch of word) {
    if (!cur.children[ch]) {
      cur.children[ch] = new TrieNode()
    }
    cur = cur.children[ch]
  }
  cur.end = true
}
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const trie = new Trie()
  words.forEach((word) => trie.insert(word))
  const res = []
  const m = board.length
  const n = board[0].length
  const dx = [-1, 0, 1, 0]
  const dy = [0, -1, 0, 1]
  const dfs = (x, y, s, cur) => {
    if (cur.end) {
      res.push(s)
      cur.end = false
    }
    const ch = board[x][y]
    board[x][y] = '#'
    for (let i = 0; i < 4; i++) {
      const a = x + dx[i]
      const b = y + dy[i]
      if (a >= 0 && b >= 0 && a < m && b < n) {
        const c = board[a][b]
        if (cur.children[c]) {
          dfs(a, b, s + c, cur.children[c])
        }
      }
    }
    board[x][y] = ch
    return
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const ch = board[i][j]
      const cur = trie.root.children[ch]
      if (cur) {
        dfs(i, j, ch, cur)
      }
    }
  }
  return res
}
console.log(
  findWords(
    [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    [
      'oath',
      'pea',
      'eat',
      'rain',
      'oathi',
      'oathk',
      'oathf',
      'oate',
      'oathii',
      'oathfi',
      'oathfii',
    ]
  )
)
// console.log(findWords(
//     [
//         ["o","a","a","n"],
//         ["e","t","a","e"],
//         ["i","h","k","r"],
//         ["i","f","l","v"]
//     ],
//     ["oath","pea","eat","rain"]
// ))
// console.log(findWords(board = [
//     ["a","b"],
//     ["c","d"]
// ], ["abcb"]))
// console.log(findWords([["a","a"]], ["aaa"]))

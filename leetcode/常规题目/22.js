/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 15:43:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 16:05:35
 * @FilePath: /js-demo/leetcode/22.js
 */
/**
 * @param {number} n
 * @return {string[]}
    22. 括号生成
    数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
    示例 1：
        输入：n = 3
        输出：["((()))","(()())","(())()","()(())","()()()"]
    示例 2：
        输入：n = 1
        输出：["()"]
    提示：
        1 <= n <= 8
 */
var generateParenthesis = function(n) {
    let res = []
    let dfs = (curr, left, right) => {
        // left：左括号剩下个数
        // right：右括号剩下个数
        if(curr.length === 2 * n) {
            res.push(curr)
            return
        }
        if(left > 0) dfs(curr + '(', left - 1, right)
        if(right > left) dfs(curr + ')', left, right - 1)
    }
    dfs('', n, n)
    return res
};

console.log(generateParenthesis(3))
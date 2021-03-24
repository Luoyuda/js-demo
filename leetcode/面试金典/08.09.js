/*
 * @Author: xiaohuolong
 * @Date: 2021-03-23 09:01:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-23 09:07:05
 * @FilePath: /js-demo/leetcode/面试金典/08.09.js
 */
/**
 * @param {number} n
 * @return {string[]}
面试题 08.09. 括号
    括号。设计一种算法，打印n对括号的所有合法的（例如，开闭一一对应）组合。
    说明：解集不能包含重复的子集。
例如
    给出 n = 3，生成结果为：
    [
        "((()))",
        "(()())",
        "(())()",
        "()(())",
        "()()()"
    ]
 */
var generateParenthesis = function(n) {
    let res = []
    let dfs = (left, right, str) => {
        if(left > right) return
        if(left == 0 && right == 0) return res.push(str)
        if(left > 0){
            dfs(left-1, right, str + '(')
        }
        if(right > 0){
            dfs(left, right-1, str + ')')
        }
    }
    dfs(n, n, '')
    return res
};
console.log(generateParenthesis(3))
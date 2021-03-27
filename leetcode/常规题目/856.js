/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 15:33:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 15:52:48
 * @FilePath: /js-demo/leetcode/常规题目/856.js
 */
/**
 * @param {string} S
 * @return {number}
856. 括号的分数
    给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：
    () 得 1 分。
    AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
    (A) 得 2 * A 分，其中 A 是平衡括号字符串。
示例 1：
    输入： "()"
    输出： 1
示例 2：
    输入： "(())"
    输出： 2
示例 3：
    输入： "()()"
    输出： 2
示例 4：
    输入： "(()(()))"
    输出： 6
提示：
    S 是平衡括号字符串，且只含有 ( 和 ) 。
    2 <= S.length <= 50
 */
var scoreOfParentheses = function(S) {
    let scores = [0]
    for (let i = 0; i < S.length; i++) {
        const ch = S[i];
        if(ch == '('){
            // 准备累计分数
            scores.push(0)
        }else if(ch == ')'){
            // 准备消除
            let v = scores.pop()
            let w = scores.pop()
            scores.push(w + Math.max(v * 2, 1))
        }
    }
    return scores[0]
};

console.log(scoreOfParentheses('(()(()))'))
console.log(scoreOfParentheses('()()()'))
console.log(scoreOfParentheses('(((())))'))
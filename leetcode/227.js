/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 08:26:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 08:46:30
 * @FilePath: /js-demo/leetcode/227.js
 */

/**
 * @param {string} s
 * @return {number}
227. 基本计算器 II
    给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
    整数除法仅保留整数部分。
示例 1：
    输入：s = "3+2*2"
    输出：7
示例 2：
    输入：s = " 3/2 "
    输出：1
示例 3：
    输入：s = " 3+5 / 2 "
    输出：5
提示：
    1 <= s.length <= 3 * 105
    s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
    s 表示一个 有效表达式
    表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内
    题目数据保证答案是一个 32-bit 整数
 */

var calculate = function(s) {
    s = s.trim();
    const stack = new Array();
    let preSign = '+';
    let num = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        if (!isNaN(Number(s[i])) && s[i] !== ' ') {
            num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
        }
        if (isNaN(Number(s[i])) || i === n - 1) {
            switch (preSign) {
                case '+':
                    stack.push(num);
                    break;
                case '-':
                    stack.push(-num);
                    break;
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                default:
                    stack.push(stack.pop() / num | 0);
            }   
            preSign = s[i];
            num = 0;
        }
    }
    let ans = 0;
    while (stack.length) {
        ans += stack.pop();
    }
    return ans;
};
var calculate1 = function(s) {
    s = s.trim()
    const stack = []
    let preSign = '+'
    let num = 0
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if(!isNaN(Number(ch)) && ch != ' '){
            num = num * 10 + ch.charCodeAt() - '0'.charCodeAt()
        }
        if(isNaN(Number(ch)) || i === s.length - 1){
            switch(preSign){
                case '+':
                    stack.push(num)
                    break
                case '-':
                    stack.push(-num)
                    break
                case '*':
                    stack.push(stack.pop() * num)
                    break
                case '/':
                    stack.push(stack.pop() / num | 0)
                    break
            }
            preSign = ch
            num = 0
        }
    }
    let ans = 0;
    while (stack.length) {
        ans += stack.pop();
    }
    return ans;
};

console.log(calculate('3+2*2*2/2'))
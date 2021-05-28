/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 08:26:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-14 09:33:57
 * @FilePath: /js-demo/leetcode/常规题目/227.js
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

var calculate = function(s) {
    let op = []
    let num = []
    s += '+0'
    for(let i = 0; i < s.length; i++){
        let ch = s[i]
        if(ch == ' ') continue
        else if(ch == '+' || ch == '-' || ch == '*' || ch == '/') op.push(ch)
        else{
            let j = i
            while(j < s.length && s[j] >= '0' && s[j] <= '9') j++
            num.push(Number(s.slice(i, j)))
            i = j - 1
            if(op.length){
                let top = op[op.length - 1]
                if(top == '*' || top == '/'){
                    let b = num.pop()
                    let a = num.pop()
                    let op1 = op.pop()
                    let c = op1 == '*' ? a * b : a / b
                    num.push(Math.floor(c))
                }else if(op.length >= 2){
                    let op2 = op.pop()
                    let op1 = op.pop()
                    let c = num.pop()
                    let b = num.pop()
                    let a = num.pop()
                    let d = op1 == '+' ? a + b : a - b
                    num.push(d, c)
                    op.push(op2)
                }
            }
        }
    }
    return num[0]
};

console.log(calculate('1+1+1'))
// console.log(calculate('3+2*2*2/2'))
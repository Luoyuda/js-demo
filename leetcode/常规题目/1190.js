/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 08:14:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-26 08:30:51
 * @FilePath: /js-demo/leetcode/常规题目/1190.js
 */
/**
 * @param {string} s
 * @return {string}
    1190. 反转每对括号间的子串
        给出一个字符串 s（仅含有小写英文字母和括号）。
        请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。
        注意，您的结果中 不应 包含任何括号。
    示例 1：
        输入：s = "(abcd)"
        输出："dcba"
    示例 2：
        输入：s = "(u(love)i)"
        u love
        uevoli
        iloveu
        输出："iloveu"
    示例 3：
        输入：s = "(ed(et(oc))el)"
        ed et oc
        ed etoc
        edocteel
        leetcode
        输出："leetcode"
    示例 4：
        输入：s = "a(bcdefghijkl(mno)p)q"
        a(bcdefghijklonmp)q
        输出："apmnolkjihgfedcbq"
    提示：
        0 <= s.length <= 2000
        s 中只有小写英文字母和括号
        我们确保所有括号都是成对出现的
 */
var reverseParentheses = function(s) {
    let stack = ['']
    for (let i = 0; i < s.length; i++) {
        const ch = s[i]
        if(ch === '('){
            stack.push('')
        }else if(ch === ')'){
            let str = stack.pop()
            let tmp = str.split('').reverse().join('')
            stack[stack.length-1] += tmp
        }else{
            stack[stack.length-1] += ch
        }
        // console.log(stack)
    }
    return stack.pop()
};
var reverseParentheses = function(s) {
    let stack = ['']
    for(let x of s){
        if(x == '('){
            stack.push('')
        }else if(x == ')'){
            let str = stack.pop()
            for(let i = str.length - 1; i >= 0; i--){
                stack[stack.length - 1] += str[i]
            }
        }else{
            stack[stack.length - 1] += x
        }
    }
    return stack[stack.length - 1]
};
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    let n = s.length
    let pair = new Array(n).fill(0)
    let stack = []
    for(let i = 0; i < n; i++){
        if(s[i] == '('){
            stack.push(i)
        }else if(s[i] == ')'){
            let j = stack.pop()
            pair[i] = j
            pair[j] = i
        }
    }
    let ans = ''
    let index = 0
    let step = 1
    while(index < n){
        if(s[index] == '(' || s[index] == ')'){
            index = pair[index]
            step = -step
        }else{
            ans += s[index]
        }
        index += step
    }
    return ans
};

console.log(reverseParentheses('a(bcdefghijkl(mno)p)q'))
console.log(reverseParentheses('(ed(et(oc))el)'))
console.log(reverseParentheses('(u(love)i)'))
console.log(reverseParentheses('(abcd)'))

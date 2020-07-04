/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 22:59:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-03 23:30:01
 * @FilePath: /js-demo/leetcode/20.js
 */ 
var isValid = function(s) {
    let len = s.length
    if(!len) return true
    if(len % 2 != 0) return false
    let stack = []
    let right = {
        ')':'(',
        ']':'[',
        '}':'{',
    }
    for (let i = 0; i < s.length; i++) {
        const el = s[i];
        console.log(el)
        if(el == '(' || el == '{' || el == '['){
            stack.push(el)
        }else if(el == ')' || el == '}' || el == ']'){
            if(stack.pop() != right[el]) return false
        }
    }
    return stack.length <= 0
};

console.log(isValid("()"))
console.log(isValid("()[]{}"))
console.log(isValid("(]"))
console.log(isValid("(])["))
console.log(isValid("{[]}"))
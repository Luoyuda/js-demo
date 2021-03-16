/*
 * @Author: xiaohuolong
 * @Date: 2020-07-04 12:33:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-04 13:21:10
 * @FilePath: /js-demo/leetcode/32.js
 */ 
var longestValidParentheses = function(s) {
    let count = 0
    let stack = []
    stack.push(-1)
    for (let i = 0; i < s.length; i++) {
        if(s[i] == '('){
            stack.push(i)
        }else{
            stack.pop()
            if(stack.length <= 0){
                stack.push(i)
            }else{
                count = Math.max(count, i - stack[stack.length - 1])
            }
        }
    }
    return count
};

var longestValidParentheses2 = function(s) {
    let left = right = count = 0
    for (let i = 0; i < s.length; i++){
        if(s[i] == '('){
            ++left
        }else{
            ++right
        }
        if(left == right){
            count = Math.max(count, 2 * right)
        }else if(right > left){
            left = right = 0
        }
    }
    left = right = 0
    for (let i = s.length - 1; i >= 0; i--) {
        if(s[i] == '('){
            ++left
        }else{
            ++right
        }
        if(left == right){
            count = Math.max(count, 2 * left)
        }else if(left > right){
            left = right = 0
        }
    }
    return count
}

console.log(longestValidParentheses2('((())()))'))
console.log(longestValidParentheses2('(()'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-27 15:42:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 09:45:51
 * @FilePath: /js-demo/leetcode/常规题目/316.js
 */
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s){
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        let ch = s[i];
        let count = 1
        if(map.has(ch)) count += map.get(ch)
        map.set(ch, count)
    }
    let stack = []
    let set = new Set()
    for (let i = 0; i < s.length; i++) {
        let ch = s[i];
        // console.log(s[i])
        map.set(ch, map.get(ch) - 1) // map 计数减 1
        if(!set.has(ch)){
            while(stack.length && stack[stack.length - 1] > ch && map.get(stack[stack.length - 1])){
                set.delete(stack.pop())
            }
            set.add(ch)
            stack.push(ch)
        }
    }
    // console.log(stack)
    return stack.join("")
}
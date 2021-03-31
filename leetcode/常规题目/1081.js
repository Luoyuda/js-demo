/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 08:54:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 09:44:18
 * @FilePath: /js-demo/leetcode/常规题目/1081.js
 */
/**
 * @param {string} s
 * @return {string}
1081. 不同字符的最小子序列
    返回 s 字典序最小的子序列，该子序列包含 s 的所有不同字符，且只包含一次。
示例 1：
    输入：s = "bcabc"
    输出："abc"
示例 2：
    输入：s = "cbacdcbc"
    输出："acdb"
提示：
    1 <= s.length <= 1000
    s 由小写英文字母组成
 */
var smallestSubsequence = function(s) {
    // 创建一个 map 来存储每个字符出现的个数
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        let item = s[i]
        if (map.has(item)) {
        map.set(item, map.get(item) + 1)
        } else {
        map.set(item, 1)
        }
    }
    // 维护一个栈 stack 来按顺序存储字典序最小的字符
    let stack = []
    for (let i = 0; i < s.length; i++) {
        let char = s[i]
        map.set(char, map.get(char) - 1) // map 计数减 1
        // 如果当前栈中没有包含此字符，则需要把 char 加入 satack 中
        // 但是加入之前需要判断是否栈中存在比 char 字典序更大的元素，存在则需要判断是否要删除（弹出）
        // 怎么判断是否要删除栈中的元素 stack[j] 呢？
        // 除了满足比 char 字典序大之外，还要判断后续 s 中还能再遍历到与 stack[j] 相同的字符，不然删了就没了...
        if (stack.includes(char) === false) { 
            let j = stack.length
            console.log(s[i])
            // 遍历栈，判断栈中是否有比 char 更大的字母，并且字符串 s 中还有此相同字符（stack[j]）
            // 有则弹出（删除），保证字典序
            while(j-- && stack[j] > char && map.get(stack[j])) {
            stack.pop()
            }
            stack.push(char) // 将 char 入栈
        }
    }
    return stack.join('')
};

var smallestSubsequence = function(s){
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
console.log(smallestSubsequence('cbacdcbc'))
console.log(smallestSubsequence("bcabc"))
console.log(smallestSubsequence("leetcode"))

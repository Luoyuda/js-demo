/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 23:48:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-18 00:06:45
 * @FilePath: /js-demo/leetcode/常规题目/214.js
 */
/*
214. 最短回文串
    给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。
    找到并返回可以用这种方式转换的最短回文串。
示例 1：
    输入：s = "aacecaaa"
    输出："aaacecaaa"
示例 2：
    输入：s = "abcd"
    输出："dcbabcd"
提示：
    0 <= s.length <= 5 * 104
    s 仅由小写英文字母组成
*/
/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    let str = s + '#'
    for (let i = s.length - 1; i >= 0; i--) {
        str += s[i]
    }
    let getNext = function(s){
        let next = new Array(s.length).fill(0)
        let len = 0
        let i = 1
        while(i < s.length){
            if(s[i] == s[len]){
                next[i++] = ++len
            }else{
                if(len > 0){
                    len = next[len - 1]
                }else{
                    next[i++] = 0
                }
            }
        }
        return next
    }
    let next = getNext(str)
    let maxLen = next[next.length - 1]
    let add = ''
    for(let i = s.length - 1; i >= maxLen; i--){
        add += s[i]
    }
    return add + s
};

console.log(shortestPalindrome('abcd'))
console.log(shortestPalindrome('aacecaaa'))
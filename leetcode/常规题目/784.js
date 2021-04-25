/*
 * @Author: xiaohuolong
 * @Date: 2021-02-19 15:01:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 21:44:07
 * @FilePath: /js-demo/leetcode/常规题目/784.js
 */
/**
 * @param {string} S
 * @return {string[]}
    784. 字母大小写全排列
    给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。
    示例：
    输入：S = "a1b2"
    输出：["a1b2", "a1B2", "A1b2", "A1B2"]
    输入：S = "3z4"
    输出：["3z4", "3Z4"]
    输入：S = "12345"
    输出：["12345"]
 */
var letterCasePermutation = function(S) {
    let res = []
    let s = S.split('')
    let sLength = S.length
    let dfs = (s, u) => {
        if(u == sLength){
            res.push(s.join(''))
            return
        }
        dfs(s, u+1)
        if(isNaN(Number(s[u]))){
            let r = s.slice()
            r[u] = String.fromCharCode(s[u].charCodeAt() ^ 32)
            dfs(r, u + 1)
        }
    }
    dfs(s, 0)
    return res
};

console.log(letterCasePermutation('a1b2'))
console.log(letterCasePermutation('C'))
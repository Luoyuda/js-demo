/*
 * @Author: xiaohuolong
 * @Date: 2021-02-19 15:01:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-19 15:09:02
 * @FilePath: /js-demo/leetcode/784.js
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
    let sLength = S.length
    let dfs = (t, str) => {
        if(t.length >= sLength) return res.push(t)
        let s = str[0]
        let nextStr = str.substr(1)
        if(!isNaN(Number(s))){
            // 是数字，只有一种结果
            dfs(t + s, nextStr)
        }else{
            let tmp = s.toUpperCase()
            if(tmp === s) tmp = s.toLowerCase()
            dfs(t + s, nextStr)
            dfs(t + tmp, nextStr)
        }
    }
    dfs('', S)
    return res
};

console.log(letterCasePermutation('a1b2'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-09 08:34:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-09 08:50:40
 * @FilePath: /js-demo/leetcode/offer.38.js
 */
/**
 * @param {string} s
 * @return {string[]}
    剑指 Offer 38. 字符串的排列
        输入一个字符串，打印出该字符串中字符的所有排列。
        你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
    示例:
        输入：s = "abc"
        输出：["abc","acb","bac","bca","cab","cba"]
    限制：
        1 <= s 的长度 <= 8
 */
var permutation = function(s) {
    let res = new Set()
    let hash = {}
    let dfs = (t) => {
        if(t.length >= s.length) return res.add(t)
        for (let i = 0; i < s.length; i++) {
            const ch = s[i]
            if(hash[i]) continue
            hash[i] = true
            dfs(t + ch)
            hash[i] = false
        }
    }
    dfs('')
    return [...res]
};

console.log(permutation('abc'))
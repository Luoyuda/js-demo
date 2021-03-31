/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 21:37:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 21:42:33
 * @FilePath: /js-demo/leetcode/面试金典/08.07.js
 */
/**
 * @param {string} S
 * @return {string[]}
面试题 08.07. 无重复字符串的排列组合
    无重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合，字符串每个字符均不相同。
示例1:
    输入：S = "qwe"
    输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]
示例2:
    输入：S = "ab"
    输出：["ab", "ba"]
提示:
    字符都是英文字母。
    字符串长度在[1, 9]之间。
 */
var permutation = function(S) {
    let res = []
    let hash = {}
    let dfs = (t, start) => {
        if(t.length == S.length){
            return res.push(t.join(''))
        }
        for (let i = 0; i < S.length; i++) {
            if(hash[S[i]]) continue
            t.push(S[i])
            hash[S[i]] = true
            dfs(t.slice(), i + 1)
            hash[S[i]] = false
            t.pop()
        }
    }
    dfs([], 0)
    return res
};

console.log(permutation('qwe'))
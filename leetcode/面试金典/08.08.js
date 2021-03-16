/*
 * @Author: xiaohuolong
 * @Date: 2021-02-19 15:14:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-19 15:30:28
 * @FilePath: /js-demo/leetcode/08.08.js
 */
/**
 * @param {string} S
 * @return {string[]}
    面试题 08.08. 有重复字符串的排列组合
    有重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合。
    示例1:
        输入：S = "qqe"
        输出：["eqq","qeq","qqe"]
    示例2:
        输入：S = "ab"
        输出：["ab", "ba"]
    提示:
        字符都是英文字母。
        字符串长度在[1, 9]之间。
 */
var permutation = function(S) {
    S = Array.from(S).sort().join('')
    let res = []
    let vis = {}
    let length = S.length
    let dfs = (t) => {
        if(t.length === length){
            return res.push(t)
        }
        for (let i = 0; i < length; i++) {
            const str = S[i];
            if (i - 1 >= 0 && S[i - 1] == S[i] && !vis[i - 1]) continue
            if(vis[i]) continue
            vis[i] = true
            dfs(t + str)
            vis[i] = false
        }
    }
    dfs('')
    return res
};

console.log(permutation('qqe'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-05-26 17:22:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-26 17:24:51
 * @FilePath: /js-demo/leetcode/常规题目/516.js
 */
/*
516. 最长回文子序列
    给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。
示例 1:
    输入:
        "bbbab"
    输出:
        4
    一个可能的最长回文子序列为 "bbbb"。
示例 2:
    输入:
        "cbbd"
    输出:
        2   
    一个可能的最长回文子序列为 "bb"。
提示：
    1 <= s.length <= 1000
    s 只包含小写英文字母
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let m = s.length
    let dp = new Array(m).fill(0).map(() => new Array(m).fill(0))
    for(let i = 0; i < m; i++){
        dp[i][i] = 1
    }
    for(let i = 0; i < m - 1; i++){
        let c1 = s[i]
        let c2 = s[i + 1]
        if(c1 == c2){
            dp[i][i + 1] = 2
        }else{
            dp[i][i + 1] = 1
        }
    }
    for(let len = 3; len <= m; len += 1){
        for(let i = 0; i + len <= m; i++){
            let c1 = s[i]
            let j = i + len - 1
            let c2 = s[j]
            if(c1 == c2){
                dp[i][j] = dp[i + 1][j - 1] + 2
            }else{
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][m - 1]
};
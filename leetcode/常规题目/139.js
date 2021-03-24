/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 07:58:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 08:18:43
 * @FilePath: /js-demo/leetcode/常规题目/139.js
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
    139. 单词拆分
        给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
    说明：
        拆分时可以重复使用字典中的单词。
        你可以假设字典中没有重复的单词。
    示例 1：
        输入: s = "leetcode", wordDict = ["leet", "code"]
        输出: true
        解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
    示例 2：
        输入: s = "applepenapple", wordDict = ["apple", "pen"]
        输出: true
        解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
            注意你可以重复使用字典中的单词。
    示例 3：
        输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
        输出: false
 */
var wordBreak = function(s, wordDict) {
    let len = s.length
    let wordSet = new Set(wordDict)
    let dp = new Array(len + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= len; i++) {
        for (let j = i-1; j >= 0; j--) {
            if(dp[i]) break
            if(!dp[j]) continue
            let str = s.slice(j, i)
            if(wordSet.has(str) && dp[j]){
                // console.log(str)
                dp[i] = true
                break
            }
        }
    }
    return dp[len]
};

console.log(wordBreak('applepenapple', ["apple", "pen"]))
console.log(wordBreak('catsandog', ["cats", "dog", "sand", "and", "cat"]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 08:43:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 08:54:59
 * @FilePath: /js-demo/leetcode/常规题目/140.js
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
    140. 单词拆分 II
        给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，
        在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。
    说明：
        分隔时可以重复使用字典中的单词。
        你可以假设字典中没有重复的单词。
    示例 1：
    输入:
        s = "catsanddog"
        wordDict = ["cat", "cats", "and", "sand", "dog"]
    输出:
        [
            "cats and dog",
            "cat sand dog"
        ]
    示例 2：
    输入:
        s = "pineapplepenapple"
        wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
    输出:
        [
            "pine apple pen apple",
            "pineapple pen apple",
            "pine applepen apple"
        ]
    解释: 注意你可以重复使用字典中的单词。
    示例 3：
    输入:
        s = "catsandog"
        wordDict = ["cats", "dog", "sand", "and", "cat"]
    输出:
        []
 */
var wordBreak = function(s, wordDict) {
    let len = s.length
    let wordSet = new Set(wordDict)
    let dp = new Array(len + 1).fill(false)
    dp[0] = true
    let pos = []
    for (let i = 1; i <= len; i++) {
        for (let j = i-1; j >= 0; j--) {
            if(dp[i]) break
            if(!dp[j]) continue
            let str = s.slice(j, i)
            if(wordSet.has(str) && dp[j]){
                // console.log(str)
                dp[i] = true
                // pos.push(str)
                pos[i] = j
                break
            }
        }
    }
    if(!dp[len]) return []
    console.log(pos)
    let res = []
    // let dfs = (start) => {
    //     if(start == len) 
    // }
    // dfs()
    return res
};

console.log(wordBreak('applepenapple', ["apple", "pen"]))
console.log(wordBreak('catsanddog',  ["cat", "cats", "and", "sand", "dog"]))
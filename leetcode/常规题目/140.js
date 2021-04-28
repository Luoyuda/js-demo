/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 08:43:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 18:23:31
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
const backtrack = (s, length, wordSet, index, map) => {
    if(map.has(index)) return map.get(index)
    const wordBreaks = []
    if(index == length){
        wordBreaks.push([])
    }
    for (let i = index + 1; i <= length; i++) {
        let word = s.substring(index, i)
        if(wordSet.has(word)){
            const nextWordBreaks = backtrack(s, length, wordSet, i, map)
            for (const nextWordBreak of nextWordBreaks) {
                const wordBreak = [word, ...nextWordBreak]
                wordBreaks.push(wordBreak)
            }
        }
    }
    map.set(index, wordBreaks)
    return wordBreaks
}
var wordBreak = function(s, wordDict) {
    const map = new Map()
    const set = new Set(wordDict)
    const length = s.length
    const wordBreaks = backtrack(s, length, set, 0, map)
    const breakList = []
    for (const wordBreak of wordBreaks) {
        breakList.push(wordBreak.join(' '))
    }
    return breakList
};

// console.log(wordBreak('applepenapple', ["apple", "pen"]))
console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]))
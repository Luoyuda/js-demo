/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 17:49:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 17:52:32
 * @FilePath: /js-demo/leetcode/常规题目/1684.js
 */
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
1684. 统计一致字符串的数目
    给你一个由不同字符组成的字符串 allowed 和一个字符串数组 words 。
    如果一个字符串的每一个字符都在 allowed 中，就称这个字符串是 一致字符串 。
    请你返回 words 数组中 一致字符串 的数目。
示例 1：
    输入：allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
    输出：2
    解释：字符串 "aaab" 和 "baa" 都是一致字符串，因为它们只包含字符 'a' 和 'b' 。
示例 2：
    输入：allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
    输出：7
    解释：所有字符串都是一致的。
示例 3：
    输入：allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
    输出：4
    解释：字符串 "cc"，"acd"，"ac" 和 "d" 是一致字符串。
提示：
    1 <= words.length <= 104
    1 <= allowed.length <= 26
    1 <= words[i].length <= 10
    allowed 中的字符 互不相同 。
    words[i] 和 allowed 只包含小写英文字母。
 */
var countConsistentStrings = function(allowed, words) {
    let hash = {}
    for (let i = 0; i < allowed.length; i++) {
        hash[allowed[i]] = true
    }
    let sum = 0
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let count = 1
        for (let j = 0; j < word.length; j++) {
            if(!hash[word[j]]) count = 0
        }
        sum += count
    }
    return sum
};

console.log(countConsistentStrings('cad', ["cc","acd","b","ba","bac","bad","ac","d"]))
console.log(countConsistentStrings("abc", ["a","b","c","ab","ac","bc","abc"]))
console.log(countConsistentStrings("ab", ["ad","bd","aaab","baa","badab"]))
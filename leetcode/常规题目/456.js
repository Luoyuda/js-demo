/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 14:56:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 15:03:06
 * @FilePath: /js-demo/leetcode/456.js
 */
/**
 * @param {string} s
 * @return {boolean}
    459. 重复的子字符串
        给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
    示例 1:
        输入: "abab"
        输出: True
        解释: 可由子字符串 "ab" 重复两次构成。
    示例 2:
        输入: "aba"
        输出: False
    示例 3:
        输入: "abcabcabcabc"
        输出: True
        解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 */
var repeatedSubstringPattern = function(s) {
    return (s + s).indexOf(s, 1) != s.length
};

console.log(repeatedSubstringPattern('abab'))
console.log(repeatedSubstringPattern('aba'))
console.log(repeatedSubstringPattern('abcabcabcabc'))
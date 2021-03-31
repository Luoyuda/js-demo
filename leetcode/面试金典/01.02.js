/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 13:51:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 13:56:38
 * @FilePath: /js-demo/leetcode/面试金典/01.02.js
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
面试题 01.02. 判定是否互为字符重排
    给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。
示例 1：
    输入: s1 = "abc", s2 = "bca"
    输出: true 
示例 2：
    输入: s1 = "abc", s2 = "bad"
    输出: false
说明：
    0 <= len(s1) <= 100
    0 <= len(s2) <= 100
 */
var CheckPermutation = function(s1, s2) {
    if(s1.length != s2.length) return false
    let res = 0
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < s1.length; i++) {
        let code1 = s1[i].charCodeAt()
        let code2 = s2[i].charCodeAt()
        sum1 += code1
        sum2 += code2
        res = res ^ code1 ^ code2
    }
    return res == 0 && sum1 == sum2
};

console.log(CheckPermutation('abc', 'bca'))
console.log(CheckPermutation('abc', 'bad'))
console.log(CheckPermutation('aa', 'bb'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-13 10:48:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-13 11:04:31
 * @FilePath: /js-demo/leetcode/389.js
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
389. 找不同
    给定两个字符串 s 和 t，它们只包含小写字母。
    字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
    请找出在 t 中被添加的字母。
示例 1：
    输入：s = "abcd", t = "abcde"
    输出："e"
    解释：'e' 是那个被添加的字母。
示例 2：
    输入：s = "", t = "y"
    输出："y"
示例 3：
    输入：s = "a", t = "aa"
    输出："a"
示例 4：
    输入：s = "ae", t = "aea"
    输出："a"
提示：
    0 <= s.length <= 1000
    t.length == s.length + 1
    s 和 t 只包含小写字母
 */
var findTheDifference = function(s, t) {
    if(!s.length) return t
    let code = t[t.length - 1].charCodeAt()
    for (let i = 0; i < t.length - 1; i++) {
        code ^= t[i].charCodeAt() ^ s[i].charCodeAt();
    }
    return String.fromCharCode(code)
};

console.log(findTheDifference('', 'a'))
console.log(findTheDifference('ae', 'aea'))
console.log(findTheDifference('abcd', 'abcde'))
console.log(findTheDifference('', 'y'))
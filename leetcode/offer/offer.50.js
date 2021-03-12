/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 18:46:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 18:54:08
 * @FilePath: /js-demo/leetcode/offer.50.js
 */
/**
 * @param {string} s
 * @return {character}
    剑指 Offer 50. 第一个只出现一次的字符
        在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
    示例:
        s = "abaccdeff"
        返回 "b"
        s = "" 
        返回 " "
    限制：
        0 <= s 的长度 <= 50000
 */
var firstUniqChar = function(s) {
    let map = {}
    for (let i = 0; i < s.length; i++) {
        if(!map[s[i]]) {
            map[s[i]] = 1
        }else{
            map[s[i]] += 1
        }
    }
    for (const key in map) {
        if(map[key] == 1) return key
    }
    return ' '
};

console.log(firstUniqChar('abaccdeff'))
console.log(firstUniqChar(''))

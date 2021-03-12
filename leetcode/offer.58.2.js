/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 20:28:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 20:34:28
 * @FilePath: /js-demo/leetcode/offer.58.2.js
 */
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
    剑指 Offer 58 - II. 左旋转字符串
        字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。
        请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，
        该函数将返回左旋转两位得到的结果"cdefgab"。
    示例 1：
        输入: s = "abcdefg", k = 2
        输出: "cdefgab"
    示例 2：
        输入: s = "lrloseumgh", k = 6
        输出: "umghlrlose"
    限制：
        1 <= k < s.length <= 10000
 */
var reverseLeftWords = function(s, n) {
    return s.substring(n, s.length) + s.substring(0, n)
};

var reverseLeftWords = function(s,n) {
    let res = []
    for (let i = n; i < s.length; i++) {
        res.push(s[i])
    }
    for (let i = 0; i < n; i++) {
        res.push(s[i])
    }
    return res.join('')
}

console.log(reverseLeftWords("abcdefg", 2))
console.log(reverseLeftWords("lrloseumgh", 6))
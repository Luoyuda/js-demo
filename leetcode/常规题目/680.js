/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 11:02:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 11:09:09
 * @FilePath: /js-demo/leetcode/680.js
 */
/**
 * @param {string} s
 * @return {boolean}
    680. 验证回文字符串 Ⅱ
        给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
    示例 1:
        输入: "aba"
        输出: True
    示例 2:
        输入: "abca"
        输出: True
        解释: 你可以删除c字符。
    注意:
        字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 */
var validPalindrome = function(s) {
    let low = 0
    let high = s.length - 1
    while(low < high){
        if(s[low] != s[high]) {
            return isValidPalindrome(s, low+1, high) || isValidPalindrome(s, low, high-1)
        }
        low++ 
        high--
    }
    return true
};
var isValidPalindrome = function(s, low, high) {
    while(low < high){
        if(s[low] != s[high]) return false
        low++
        high--
    }
    return true
}

console.log(validPalindrome('acsbassca'))
console.log(validPalindrome('a'))
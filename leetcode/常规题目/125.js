/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 17:40:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-16 16:13:55
 * @FilePath: /js-demo/leetcode/常规题目/125.js
 */
/**
 * @param {string} s
 * @return {boolean}
    125. 验证回文串
        给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
        说明：本题中，我们将空字符串定义为有效的回文串。
    示例 1:
        输入: "A man, a plan, a canal: Panama"
        输出: true
    示例 2:
        输入: "race a car"
        输出: false
 */
var isPalindrome = function(s) {
    if(!s.length) return true
    let res = []
    for (let i = 0; i < s.length; i++) {
        let ch = s[i]
        if(isValid(ch)){
            res.push(ch.toUpperCase())
        }
    }
    let left = 0
    let right = res.length - 1
    while(left < right){
        if(res[left] != res[right]){
            return false
        }
        left++
        right--
    }
    // console.log(res)
    return true
};

var isValid = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let left = 0
    let right = s.length - 1
    while(left < right) {
        let leftCh = s[left]
        let rightCh = s[right]
        if(!isValid(leftCh)) {
            left++
        }else if(!isValid(rightCh)) {
            right--
        }else{
            if(leftCh.toLocaleLowerCase() !== rightCh.toLocaleLowerCase()) return false
            left++
            right--
        }
    }
    return true
};

console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("race a car"))
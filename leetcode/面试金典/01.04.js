/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 17:33:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 18:00:24
 * @FilePath: /js-demo/leetcode/面试金典/01.04.js
 */
/**
 * @param {string} s
 * @return {boolean}
面试题 01.04. 回文排列
    给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
    回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列。
    回文串不一定是字典当中的单词。
示例1：
    输入："tactcoa"
    输出：true（排列有"tacocat"、"atcocta"，等等）
 */
var canPermutePalindrome = function(s) {
    let hash = {}
    for (let i = 0; i < s.length; i++) {
        const ch = s[i]
        if(hash[ch] !== undefined){
            hash[ch] += 1
        }else{
            hash[ch] = 1
        }
    }
    let flag = false
    for (const key in hash) {
        if((hash[key] % 2) != 0){
            // console.log(hash[key], key)
            if(flag){
                return false
            }else{
                flag = true
            }
        }
    }
    return true
};
console.log(canPermutePalindrome('tactcoa'))
console.log(canPermutePalindrome('aaaacbbb'))
console.log(canPermutePalindrome("AaBb//a"))
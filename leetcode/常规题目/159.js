/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 13:28:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 13:28:34
 * @FilePath: /js-demo/leetcode/常规题目/159.js
 */
/*
159. 至多包含两个不同字符的最长子串
    给定一个字符串 s ，找出 至多 包含两个不同字符的最长子串 t ，并返回该子串的长度。
示例 1:
    输入: "eceba"
    输出: 3
    解释: t 是 "ece"，长度为3。
示例 2:
    输入: "ccaabbb"
    输出: 5
    解释: t 是 "aabbb"，长度为5。
*/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    let n = s.length
    if(n < 3) return n
    let l = r = count = res = 0
    let hash = {}
    for(let x of s){
        hash[x] = 0
    }
    while(r < n){
        if(hash[s[r]] === 0){
            count++
        }
        hash[s[r]]++
        r++
        while(count > 2){
            hash[s[l]]--
            if(hash[s[l]] === 0){
                count--
            }
            l++
        }
        res = Math.max(res, r - l)
    }
    return res
};
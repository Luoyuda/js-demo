/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 13:31:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 13:31:29
 * @FilePath: /js-demo/leetcode/常规题目/340.js
 */
/*
340. 至多包含 K 个不同字符的最长子串
    给定一个字符串 s ，找出 至多 包含 k 个不同字符的最长子串 T。
示例 1:
    输入: s = "eceba", k = 2
    输出: 3
    解释: 则 T 为 "ece"，所以长度为 3。
示例 2:
    输入: s = "aa", k = 1
    输出: 2
    解释: 则 T 为 "aa"，所以长度为 2。
提示：
    1 <= s.length <= 5 * 104
    0 <= k <= 50
*/
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
    let n = s.length
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
        while(count > k){
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
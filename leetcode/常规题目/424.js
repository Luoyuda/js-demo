/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 16:56:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 16:56:54
 * @FilePath: /js-demo/leetcode/常规题目/424.js
 */
/*
424. 替换后的最长重复字符
    给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。
    注意：字符串长度 和 k 不会超过 104。
示例 1：
    输入：s = "ABAB", k = 2
    输出：4
    解释：用两个'A'替换为两个'B',反之亦然。
示例 2：
    输入：s = "AABABBA", k = 1
    输出：4
    解释：
    将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
    子串 "BBBB" 有最长重复字母, 答案为 4。
*/
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let n = s.length
    if(n < 2) return n
    let A = 'A'.charCodeAt()
    let getCode = x => x.charCodeAt() - A
    let freq = new Array(26).fill(0)
    let right = 0
    let left = 0
    let res = 0
    let maxCount = 0
    while(right < n){
        freq[getCode(s[right])]++
        maxCount = Math.max(maxCount, freq[getCode(s[right])])
        right++
        if(right - left > maxCount + k){
            freq[getCode(s[left])]--
            left++
        }
        res = Math.max(res, right - left)
    }
    return res
};
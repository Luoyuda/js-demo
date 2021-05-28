/*
 * @Author: xiaohuolong
 * @Date: 2021-05-24 22:23:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-24 22:24:03
 * @FilePath: /js-demo/leetcode/常规题目/76.js
 */
/*
76. 最小覆盖子串
    给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
    注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。
示例 1：
    输入：s = "ADOBECODEBANC", t = "ABC"
    输出："BANC"
示例 2：
    输入：s = "a", t = "a"
    输出："a"
提示：
    1 <= s.length, t.length <= 105
    s 和 t 由英文字母组成
    进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let map = new Map()
    let hash = {}
    for(let ch of t){
        hash[ch] = 0
        map.set(ch, (map.get(ch) || 0) + 1)
    }
    let l = 0
    let r = -1
    let check = () => {
        for(let [ch, count] of map.entries()){
            if(hash[ch] < count) return false
        }
        return true
    }
    let len = Infinity
    let start = -1
    let end = -1;
    while(r < s.length){
        r++
        if(hash[s[r]] !== undefined){
            hash[s[r]]++
        }
        while(l <= r && check()){
            if(r - l + 1 < len){
                len = r - l + 1
                start = l
                end = l + len
            }
            if(hash[s[l]]){
                hash[s[l]]--
            }
            l++
        }
    }
    return s.substring(start, end)
};
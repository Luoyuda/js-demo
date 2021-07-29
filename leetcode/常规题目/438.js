/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 21:23:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-29 18:25:48
 * @FilePath: /js-demo/leetcode/常规题目/438.js
 */
/*
438. 找到字符串中所有字母异位词
    给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
    异位词 指字母相同，但排列不同的字符串。
示例 1:
    输入: s = "cbaebabacd", p = "abc"
    输出: [0,6]
    解释:
    起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
    起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
示例 2:
    输入: s = "abab", p = "ab"
    输出: [0,1,2]
    解释:
    起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
    起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
    起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
提示:
    1 <= s.length, p.length <= 3 * 104
    s 和 p 仅包含小写字母
*/
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let map = new Map()
    let hash = {}
    for(let x of p) {
        map.set(x, (map.get(x) || 0) + 1)
        hash[x] = 0
    }
    let l = r = 0
    let res = []
    let n = s.length
    let size = p.length
    let count = 0
    while(r < n){
        let c = s[r]
        hash[c]++ 
        if(map.get(c) >= hash[c]){
            count++
        }
        r++
        while(count === size){
            if(r - l === size){
                res.push(l)
            }
            let d = s[l]
            hash[d]--
            if(map.has(d) && map.get(d) > hash[d]){
                count--
            }
            l++
        }
    }
    return res
};

console.log(findAnagrams("ababababab", "aab")) // [0,2,4,6]
console.log(findAnagrams("baa", "aa")) // [1]
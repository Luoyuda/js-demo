/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 21:23:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 21:24:41
 * @FilePath: /js-demo/leetcode/常规题目/438.js
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
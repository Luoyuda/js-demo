/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 16:27:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 16:59:22
 * @FilePath: /js-demo/leetcode/常规题目/49.js
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
    49. 字母异位词分组
        给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
    示例:
        输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
        输出:
        [
            ["ate","eat","tea"],
            ["nat","tan"],
            ["bat"]
        ]
    说明：
        所有输入均为小写字母。
        不考虑答案输出的顺序。
 */
var groupAnagrams = function(strs) {
    let obj = {}
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i].split('').sort().join('')
        // console.log(str)
        if(!obj[str]) obj[str] = []
        obj[str].push(strs[i])
    }
    // console.log(obj)
    let res = []
    for (const key in obj) {
        res.push(obj[key])
    }
    return res
};

var groupAnagrams = function(strs) {
    let obj = {}
    for (let i = 0; i < strs.length; i++) {
        let counts = new Array(26).fill(0)
        const str = strs[i]
        for (let j = 0; j < str.length; j++) {
            let count = str[j].charCodeAt() - 97
            counts[count] += 1
        }
        let key = counts.join(',')
        // console.log(key)
        if(!obj[key]) obj[key] = []
        obj[key].push(strs[i])
    }
    // console.log(obj)
    let res = []
    for (const key in obj) {
        res.push(obj[key])
    }
    return res
};

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(groupAnagrams(["bdddddddddd","bbbbbbbbbbc"]))
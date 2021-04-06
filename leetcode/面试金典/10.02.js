/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 08:33:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 08:39:04
 * @FilePath: /js-demo/leetcode/面试金典/10.02.js
 */
/**
面试题 10.02. 变位词组
    编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。变位词是指字母相同，但排列不同的字符串。
示例:
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
    ["ate","eat","tea"],
    ["nat","tan"],
    ["bat"]
]
说明：
    所有输入均为小写字母。
    不考虑答案输出的顺序。
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let hash = {}
    let result = []
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i].split('').sort()
        if(hash[str]){
            hash[str].push(strs[i])
        }else{
            let res = [strs[i]]
            hash[str] = res
            result.push(res)
        }
    }
    return result
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
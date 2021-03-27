/*
 * @Author: xiaohuolong
 * @Date: 2021-03-27 08:32:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-27 09:43:00
 * @FilePath: /js-demo/leetcode/常规题目/1209.js
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
1209. 删除字符串中的所有相邻重复项 II
    给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，
    并删除它们，使被删去的字符串的左侧和右侧连在一起。
    你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。
    在执行完所有删除操作后，返回最终得到的字符串。
示例 1：
    输入：s = "abcd", k = 2
    输出："abcd"
    解释：没有要删除的内容。
示例 2：
    输入：s = "deeedbbcccbdaa", k = 3
    输出："aa"
    解释： 
    先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
    再删除 "bbb"，得到 "dddaa"
    最后删除 "ddd"，得到 "aa"
示例 3：
    输入：s = "pbbcggttciiippooaais", k = 2
    输出："ps"
提示：
    1 <= s.length <= 10^5
    2 <= k <= 10^4
    s 中只含有小写英文字母。
 */
var removeDuplicates = function(s, k) {
    let strs = s.split('')
    let counts = []
    for (let i = 0; i < strs.length; i++) {
        if(i == 0 || strs[i] != strs[i - 1]){
            counts.push(1)
        }else{
            let incr = counts.pop() + 1
            if(incr == k){
                strs.splice(i-k+1, k)
                i = i - k
            }else{
                counts.push(incr)
            }
        }
    }
    return strs.join('')
}
console.log(removeDuplicates('deeedbbcccbdaa', 3))
console.log(removeDuplicates('pbbcggttciiippooaais', 2))
console.log(removeDuplicates('abcd', 2))
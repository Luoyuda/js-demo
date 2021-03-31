/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 23:45:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-30 00:00:36
 * @FilePath: /js-demo/leetcode/面试金典/10.05.js
 */
/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
面试题 10.05. 稀疏数组搜索
    稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。
示例1:
    输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"
    输出：-1
    说明: 不存在返回-1。
示例2:
    输入：words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ball"
    输出：4
提示:
    words的长度在[1, 1000000]之间
 */
var findString = function(words, s) {
    let hash = {}
    for (let i = 0; i < words.length; i++) {
        hash[words[i]] = i
    }
    return hash[s] != undefined ? hash[s] : -1
};

var findString = function(words, s) {
    if(!words.length) return -1
    let left = 0
    let right = words.length - 1
    while (left <= right){
        // console.log(left, right)
        let mid = (left + right) >> 1
        let m = mid
        while(words[m] === '' && m <= right){
            m++
        }
        if(m > right) {
            right = mid - 1
            continue
        }
        // console.log(words[m])
        if(words[m] == s) return m
        else if(words[m] < s) left = m + 1
        else if(words[m] > s) right = m - 1
    }
    return -1
};


console.log(findString(
    ["DirNnILhARNS hOYIFB", "SM ", "YSPBaovrZBS", "evMMBOf", "mCrS", "oRJfjw gwuo", "xOpSEXvfI"],
    "mCrS"))
console.log(findString(["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], "ta"))
console.log(findString(["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], "ball"))
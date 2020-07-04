/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 21:43:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-03 22:59:31
 * @FilePath: /js-demo/leetcode/14.js
 */ 
var longestCommonPrefix = function(strs) {
    let length = strs.length
    if(!length) return ""
    if(length == 1) return strs[0]
    // console.log(strs)
    let i = 1
    let prefix = strs[0]
    let lastPrefix = ''
    while(i < length && prefix != ''){
        let nextStr = strs[i]
        let j = 0
        lastPrefix = ''
        while(j < nextStr.length || j < prefix.length){
            if(nextStr[j] == prefix[j]){
                lastPrefix += nextStr[j]
                j++
            }else{
                break
            }
        }
        prefix = lastPrefix
        i++
    }
    // console.log(lastPrefix, prefix)
    return prefix
};

var longestCommonPrefix2 = function(strs) {
    let length = strs.length
    if(!length) return ""
    if(length == 1) return strs[0]
    let minLength = Infinity
    for(let i = 0; i <strs.length; i++){
        minLength = Math.min(minLength, strs[i].length, minLength)
    }
    let low = 0;
    let high = minLength

    while(low < high){
        let mid = Math.floor((high - low + 1) / 2) + low
        if(isCommonPrefix(strs, mid)){
            low = mid
        }else{
            high = mid - 1
        }
    }

    return strs[0].substr(0, low)
}

var isCommonPrefix = function(strs, len){
    let str = strs[0].substr(0, len)
    let count = strs.length
    for (let i = 1; i < count; i++){
        let temp = strs[i]
        for (let j = 0; j < len; j++) {
            if(str[j] !== temp[j]) return false
        }
    }
    return true
}

longestCommonPrefix(["flower","flow","flight"])
longestCommonPrefix(["dog","racecar","car"])
longestCommonPrefix(["aaa","aa","aaa"])
longestCommonPrefix2(["flower","flow","flight"])
longestCommonPrefix2(["dog","racecar","car"])
longestCommonPrefix2(["aaa","aa","aaa"])
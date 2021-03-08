/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 21:43:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 14:42:43
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
        minLength = Math.min(minLength, strs[i].length)
    }
    let low = 0;
    let high = minLength

    while(low < high){
        let mid = Math.floor((high - low + 1) / 2) + low
        // console.log(high, mid, low)
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

var longestCommonPrefix2 = function(strs) {
    let length = strs.length
    if(!length) return ""
    if(length == 1) return strs[0]
    let min = Infinity
    for (let i = 0; i < strs.length; i++) {
        min = Math.min(strs[i].length, min)
    }
    let low = 0
    let high = min
    while(low < high){
        let mid = Math.ceil((high - low) / 2) + low
        if(isCommonPrefix(strs, mid)){
            low = mid
        }else{
            high = mid - 1
        }
    }
    return strs[0].substr(0, low)
}

var isCommonPrefix = function(strs, len){
    let T = strs[0].substr(0, len)
    for (let i = 1; i < strs.length; i++) {
        for (let j = 0; j < len; j++) {
            if(T[j] !== strs[i][j]) return false
        }
    }
    return true
}


// console.log(longestCommonPrefix(["flower","flow","flight"]))
// console.log(longestCommonPrefix(["dog","racecar","car"]))
// console.log(longestCommonPrefix(["aaa","aa","aaa"]))
console.log(longestCommonPrefix2(["flower","flow","flight"]))
console.log(longestCommonPrefix2(["dog","racecar","car"]))
console.log(longestCommonPrefix2(["aaa","aa","aaa"]))
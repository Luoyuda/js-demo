/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 22:17:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-30 08:31:37
 * @FilePath: /js-demo/leetcode/3.js
 */ 
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(string) {
    let len = string.length
    if(!len) return 0
    let end = 1
    let endStr = ''
    let temp = string[0]
    let set = new Set()
    while(end < len){
        let i = 0
        let j = -1
        let add = string[end]
        while(i < temp.length){
            if(temp[i] == add){
                j = i
            }
            i++
        }
        if(j == -1){
            temp = temp + add
            if(temp.length > endStr.length){
                endStr = temp
            }
        }else{
            temp = temp.substr(j+1) + add
        }
        end++
    }
    return endStr.length || temp.length
};

var lengthOfLongestSubstring2 = (string) => {
    const set = new Set()
    const len = string.length
    let num = 0
    if(!len) return num
    let end = -1
    let i = 0
    while(i < len){
        if(i != 0){
            set.delete(string[i-1])
        }
        while(end + 1 < len){
            // 遇到相同字符，跳出
            if(set.has(string[end+1])) break
            // 不同字符 添加
            set.add(string[++end])
        }
        num = Math.max(num, end - i + 1)
        i++
    }
    return num
}
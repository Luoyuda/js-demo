/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 17:06:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-28 22:03:52
 * @FilePath: /js-demo/algorithm/BF/BF.js
 */ 
const BFStr = (S=[], T=[], pos=1) => {
    let t = T[0]
    let s = S[0]
    if(!s || !t) return -1
    let i = pos
    let j = 1
    while (i <= s && j<= t) {
        if(S[i] == T[j]){
            i++
            j++
        }else{
            i = i - j + 2 // i 回溯到下一个字符
            j = 1 // j回溯到子串第一位
        }
    }
    return j > t ? i - t : -1
}
const BF = (S='', T='', pos=0) => {
    let t = T.length
    let s = S.length
    if(!s || !t) return -1
    let i = pos
    let j = 0
    while (i < s && j< t) {
        if(S[i] == T[j]){
            i++
            j++
        }else{
            i = i - j + 1 // i 回溯到下一个字符
            j = 0 // j回溯到子串第一位
        }
    }
    return j >= t ? i - t : -1
}
module.exports = {
    BF,
    BFStr
}
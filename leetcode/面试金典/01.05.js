/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 21:48:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 22:14:12
 * @FilePath: /js-demo/leetcode/面试金典/01.05.js
 */
/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
面试题 01.05. 一次编辑
    字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。
    给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。
示例 1:
输入: 
    first = "pale"
    second = "ple"
输出: True
示例 2:
输入: 
    first = "pales"
    second = "pal"
输出: False
 */
var oneEditAway = function(first, second) {
    let firstLen = first.length
    let secondLen = second.length
    if(Math.abs(firstLen - secondLen) > 1) return false
    let cnt = 0
    if(firstLen == secondLen){
        for (let i = 0; i < firstLen; i++) {
            if(first[i] != second[i]){
                cnt++
            }
        }
    }else{
        if(firstLen < secondLen){
            let temp = first
            first = second
            second = temp
        }
        let max = Math.max(firstLen, secondLen)
        for (let i = 0; i < max; i++) {
            if(first[i] == second[i - cnt]) continue
            cnt++
        }
    }
    // console.log(cnt)
    return cnt <= 1
};


console.log(oneEditAway('pale', 'pla'))
console.log(oneEditAway('ple', 'pale'))
console.log(oneEditAway('pale', 'ale'))
console.log(oneEditAway('pale', 'pae'))
console.log(oneEditAway('pale', 'pal'))
console.log(oneEditAway('pla', 'ple'))
console.log(oneEditAway('pla', 'pae'))
console.log(oneEditAway('pales', 'ple'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 13:46:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 13:50:10
 * @FilePath: /js-demo/leetcode/面试金典/01.01.js
 */
/**
 * @param {string} astr
 * @return {boolean}
面试题 01.01. 判定字符是否唯一
    实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
示例 1：
    输入: s = "leetcode"
    输出: false 
示例 2：
    输入: s = "abc"
    输出: true
限制：
    0 <= len(s) <= 100
    如果你不使用额外的数据结构，会很加分。
 */
var isUnique = function(astr) {
    let res = 0
    let i = 0
    let a = 'a'.charCodeAt()
    while (i < astr.length) {
        let moveBit = astr[i].charCodeAt() - a
        let temp = 1 << moveBit
        if((res & temp) != 0) return false
        res = res | temp
        i++
    }
    return true
};

console.log(isUnique('leetcode'))
console.log(isUnique('abc'))
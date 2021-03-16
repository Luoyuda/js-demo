/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 08:15:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 08:24:16
 * @FilePath: /js-demo/leetcode/171.js
 */
/**
 * @param {string} s
 * @return {number}
    171. Excel表列序号
        给定一个Excel表格中的列名称，返回其相应的列序号。
    例如，
        A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28 
        ...
    示例 1:
        输入: "A"
        输出: 1
    示例 2:
        输入: "AB"
        输出: 28
    示例 3:
        输入: "ZY"
        输出: 701
 */
var titleToNumber = function(s) {
    let sum = 0
    let start = 'A'.charCodeAt()
    let right = s.length - 1
    let cut = 1
    while(right >= 0){
        sum += ((s[right]).toUpperCase().charCodeAt() - start + 1) * cut
        cut *= 26 
        right--
    }
    return sum
};

console.log(titleToNumber('AB'))
console.log(titleToNumber('ZY'))
// console.log('Z'.charCodeAt() - 'A'.charCodeAt())
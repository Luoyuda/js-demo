/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 18:26:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 08:07:29
 * @FilePath: /js-demo/leetcode/offer.05.js
 */
/**
 * @param {string} s
 * @return {string}
    剑指 Offer 05. 替换空格
        请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
    示例 1：
        输入：s = "We are happy."
        输出："We%20are%20happy."
    限制：
        0 <= s 的长度 <= 10000
 */
var replaceSpace = function(s) {
    let str = '%20'
    let strLen = str.length
    let count = 0
    for (let i = 0; i < s.length; i++) {
        if(s[i] === ' ') count ++
    }
    let p1 = s.length
    let p2 = s.length + (count * strLen) - count
    for (let i = p2 - 1, j = p1 - 1; j < i; i--,j--) {
        if(s[j]!=' '){
            s[i]=s[j];
        }else{
            s = s.substr(0, j) + str + s.substr(j + 1, s.length - j)
            i -= 2;
        }
    }
    return s
};
console.log(replaceSpace('We are happy'))
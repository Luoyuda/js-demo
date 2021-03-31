/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 18:26:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 18:30:51
 * @FilePath: /js-demo/leetcode/面试金典/01.09.js
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
面试题 01.09. 字符串轮转
    字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成
    （比如，waterbottle是erbottlewat旋转后的字符串）。
示例1:
    输入：s1 = "waterbottle", s2 = "erbottlewat"
    输出：True
示例2:
    输入：s1 = "aa", s2 = "aba"
    输出：False
提示：
    字符串长度在[0, 100000]范围内。
 */
var isFlipedString = function(s1, s2) {
    if(s1.length != s2.length) return false
    let s = s2 + s2
    return s.indexOf(s1) > -1
};

console.log(isFlipedString('waterbottle', 'erbottlewat'))
console.log(isFlipedString('aa', 'aba'))
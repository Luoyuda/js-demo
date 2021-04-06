/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 08:24:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-06 08:36:27
 * @FilePath: /js-demo/leetcode/常规题目/557.js
 */
/**
 * @param {string} s
 * @return {string}
557. 反转字符串中的单词 III
    给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
示例：
    输入："Let's take LeetCode contest"
    输出："s'teL ekat edoCteeL tsetnoc"
提示：
    在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 */
var reverseWords = function(s) {
    let i = 0
    let j = 0
    let str = ''
    while (i < s.length){
        if(s[j] == ' ' || j == s.length){
            for (let z = j - 1; z >= i; z--) {
                str += s[z]
            }
            str += ' '
            i = j + 1
        }
        j++
    }
    return str.substr(0, str.length - 1)
};

console.log(reverseWords("Let's take LeetCode contest"))
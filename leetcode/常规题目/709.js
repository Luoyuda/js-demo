/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 18:07:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 18:16:07
 * @FilePath: /js-demo/leetcode/常规题目/709.js
 */
/**
 * @param {string} str
 * @return {string}
709. 转换成小写字母
    实现函数 ToLowerCase()，该函数接收一个字符串参数 str，
    并将该字符串中的大写字母转换成小写字母，之后返回新的字符串。
示例 1：
    输入: "Hello"
    输出: "hello"
示例 2：
    输入: "here"
    输出: "here"
示例 3：
    输入: "LOVELY"
    输出: "lovely"
 */
var toLowerCase = function(str) {
    let a = 'a'.charCodeAt()
    let A = 'A'.charCodeAt()
    let s = ''
    for (let i = 0; i < str.length; i++) {
        const code = str[i].charCodeAt();
        if(code >= A && code <= A + 26){
            s += String.fromCharCode(a + (code - A))
        }else{
            s += str[i]
        }
    }
    return s
};

console.log(toLowerCase('Hello'))
console.log(toLowerCase('here'))
console.log(toLowerCase('LOVELY'))
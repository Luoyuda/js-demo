/*
 * @Author: xiaohuolong
 * @Date: 2020-06-30 20:48:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-30 21:12:24
 * @FilePath: /js-demo/leetcode/7.js
 */ 
var reverse = function(num) {
    let i = 0
    let flag = false
    const large = Math.pow(2,31)
    if(num < 0) {
        num = Math.abs(num) 
        flag = true
    }
    while (num > 0){
        let j = num % 10
        num = Math.floor(num / 10)
        i = i * 10 + j
    }
    if(i > large-1 || i < -large) return 0
    if(flag) i = -i
    return i
};
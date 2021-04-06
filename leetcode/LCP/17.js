/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 12:00:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 12:00:12
 * @FilePath: /js-demo/leetcode/LCP/17.js
 */
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    let x = 1
    let y = 0
    for(let i = 0; i < s.length; i++){
        if(s[i] == 'A'){
            x = 2 * x + y
        }else{
            y = 2 * y + x
        }
    }
    return x + y
};
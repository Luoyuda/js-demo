/*
 * @Author: xiaohuolong
 * @Date: 2020-07-01 23:46:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-01 23:54:17
 * @FilePath: /js-demo/leetcode/13.js
 */ 
var romanToInt = function(s) {
    const l = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    }
    let sum = 0
    let last = 0
    for(let i = 0; i <s.length; i++) {
        let num = l[s[i]]
        if(last < num){
            sum -= last
        }else{
            sum += last
        }
        last = num
    }
    sum += last
    return sum
};
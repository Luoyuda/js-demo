/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 00:05:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-08 00:09:39
 * @FilePath: /js-demo/leetcode/16.11.js
 */ 
var divingBoard = function(shorter, longer, k) {
    let res = []
    if(k == 0) return res
    if(shorter == longer) return [shorter * k]
    for(let i = k; i >= 0; i--){
        // console.log(i)
        res.push(shorter * i + longer * (k-i))
    }
    return res
};

console.log(divingBoard(1, 2, 3))
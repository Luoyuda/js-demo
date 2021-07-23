/*
 * @Author: xiaohuolong
 * @Date: 2021-07-23 07:51:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-23 07:51:51
 * @FilePath: /js-demo/leetcode/常规题目/1893.js
 */
/**
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
var isCovered = function(ranges, left, right) {
    let diff = new Array(52).fill(0)
    for(let [l, r] of ranges){
        ++diff[l]
        --diff[r + 1]
    }
    let curr = 0
    for(let i = 1; i <= 50; ++i){
        curr += diff[i]
        if(i >= left && i <= right && curr <= 0){
            return false
        }
    }
    return true
};
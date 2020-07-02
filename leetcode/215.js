/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 22:12:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-29 22:12:28
 * @FilePath: /js-demo/leetcode/215.js
 */ 
var findKthLargest = function(nums, k) {
    if(k < 1) return 0
    let res = nums.sort((a, b) => a > b ? -1 : 1)
    return res[k-1]
};
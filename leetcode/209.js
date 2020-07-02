/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:42:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-29 11:42:22
 * @FilePath: /js-demo/leetcode/209.js
 */ 
var minSubArrayLen = function(s, nums) {
    let len = nums.length
    if(!len) return 0
    let start = 0
    let end = 0
    let sum = 0
    let res = len
    while(end < len){
        sum += nums[end]
        while(sum >= s){
            res = Math.min(res, end - start + 1)
            sum -= nums[start]
            start++
        }
        end++
    }
    return sum+nums[start-1] >= s ? res : 0
};
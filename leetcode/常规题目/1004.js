/*
 * @Author: xiaohuolong
 * @Date: 2021-07-26 08:12:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-26 08:12:50
 * @FilePath: /js-demo/leetcode/常规题目/1004.js
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    let l = r = count = ans = 0
    let n = nums.length
    while(r < n){
        if(nums[r] === 0){
            count++
        }
        r++
        while(count > k){
            if(nums[l] === 0){
                count--
            }
            l++
        }
        ans = Math.max(ans, r - l)
    }
    return ans
};
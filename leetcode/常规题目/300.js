/*
 * @Author: xiaohuolong
 * @Date: 2021-03-21 19:06:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-16 11:14:39
 * @FilePath: /js-demo/leetcode/常规题目/300.js
 */
/**
 * 
 * @param {*} nums 
    Longest Increasing Subsequence
        给定一个无序的整数数组，找到其中最长上升子序列的长度。
    示例
        输入: [10,9,2,5,3,7,101,18]
        输出: 4
        解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
*/
// 动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if(!nums.length) return 0
    let dp = []
    dp[0] = 1
    let max = 1
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1
        for (let j = 0; j < i; j++) {
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
}
// 动态规划 + 二分
var lengthOfLIS = function(nums) {
    let tail = []
    let res = 0
    for(let num of nums){
        let i = 0, j = res
        while(i < j){
            let m = Math.floor((i + j) / 2)
            if(num > tail[m]) i = m + 1
            else j = m
        }
        tail[i] = num
        if(j === res) res++
    }
    return res
};
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
console.log(lengthOfLIS([1]))
console.log(lengthOfLIS([]))
console.log(lengthOfLIS([4,10,4,3,8,9]))

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 18:57:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 19:06:00
 * @FilePath: /js-demo/leetcode/面试金典/16.17.js
 */
/**
 * @param {number[]} nums
 * @return {number}
面试题 16.17. 连续数列
    给定一个整数数组，找出总和最大的连续数列，并返回总和。
示例：
    输入： [-2,1,-3,4,-1,2,1,-5,4]
    输出： 6
    解释： 连续子数组 [4,-1,2,1] 的和最大，为 6。
进阶：
    如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 */
var maxSubArray = function(nums) {
    // f(x) = Math.max(f(x-1), f(x-1)+nums[i])
    let prev = 0
    let max = nums[0]
    for (let i = 0; i < nums.length; i++) {
        prev = Math.max(nums[i], prev + nums[i])
        max = Math.max(prev, max)
    }
    return max
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
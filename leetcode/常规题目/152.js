/*
 * @Author: xiaohuolong
 * @Date: 2021-04-28 11:11:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 11:31:36
 * @FilePath: /js-demo/leetcode/常规题目/152.js
 */
/* 
152. 乘积最大子数组
    给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组
    （该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
示例 1:
    输入: [2,3,-2,4]
    输出: 6
    解释: 子数组 [2,3] 有最大乘积 6。
示例 2:
    输入: [-2,0,-1]
    输出: 0
    解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let n = nums.length;
    let minDp = nums.slice(0)
    let maxDp = nums.slice(0)
    for (let i = 1; i < n; i++) {
        maxDp[i] = Math.max(maxDp[i - 1] * nums[i], nums[i], minDp[i - 1] * nums[i])
        minDp[i] = Math.min(minDp[i - 1] * nums[i],  nums[i], maxDp[i - 1] * nums[i])
    }
    // console.log(minDp, maxDp)
    let ans = maxDp[0]
    for (let i = 1; i < n; i++) {
        ans = Math.max(ans, maxDp[i])     
    }
    return ans
};

var maxProduct = function(nums) {
    let n = nums.length;
    let min = max = ans = nums[0]
    for (let i = 1; i < n; i++) {
        let mx = max
        let mi = min
        let x = nums[i]
        max = Math.max(mx * x, x, mi * x)
        min = Math.min(mi * x, x, mx * x)
        ans = Math.max(ans, max, min)     
    }
    return ans
};

console.log(maxProduct([2,3,-2,-4]))
console.log(maxProduct([-2,0,-1]))
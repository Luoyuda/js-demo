/*
 * @Author: xiaohuolong
 * @Date: 2021-03-20 08:58:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 13:32:48
 * @FilePath: /js-demo/leetcode/常规题目/53.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    53. 最大子序和
        给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    示例 1：
        输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
        输出：6
        解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
    示例 2：
        输入：nums = [1]
        输出：1
    示例 3：
        输入：nums = [0]
        输出：0
    示例 4：
        输入：nums = [-1]
        输出：-1
    示例 5：
        输入：nums = [-100000]
        输出：-100000
    提示：
        1 <= nums.length <= 3 * 104
        -105 <= nums[i] <= 105
 */
var maxSubArray = function(nums) {
    // f(x) = max(f(x-1), f(x-1)+f(x), f(x))
    let max = nums[0]
    let pre = nums[0]
    for (var i = 1; i < nums.length; i++){
        pre = Math.max(pre + nums[i], nums[i])
        max = Math.max(pre, max)
    }
    // console.log(max)
    return max
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let dp = []
    let len = nums.length - 1
    let max = 0
    dp[0] = nums[0]
    for (let i = 1; i <= len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
        max = Math.max(dp[i], max)
    }
    return max
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
console.log(maxSubArray([2, 3,-6,2,4]))

/*
 * @Author: xiaohuolong
 * @Date: 2021-04-23 10:16:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-23 10:22:56
 * @FilePath: /js-demo/leetcode/常规题目/368.js
 */
/* 
368. 最大整除子集
    给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，
    子集中每一元素对 (answer[i], answer[j]) 都应当满足：
    answer[i] % answer[j] == 0 ，或
    answer[j] % answer[i] == 0
    如果存在多个有效解子集，返回其中任何一个均可。
示例 1：
    输入：nums = [1,2,3]
    输出：[1,2]
    解释：[1,3] 也会被视为正确答案。
示例 2：
    输入：nums = [1,2,4,8]
    输出：[1,2,4,8]
提示：
    1 <= nums.length <= 1000
    1 <= nums[i] <= 2 * 109
    nums 中的所有整数 互不相同
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function(nums) {
    let len = nums.length
    nums.sort((a, b) => a - b)
    let dp = new Array(len).fill(1)
    let max = 1
    let maxVal = nums[0]
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if(nums[i] % nums[j] == 0){
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        if(dp[i] > max){
            max = dp[i]
            maxVal = nums[i]
        }
    }
    if(max == 1) return [maxVal]
    let res = []
    for (let i = len - 1; i >= 0 && max > 0; i--) {
        if(maxVal % nums[i] == 0 && dp[i] === max){
            max--
            res.push(nums[i])
            maxVal = nums[i]
        }
    }
    return res
};

console.log(largestDivisibleSubset([1,2,3,4,8]))
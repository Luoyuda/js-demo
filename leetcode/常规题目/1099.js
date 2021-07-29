/*
 * @Author: xiaohuolong
 * @Date: 2021-07-29 16:38:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-29 16:41:52
 * @FilePath: /js-demo/leetcode/常规题目/1099.js
 */
/*
1099. 小于 K 的两数之和
    给你一个整数数组 nums 和整数 k ，返回最大和 sum ，满足存在 i < j 使得 nums[i] + nums[j] = sum 且 sum < k 。如果没有满足此等式的 i,j 存在，则返回 -1 。
示例 1：
    输入：nums = [34,23,1,24,75,33,54,8], k = 60
    输出：58
    解释：
    34 和 24 相加得到 58，58 小于 60，满足题意。
示例 2：
    输入：nums = [10,20,30], k = 15
    输出：-1
    解释：
    我们无法找到和小于 15 的两个元素。
提示：
    1 <= nums.length <= 100
    1 <= nums[i] <= 1000
    1 <= k <= 2000
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var twoSumLessThanK = function(nums, k) {
    nums.sort((a, b) => a - b)
    let l = 0
    let r = nums.length - 1
    let max = -1
    while(l < r){
        let sum = nums[l] + nums[r]
        if(sum >= k){
            r--
        }else{
            max = Math.max(max, sum)
            l++
        }
    }
    return max
};
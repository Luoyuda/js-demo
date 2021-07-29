/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 21:54:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 21:55:27
 * @FilePath: /js-demo/leetcode/常规题目/713.js
 */
/*
713. 乘积小于K的子数组
    给定一个正整数数组 nums和整数 k 。
    请找出该数组内乘积小于 k 的连续的子数组的个数。
示例 1:
    输入: nums = [10,5,2,6], k = 100
    输出: 8
    解释: 8个乘积小于100的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
    需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
示例 2:
    输入: nums = [1,2,3], k = 0
    输出: 0
提示: 
    1 <= nums.length <= 3 * 104
    1 <= nums[i] <= 1000
    0 <= k <= 106
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    let l = r = res = 0
    let n = nums.length
    let sum = 1
    while(r < n){
        sum *= nums[r]
        r++
        while(sum >= k && l < r){
            sum /= nums[l]
            l++
        }
        res += r - l
    }
    return res
};
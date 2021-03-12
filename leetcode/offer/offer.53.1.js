/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 08:47:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 10:06:42
 * @FilePath: /js-demo/leetcode/offer.53.1.js
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
    剑指 Offer 53 - I. 在排序数组中查找数字 I
        统计一个数字在排序数组中出现的次数。
    示例 1:
        输入: nums = [5,7,7,8,8,10], target = 8
        输出: 2
    示例 2:
        输入: nums = [5,7,7,8,8,10], target = 6
        输出: 0
    限制：
        0 <= 数组长度 <= 50000
 */
var search = function(nums, target) {
    let i = 0
    let j = nums.length - 1
    while(i <= j){
        let mid = (i + j) / 2 | 0
        if(nums[mid] <= target){
            i = mid + 1
        }else{
            j = mid - 1
        }
    }
    if(j >= 0 && nums[j] != target) return 0
    let right = j
    i = 0
    j = nums.length - 1
    while(i <= j){
        let mid = (i + j) / 2 | 0
        if(nums[mid] < target){
            i = mid + 1
        }else{
            j = mid - 1
        }
    }
    let left = j;
    return right - left
};

console.log(search([5,7,7,8,8,10], 8))
console.log(search([5,7,7,8,8,10], 7))
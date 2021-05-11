/*
 * @Author: xiaohuolong
 * @Date: 2021-05-06 12:06:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-06 12:19:58
 * @FilePath: /js-demo/leetcode/常规题目/162.js
 */
/*
162. 寻找峰值
    峰值元素是指其值大于左右相邻值的元素。
    给你一个输入数组 nums，找到峰值元素并返回其索引。
    数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
    你可以假设 nums[-1] = nums[n] = -∞ 。
示例 1：
    输入：nums = [1,2,3,1]
    输出：2
    解释：3 是峰值元素，你的函数应该返回其索引 2。
示例 2：
    输入：nums = [1,2,1,3,5,6,4]
    输出：1 或 5 
    解释：你的函数可以返回索引 1，其峰值元素为 2；
        或者返回索引 5， 其峰值元素为 6。
提示：
    1 <= nums.length <= 1000
    -231 <= nums[i] <= 231 - 1
    对于所有有效的 i 都有 nums[i] != nums[i + 1]
进阶：你可以实现时间复杂度为 O(logN) 的解决方案吗？
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let left = 0
    let right = nums.length - 1
    while(left < right){
        let mid = left + Math.floor((right - left) / 2)
        if(nums[mid] < nums[mid + 1]){
            left = mid + 1
        }else{
            right = mid
        }
    }
    return left
}
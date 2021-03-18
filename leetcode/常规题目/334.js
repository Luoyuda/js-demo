/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 17:53:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 18:15:20
 * @FilePath: /js-demo/leetcode/常规题目/334.js
 */
/**
 * @param {number[]} nums
 * @return {boolean}
    334. 递增的三元子序列
        给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
        如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，
        使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。
    示例 1：
        输入：nums = [1,2,3,4,5]
        输出：true
        解释：任何 i < j < k 的三元组都满足题意
    示例 2：
        输入：nums = [5,4,3,2,1]
        输出：false
        解释：不存在满足题意的三元组
    示例 3：
        输入：nums = [2,1,5,0,4,6]
        输出：true
        解释：三元组 (3, 4, 5) 满足题意，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6
    提示：
        1 <= nums.length <= 105
        -231 <= nums[i] <= 231 - 1
 */
var increasingTriplet = function(nums) {
    let first = Infinity
    let second = Infinity
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(num <= first) first = num
        else if(num <= second) second = num
        else if (num > second) return true
    }
    return false
};
console.log(increasingTriplet([5,4,3,2,1]))
console.log(increasingTriplet([1,2,3,4,5]))
console.log(increasingTriplet([2,1,5,0,4,6]))
console.log(increasingTriplet([20,100,10,12,5,13]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 14:44:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 15:52:16
 * @FilePath: /js-demo/leetcode/常规题目/1464.js
 */
/**
 * @param {number[]} nums
 * @return {number}
1464. 数组中两元素的最大乘积
    给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。
    请你计算并返回该式的最大值。
示例 1：
    输入：nums = [3,4,5,2]
    输出：12 
    解释：如果选择下标 i=1 和 j=2（下标从 0 开始），
    则可以获得最大值，(nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12 。 
示例 2：
    输入：nums = [1,5,4,5]
    输出：16
    解释：选择下标 i=1 和 j=3（下标从 0 开始），则可以获得最大值 (5-1)*(5-1) = 16 。
示例 3：
    输入：nums = [3,7]
    输出：12
提示：
    2 <= nums.length <= 500
    1 <= nums[i] <= 10^3
 */
var maxProduct = function(nums) {
    let max = 1
    let second = 1
    for (let i = 0; i < nums.length; i++) {
        if(max < nums[i]) {
            second = max
            max = nums[i]
        }else if(second < nums[i]){
            second = nums[i]
        }
    }
    return (max-1) * (second-1)
};

console.log(maxProduct([3,4,5,2]))
console.log(maxProduct([1,5,4,5]))
console.log(maxProduct([3, 7]))
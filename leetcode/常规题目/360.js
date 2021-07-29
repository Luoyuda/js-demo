/*
 * @Author: xiaohuolong
 * @Date: 2021-07-28 21:52:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-28 21:53:15
 * @FilePath: /js-demo/leetcode/常规题目/360.js
 */
/*
有序转化数组
    给你一个已经 排好序 的整数数组 nums 和整数 a、b、c。对于数组中的每一个数 x，计算函数值 f(x) = ax2 + bx + c，请将函数值产生的数组返回。
    要注意，返回的这个数组必须按照 升序排列，并且我们所期望的解法时间复杂度为 O(n)。
示例 1：
    输入: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
    输出: [3,9,15,33]
示例 2：
    输入: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
    输出: [-23,-5,1,7]
*/
/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
var sortTransformedArray = function(nums, a, b, c) {
    return nums.map(x => x * x * a + b * x + c).sort((a, b) => a - b)
};
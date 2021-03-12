/*
 * @Author: xiaohuolong
 * @Date: 2021-03-09 08:21:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-09 08:34:00
 * @FilePath: /js-demo/leetcode/offer.39.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    剑指 Offer 39. 数组中出现次数超过一半的数字
        数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
        你可以假设数组是非空的，并且给定的数组总是存在多数元素。
    示例 1:
        输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
        输出: 2
    限制：
        1 <= 数组长度 <= 50000
 */
var majorityElement = function(nums) {
    let x = 0
    let votes = 0
    for (let i = 0; i < nums.length; i++) {
        const el = nums[i];
        if(votes == 0) x = el
        votes += el == x ? 1 : -1
    }
    return x
};

console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]))
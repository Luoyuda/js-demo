/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 09:48:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 12:56:15
 * @FilePath: /js-demo/leetcode/常规题目/283.js
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
    283. 移动零
        给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
    示例:
        输入: [0,1,0,3,12]
        输出: [1,3,12,0,0]
    说明:
        必须在原数组上操作，不能拷贝额外的数组。
        尽量减少操作次数。
 */
var moveZeroes = function(nums) {
    let left = 0
    let right = 0
    // let pos = right
    while(right < nums.length){
        if(nums[right] != 0){
            let temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left++
        }
        right++
    }
    return nums
};
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left = 0
    let right = 0
    let n = nums.length
    while (right < n) {
        if(nums[right] != 0){
            let temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left++
        }
        right++
    }
    return nums
};
console.log(moveZeroes([0,1,0,3,12]))
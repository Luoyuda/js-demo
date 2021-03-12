/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 14:51:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 14:56:56
 * @FilePath: /js-demo/leetcode/offer.21.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
    剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
        输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
    示例：
        输入：nums = [1,2,3,4]
        输出：[1,3,2,4] 
        注：[3,1,2,4] 也是正确的答案之一。
    提示：
        0 <= nums.length <= 50000
        1 <= nums[i] <= 10000
 */
var exchange = function(nums) {
    let left = 0 
    let right = nums.length - 1
    while(left <= right){
        while(left <= right && isEven(nums[left])) left++
        while(left <= right && !isEven(nums[right])) right--
        if(left >= right) break
        let temp = nums[left]
        nums[left] = nums[right]
        nums[right] = temp
    }
    return nums
};

var isEven = n => n % 2 != 0

console.log(exchange([1,2,3,4]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 16:13:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 16:21:11
 * @FilePath: /js-demo/leetcode/常规题目/217.js
 */
/**
 * @param {number[]} nums
 * @return {boolean}
217. 存在重复元素
    给定一个整数数组，判断是否存在重复元素。
    如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
示例 1:
    输入: [1,2,3,1]
    输出: true
示例 2:
    输入: [1,2,3,4]
    输出: false
示例 3:
    输入: [1,1,1,3,3,4,3,2,4,2]
    输出: true
 */
var containsDuplicate = function(nums) {
    let hash = {}
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(hash[num]) return true
        hash[num] = true
    }
    return false
};

var containsDuplicate = function(nums) {
    nums.sort()
    for (let i = 1; i < nums.length; i++) {
        if(nums[i-1] == nums[i]) return true
    }
    return false
};

var containsDuplicate = function(nums) {
    for(var i = 0; i < nums.length - 1; i++) 
        for(var j = i + 1; j < nums.length; j++) 
            if (nums[i] === nums[j]) return true
    return false
};

console.log(containsDuplicate([1, 2, 3, 1]))
console.log(containsDuplicate([1,2,3,4]))
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))
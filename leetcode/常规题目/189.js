/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 17:22:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 17:32:28
 * @FilePath: /js-demo/leetcode/189.js
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
    189. 旋转数组
        给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
    进阶：
        尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
        你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
    示例 1:
        输入: nums = [1,2,3,4,5,6,7], k = 3
        输出: [5,6,7,1,2,3,4]
    解释:
        向右旋转 1 步: [7,1,2,3,4,5,6]
        向右旋转 2 步: [6,7,1,2,3,4,5]
        向右旋转 3 步: [5,6,7,1,2,3,4]
    示例 2:
        输入：nums = [-1,-100,3,99], k = 2
        输出：[3,99,-1,-100]
    解释: 
        向右旋转 1 步: [99,-1,-100,3]
        向右旋转 2 步: [3,99,-1,-100]
    提示：
        1 <= nums.length <= 2 * 104
        -231 <= nums[i] <= 231 - 1
        0 <= k <= 105
 */

let reverse = (nums, start, end) => {
    while(start < end){
        let temp = nums[start]
        nums[start] = nums[end]
        nums[end] = temp
        start++
        end--
    }
}

var rotate = function(nums, k) {
    k %= nums.length
    if(k == 0) return nums
    reverse(nums, 0, nums.length - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, nums.length - 1)
    return nums
};

console.log(rotate([1,2,3,4,5,6,7], 7))
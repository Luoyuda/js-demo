/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 16:18:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 16:21:50
 * @FilePath: /js-demo/leetcode/常规题目/219.js
 */
/*
219. 存在重复元素 II
    给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，
    使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。
示例 1:
    输入: nums = [1,2,3,1], k = 3
    输出: true
示例 2:
    输入: nums = [1,0,1,1], k = 1
    输出: true
示例 3:
    输入: nums = [1,2,3,1,2,3], k = 2
    输出: false
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let set = new Set()
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(set.has(num)) return true
        set.add(num)
        if(set.size > k){
            set.delete(nums[i - k])
        }
    }
    return false
};

console.log(containsNearbyDuplicate([1,2,3,1], 3))
console.log(containsNearbyDuplicate([1,0,1,1], 1))
console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2))
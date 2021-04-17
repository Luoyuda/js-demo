/*
 * @Author: xiaohuolong
 * @Date: 2021-04-17 07:58:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 08:09:23
 * @FilePath: /js-demo/leetcode/常规题目/220.js
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
220. 存在重复元素 III
    给你一个整数数组 nums 和两个整数 k 和 t 。
    请你判断是否存在两个下标 i 和 j，使得
    abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
    如果存在则返回 true，不存在返回 false。
示例 1：
    输入：nums = [1,2,3,1], k = 3, t = 0
    输出：true
示例 2：
    输入：nums = [1,0,1,1], k = 1, t = 2
    输出：true
示例 3：
    输入：nums = [1,5,9,1,5,9], k = 2, t = 3
    输出：false
提示：
    0 <= nums.length <= 2 * 104
    -231 <= nums[i] <= 231 - 1
    0 <= k <= 104
    0 <= t <= 231 - 1
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i - k; j < i + k; j++) {
            if(j < 0 || j == i) continue;
            if(j >= nums.length) break; 
            if(Math.abs(nums[i] - nums[j]) <= t){
                // console.log(nums[i], i, nums[j], j);
                return true
            }
        }
    }
    return false
};
let params = [
    [[1,2,3,1], 3, 0],
    [[1,0,1,1], 1, 2],
    [[1,5,9,1,5,9], 2, 3]
]
let result = [
    true,
    true,
    false
]
params.forEach((item, index) => {
    console.log(containsNearbyAlmostDuplicate(...item))
})
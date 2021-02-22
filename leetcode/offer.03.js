/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 08:07:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 08:20:00
 * @FilePath: /js-demo/leetcode/offer.03.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    剑指 Offer 03. 数组中重复的数字
        找出数组中重复的数字。
        在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
    示例 1：
        输入：
            [2, 3, 1, 0, 2, 5, 3]
        输出：2 或 3 
 */
// 遍历
var findRepeatNumber = function(nums) {
    let vis = {}
    let result = null
    for (let i = 0; i < nums.length; i++) {
        let element = nums[i];
        if(vis[element]) {
            result = element
            break
        }else{
            vis[element] = true
        }
    }
    return result
};
// 原地交换
var findRepeatNumber = function(nums) {
    let i = 0
    while(i < nums.length){
        if(nums[i] == i){
            i += 1
            continue
        }else{
            if(nums[nums[i]] == nums[i]) return nums[i]
            let temp = nums[i]
            nums[i] = nums[nums[i]]
            nums[temp] = temp
        }
    }
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]))
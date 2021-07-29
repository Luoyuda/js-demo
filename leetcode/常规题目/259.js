/*
 * @Author: xiaohuolong
 * @Date: 2021-07-28 21:44:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-28 21:44:45
 * @FilePath: /js-demo/leetcode/常规题目/259.js
 */
/*
259. 较小的三数之和
    给定一个长度为 n 的整数数组和一个目标值 target，寻找能够使条件 nums[i] + nums[j] + nums[k] < target 成立的三元组  i, j, k 个数（0 <= i < j < k < n）。
示例：
    输入: nums = [-2,0,1,3], target = 2
    输出: 2 
    解释: 因为一共有两个三元组满足累加和小于 2:
        [-2,0,1]
        [-2,0,3]
    进阶：是否能在 O(n2) 的时间复杂度内解决？
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumSmaller = function(nums, target) {
    nums.sort((a, b) => a - b)
    let ans = 0
    for(let i = 0; i < nums.length - 2; i++){
        ans += twoSumSmaller(nums, i + 1, target - nums[i])
    }
    return ans
};

var twoSumSmaller = function(nums, l, target){
    let ans = 0
    let r = nums.length - 1
    while(l < r){
        if(nums[l] + nums[r] < target){
            ans += r - l
            l++
        }else{
            r--
        }
    }
    return ans
}

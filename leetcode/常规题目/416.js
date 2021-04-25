/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 09:57:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 10:39:11
 * @FilePath: /js-demo/leetcode/常规题目/416.js
 */
/* 
416. 分割等和子集
    给你一个 只包含正整数 的 非空 数组 nums 。
    请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
示例 1：
    输入：nums = [1,5,11,5]
    输出：true
    解释：数组可以分割成 [1, 5, 5] 和 [11] 。
示例 2：
    输入：nums = [1,2,3,5]
    输出：false
    解释：数组不能分割成两个元素和相等的子集。
提示：
    1 <= nums.length <= 200
    1 <= nums[i] <= 100
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    // dp[i][j] 第i个之前第能否凑到j
    let sum = 0
    for (const num of nums) {
        sum += num
    }
    // 如果和为奇数，永远无法凑到
    if((sum & 1) == 1) return false
    let target = sum / 2
    let len = nums.length
    let dp = new Array(len)
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(target + 1).fill(false)
    }
    if(nums[0] <= target) dp[0][nums[0]] = true
    for (let i = 1; i < len; i++) {
        for (let j = 0; j <= target; j++) {
            dp[i][j] = dp[i - 1][j]
            if(nums[i] == j){
                dp[i][j] = true
            }else if(nums[i] < j){
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
            }
        }
    }
    // console.log(dp)
    return dp[len - 1][target]
};
var canPartition = function(nums) {
    // dp[i][j] 第i个之前第能否凑到j
    let sum = 0
    for (const num of nums) {
        sum += num
    }
    // 如果和为奇数，永远无法凑到
    if((sum & 1) == 1) return false
    let target = sum / 2
    let len = nums.length
    let dp = new Array(target + 1).fill(false)
    dp[0] = true
    if(nums[0] <= target) dp[nums[0]] = true
    for (let i = 1; i < len; i++) {
        for (let j = target; j >= 0 && j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j - nums[i]]
        }
    }
    // console.log(dp)
    return dp[target]
};

console.log(canPartition([1,5,11,5]))
console.log(canPartition([1,2,3,5]))
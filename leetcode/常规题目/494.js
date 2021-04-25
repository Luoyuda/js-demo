/*
 * @Author: xiaohuolong
 * @Date: 2021-04-22 21:07:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 19:45:43
 * @FilePath: /js-demo/leetcode/常规题目/494.js
 */
/*
494. 目标和
    给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。
    对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。
    返回可以使最终数组和为目标数 S 的所有添加符号的方法数。
示例：
    输入：nums: [1, 1, 1, 1, 1], S: 3
    输出：5
解释：
    -1+1+1+1+1 = 3
    +1-1+1+1+1 = 3
    +1+1-1+1+1 = 3
    +1+1+1-1+1 = 3
    +1+1+1+1-1 = 3
一共有5种方法让最终目标和为3。
提示：
    数组非空，且长度不会超过 20 。
    初始的数组的和不会超过 1000 。
    保证返回的最终结果能被 32 位整数存下。
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    let count = 0
    let dfs = (i, sum) => {
        if(i == nums.length){
            if(sum == target){
                count++
            }
        }else{
            dfs(i + 1, sum + nums[i])
            dfs(i + 1, sum - nums[i])
        }
    }
    dfs(0, 0)
    return count
};

var findTargetSumWays = function(nums, target){
    let sum = 0
    for (const num of nums) {
        sum += num
    }
    if(target > sum || ((target + sum) % 2 == 1)) return 0
    target = (target + sum) / 2
    let dp = new Array(target + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < nums.length; i++) {
        for (let j = target; j >= nums[i]; j--) {
            dp[j] = dp[j] + dp[j-nums[i]]
        }
    }
    return dp[target]
}
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3))
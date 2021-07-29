/*
 * @Author: xiaohuolong
 * @Date: 2021-07-24 14:25:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-24 14:31:40
 * @FilePath: /js-demo/leetcode/常规题目/643.js
 */
/*
643. 子数组最大平均数 I
    给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。
示例：
    输入：[1,12,-5,-6,50,3], k = 4
    输出：12.75
    解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
提示：
    1 <= k <= n <= 30,000。
    所给数据范围 [-10,000，10,000]。
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let sum = 0;
    let n = nums.length
    for(let i = 0; i < k; i++){
        sum += nums[i]
    }
    let max = sum
    for(let i = k; i < n; i++){
        sum = sum - nums[i - k] + nums[i]
        max = Math.max(max, sum)
    }
    return max / k
};
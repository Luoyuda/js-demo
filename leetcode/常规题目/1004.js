/*
 * @Author: xiaohuolong
 * @Date: 2021-07-26 08:12:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-29 18:24:04
 * @FilePath: /js-demo/leetcode/常规题目/1004.js
 */
/*
1004. 最大连续1的个数 III
给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 K 个值从 0 变成 1 。
返回仅包含 1 的最长（连续）子数组的长度。
示例 1：
    输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
    输出：6
    解释： 
    [1,1,1,0,0,1,1,1,1,1,1]
    粗体数字从 0 翻转到 1，最长的子数组长度为 6。
示例 2：
    输入：A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
    输出：10
    解释：
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
    粗体数字从 0 翻转到 1，最长的子数组长度为 10。
提示：
    1 <= A.length <= 20000
    0 <= K <= A.length
    A[i] 为 0 或 1 
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    let l = r = count = ans = 0
    let n = nums.length
    while(r < n){
        if(nums[r] === 0){
            count++
        }
        r++
        while(count > k){
            if(nums[l] === 0){
                count--
            }
            l++
        }
        ans = Math.max(ans, r - l)
    }
    return ans
};
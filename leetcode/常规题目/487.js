/*
 * @Author: xiaohuolong
 * @Date: 2021-07-26 07:56:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-26 07:57:20
 * @FilePath: /js-demo/leetcode/常规题目/487.js
 */
/*
487. 最大连续1的个数 II
    给定一个二进制数组，你可以最多将 1 个 0 翻转为 1，找出其中最大连续 1 的个数。
示例 1：
    输入：[1,0,1,1,0]
    输出：4
    解释：翻转第一个 0 可以得到最长的连续 1。
        当翻转以后，最大连续 1 的个数为 4。
注：
    输入数组只包含 0 和 1.
    输入数组的长度为正整数，且不超过 10,000
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let l = r = 0
    let n = nums.length
    let zero = -1
    let ans = 1
    while(r < n){
        if(nums[r] === 0){
            if(zero === -1){
                zero = r
            }else{
                ans = Math.max(ans, r - l)
                l = zero + 1
                zero = r
            }
        }
        r++
    }
    ans = Math.max(ans, r - l)
    return ans
};
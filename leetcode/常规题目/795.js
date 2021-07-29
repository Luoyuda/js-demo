/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 15:25:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 15:26:29
 * @FilePath: /js-demo/leetcode/常规题目/795.js
 */
/*
795. 区间子数组个数
    给定一个元素都是正整数的数组A ，正整数 L 以及 R (L <= R)。
    求连续、非空且其中最大元素满足大于等于L 小于等于R的子数组个数。
例如 :
输入: 
    A = [2, 1, 4, 3]
    L = 2
    R = 3
    输出: 3
    解释: 满足条件的子数组: [2], [2, 1], [3].
注意:
    L, R  和 A[i] 都是整数，范围在 [0, 10^9]。
    数组 A 的长度范围在[1, 50000]。
*/
/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var numSubarrayBoundedMax = function(nums, left, right) {
    return find(nums, right) - find(nums, left - 1)
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var find = function(nums, k) {
    let l = r = 0
    let n = nums.length
    let res = 0
    while(r < n){
        if(nums[r] > k){
            l = r + 1
        }
        r++
        res += r - l
    }
    return res
};

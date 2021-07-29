/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 21:31:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 21:32:17
 * @FilePath: /js-demo/leetcode/常规题目/992.js
 */
/*
992. K 个不同整数的子数组
    给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定不同的子数组为好子数组。
    （例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）
    返回 A 中好子数组的数目。
示例 1：
    输入：A = [1,2,1,2,3], K = 2
    输出：7
    解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
示例 2：
    输入：A = [1,2,1,3,4], K = 3
    输出：3
    解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
提示：
    1 <= A.length <= 20000
    1 <= A[i] <= A.length
    1 <= K <= A.length
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function(nums, k) {
    return findSubK(nums, k) - findSubK(nums, k - 1)
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findSubK = function(nums, k) {
    let l = r = res = 0
    let count = 0
    let n = nums.length
    let freq = new Array(n + 1).fill(0)
    while(r < n){
        if(freq[nums[r]] === 0){
            count++
        }
        freq[nums[r]]++
        r++
        while(count > k){
            freq[nums[l]]--
            if(freq[nums[l]] === 0) count--
            l++
        }
        res += r - l
    }
    return res
};


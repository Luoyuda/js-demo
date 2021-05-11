/*
 * @Author: xiaohuolong
 * @Date: 2021-05-08 15:24:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-08 15:28:36
 * @FilePath: /js-demo/leetcode/常规题目/485.js
 */
/*
485. 最大连续 1 的个数
    给定一个二进制数组， 计算其中最大连续 1 的个数。
示例：
    输入：[1,1,0,1,1,1]
    输出：3
    解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let sum = 0
    let n = nums.length
    let i = j = 0
    while(j < n){
        while(j < n && nums[j] == 1) j++
        sum = Math.max(j - i, sum)
        j++
        i = j
    }
    return sum
};

console.log(findMaxConsecutiveOnes([1,1,0,1,1,0]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 20:25:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-06 20:35:49
 * @FilePath: /js-demo/leetcode/常规题目/674.js
 */
/**
 * @param {number[]} nums
 * @return {number}
674. 最长连续递增序列
    给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
    连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，
    都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., 
    nums[r - 1], nums[r]] 就是连续递增子序列。
示例 1：
    输入：nums = [1,3,5,4,7]
    输出：3
    解释：最长连续递增序列是 [1,3,5], 长度为3。
    尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
示例 2：
    输入：nums = [2,2,2,2,2]
    输出：1
    解释：最长连续递增序列是 [2], 长度为1。
提示：
    0 <= nums.length <= 104
    -109 <= nums[i] <= 109
 */
var findLengthOfLCIS = function(nums) {
    let length = nums.length
    if(!length) return []
    let i = 0
    let max = 0
    while(i < length) {
        let temp = i
        let j = i + 1
        while(j < nums.length){
            if(nums[j] > nums[i]){
                i++
                j++
            }else {
                break
            }
        }
        max = Math.max(max, j - temp)
        i = j
    }
    return max
};

console.log(findLengthOfLCIS([1, 3, 5, 4, 7]))
console.log(findLengthOfLCIS([2,2,2,2,2]))
console.log(findLengthOfLCIS([1, 2, 3, 4, 5]))
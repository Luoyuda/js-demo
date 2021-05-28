/*
 * @Author: xiaohuolong
 * @Date: 2021-05-25 11:01:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-25 11:01:59
 * @FilePath: /js-demo/leetcode/常规题目/128.js
 */
/*
128. 最长连续序列
    给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
    进阶：你可以设计并实现时间复杂度为 O(n) 的解决方案吗？
示例 1：
    输入：nums = [100,4,200,1,3,2]
    输出：4
    解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：
    输入：nums = [0,3,7,2,5,8,4,6,0,1]
    输出：9
提示：
    0 <= nums.length <= 104
    -109 <= nums[i] <= 109
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let n = nums.length
    if(!n) return 0
    let set = new Set()
    for(let num of nums) set.add(num)
    let max = 1
    for(let i = 0; i < n; i++){
        if(!set.has(nums[i] - 1)){
            let curr = nums[i] + 1
            let ans = 1
            while(set.has(curr)){
                ans++
                curr++
            }
            max = Math.max(ans, max)
        }
    }
    return max
};
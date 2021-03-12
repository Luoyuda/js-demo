/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 20:37:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 07:55:09
 * @FilePath: /js-demo/leetcode/offer.59.1.js
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
剑指 Offer 59 - I. 滑动窗口的最大值
    给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
示例:
    输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
    输出: [3,3,5,5,6,7] 
解释: 
    滑动窗口的位置                最大值
    ---------------               -----
    [1  3  -1] -3  5  3  6  7       3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7
提示：
    你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。
 */
var maxSlidingWindow = function(nums, k) {
    let len = nums.length
    let res = []
    if(!len || k == 0) return res
    let deque = []
    for (let j = 0, i = 1 - k; j < nums.length; i++, j++) {
        if(i > 0 && deque[0] == nums[i - 1]){
            deque.shift()
        }
        // console.log(i, j,nums[j], nums[j - 1], deque)
        while(deque.length && (deque[deque.length - 1] < nums[j])){
            deque.pop()
        }
        deque.push(nums[j])
        // console.log(deque)
        if(i >= 0){
            res.push(deque[0])
        }
    }
    return res
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 21:44:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 22:05:13
 * @FilePath: /js-demo/leetcode/常规题目/1365.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 * 1365. 有多少小于当前数字的数字
    给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。
    换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。
    以数组形式返回答案。
示例 1：
    输入：nums = [8,1,2,2,3]
    输出：[4,0,1,1,3]
解释： 
    对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。 
    对于 nums[1]=1 不存在比它小的数字。
    对于 nums[2]=2 存在一个比它小的数字：（1）。 
    对于 nums[3]=2 存在一个比它小的数字：（1）。 
    对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
示例 2：
    输入：nums = [6,5,4,8]
    输出：[2,1,0,3]
示例 3：
    输入：nums = [7,7,7,7]
    输出：[0,0,0,0]
提示：
    2 <= nums.length <= 500
    0 <= nums[i] <= 100
 */
var smallerNumbersThanCurrent = function(nums) {
    let cnt = new Array(101).fill(0)
    for (let i = 0; i < nums.length; i++) {
        cnt[nums[i]] += 1
    }
    for (let i = 1; i < cnt.length; i++) {
        cnt[i] += cnt[i - 1]
    }
    // console.log(cnt)
    let ret = []
    for (let i = 0; i < nums.length; i++) {
        ret.push(nums[i] ? cnt[nums[i] - 1] : 0)
    }
    return ret
};
// 计数排序
var smallerNumbersThanCurrent = function(nums) {
    let cnt = []
    for (let i = 0; i < nums.length; i++) {
        cnt[nums[i]] = (cnt[nums[i]] || 0) + 1
    }
    let ret = []
    for (let i = 0; i < cnt.length; i++) {
        let count = cnt[i]
        if(count > 0){
            for (let j = 0; j < count; j++) {
                ret.push(i)
            }
        }
    }
    return ret
};
console.log(smallerNumbersThanCurrent([8,1,2,2,1]))
console.log(smallerNumbersThanCurrent([6,5,4,8]))
console.log(smallerNumbersThanCurrent([7,7,7,7]))
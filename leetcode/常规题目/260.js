/*
 * @Author: xiaohuolong
 * @Date: 2021-03-14 13:54:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 08:55:02
 * @FilePath: /js-demo/leetcode/常规题目/260.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
260. 只出现一次的数字 III
    给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。
    找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。
    进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？
示例 1：
    输入：nums = [1,2,1,3,2,5]
    输出：[3,5]
    解释：[5, 3] 也是有效的答案。
示例 2：
    输入：nums = [-1,0]
    输出：[-1,0]
示例 3：
    输入：nums = [0,1]
    输出：[1,0]
提示：
    2 <= nums.length <= 3 * 104
    -231 <= nums[i] <= 231 - 1
    除两个只出现一次的整数外，nums 中的其他数字都出现两次
*/
var singleNumber = function(nums) {
    let n = 0
    let x = 0
    let y = 0
    let m = 1
    for (let i = 0; i < nums.length; i++) n ^= nums[i]
    while((m & n) == 0) m <<= 1
    for (let i = 0; i < nums.length; i++) {
        if((m & nums[i]) == 0) x ^= nums[i]
        else y ^= nums[i]
    }
    return [x, y]
};

var singleNumber = function(nums) {
    let s = 0
    for(num of nums) s ^= num
    let k = 0
    while(!(s >> k & 1)) k++
    let x = 0
    for(num of nums){
        if(num >> k & 1){
            x ^= num
        }
    }
    return [x, x^s]
};

console.log(singleNumber([1,2,1,3,2,5]))
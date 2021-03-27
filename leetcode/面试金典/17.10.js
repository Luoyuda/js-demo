/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 08:21:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 08:35:46
 * @FilePath: /js-demo/leetcode/面试金典/17.10.js
 */
/**
 * @param {number[]} nums
 * @return {number}
面试题 17.10. 主要元素
    数组中占比超过一半的元素称之为主要元素。给定一个整数数组，找到它的主要元素。若没有，返回-1。
示例 1：
    输入：[1,2,5,9,5,9,5,5,5]
    输出：5
示例 2：
    输入：[3,2]
    输出：-1
示例 3：
    输入：[2,2,1,1,1,2,2]
    输出：2
说明：
    你有办法在时间复杂度为 O(N)，空间复杂度为 O(1) 内完成吗？
 */
var majorityElement = function(nums) {
    let result = -1
    let vote = 0
    for (let i = 0; i < nums.length; i++) {
        if(vote == 0){
            result = nums[i]
            vote = 1
        }else{
            if(nums[i] != result)vote--
            else vote++
        }
    }
    if (vote > 0){
        let n = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == result) n++
        }
        if (n > nums.length/2)
        return result;
    }
    // console.log(result, vote)
    return -1
};

console.log(majorityElement([1,2,5,9,5,9,5,5,5]))
console.log(majorityElement([3, 2]))
console.log(majorityElement([6, 5,5]))
console.log(majorityElement([2,2,1,1,1,2,2]))
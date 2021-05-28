/*
 * @Author: xiaohuolong
 * @Date: 2021-03-24 08:57:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-11 22:01:30
 * @FilePath: /js-demo/leetcode/常规题目/456.js
 */
/**
 * @param {number[]} nums
 * @return {boolean}
456. 132模式
    给定一个整数序列：a1, a2, ..., an，一个132模式的子序列 ai, aj, ak 被定义为：当 i < j < k 时，ai < ak < aj。设计一个算法，当给定有 n 个数字的序列时，验证这个序列中是否含有132模式的子序列。
    注意：n 的值小于15000。
示例1:
    输入: [1, 2, 3, 4]
    输出: False
    解释: 序列中不存在132模式的子序列。
示例 2:
    输入: [3, 1, 4, 2]
    输出: True
    解释: 序列中有 1 个132模式的子序列： [1, 4, 2].
示例 3:
    输入: [-1, 3, 2, 0]
    输出: True
    解释: 序列中有 3 个132模式的的子序列: [-1, 3, 2], [-1, 3, 0] 和 [-1, 2, 0].
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    let s3 = -Infinity
    let stack = []
    for(let i = nums.length - 1; i >= 0; i--){
        if(nums[i] < s3) return true
        while(stack.length && nums[stack[stack.length - 1]] < nums[i]){
            s3 = Math.max(s3, nums[stack.pop()])
        }
        stack.push(i)
    }
    return false
};
console.log(find132pattern([-1, 3, 2, 0]))
console.log(find132pattern([1, 2, 3, 4]))
console.log(find132pattern([3, 1, 4, 2]))
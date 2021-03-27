/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 18:38:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 18:46:36
 * @FilePath: /js-demo/leetcode/常规题目/503.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
503. 下一个更大元素 II
    给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），
    输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，
    这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。
示例 1:
    输入: [1,2,1]
    输出: [2,-1,2]
    解释: 第一个 1 的下一个更大的数是 2；
    数字 2 找不到下一个更大的数； 
    第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
    注意: 输入数组的长度不会超过 10000。
 */
var nextGreaterElements = function(nums) {
    let stack = []
    let n = nums.length
    let res = new Array(n).fill(-1)
    for (let i = 0; i < n * 2 - 1; i++) {
        while(stack.length && nums[stack[stack.length - 1]] < nums[i % n]){
            res[stack[stack.length - 1]] = nums[i % n]
            stack.pop()
        }
        stack.push(i % n)
    }
    return res
};
console.log(nextGreaterElements([1,2,1,3,2,1,3]))
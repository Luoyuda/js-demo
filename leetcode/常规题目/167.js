/*
 * @Author: xiaohuolong
 * @Date: 2020-07-20 16:25:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 11:16:50
 * @FilePath: /js-demo/leetcode/常规题目/167.js
 */ 
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0
    let right = numbers.length - 1
    while (left < right) {
        let sum = numbers[left] + numbers[right]
        if(sum == target) return [++left, ++right]
        if(sum < target) {
            left++
        }else if(sum > target) {
            right--
        }
    }
    return []
};
console.log(twoSum([2, 7, 11, 15], 9))
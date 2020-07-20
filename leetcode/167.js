/*
 * @Author: xiaohuolong
 * @Date: 2020-07-20 16:25:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-20 16:37:26
 * @FilePath: /js-demo/leetcode/167.js
 */ 
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let low = 0
    let high = numbers.length - 1
    while (low < high) {
        let sum = numbers[low] + numbers[high]
        if(sum == target) {
            ++low
            ++high
            break
        }else if(sum < target) {
            ++low
        }else{
            --high
        }
    }
    if(high <= low) return []
    return [low, high]
};
console.log(twoSum([2, 7, 11, 15], 10))
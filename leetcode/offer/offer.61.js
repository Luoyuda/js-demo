/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 08:28:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 08:30:54
 * @FilePath: /js-demo/leetcode/offer.61.js
 */
/**
 * @param {number[]} nums
 * @return {boolean}
    剑指 Offer 61. 扑克牌中的顺子
        从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
        2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
    示例 1:
        输入: [1,2,3,4,5]
        输出: True
    示例 2:
        输入: [0,0,1,2,5]
        输出: True
    限制：
        数组长度为 5 
        数组的数取值为 [0, 13] .
 */
var isStraight = function(nums) {
    let set = new Set()
    let max = 0
    let min = 14
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(num == 0) continue
        if(set.has(num)) return false
        set.add(num)
        max = Math.max(max, num)
        min = Math.min(min, num)
    }
    return max - min < 5
};

console.log(isStraight([1,2,3,4,5]))
console.log(isStraight([0,0,1,4,5]))
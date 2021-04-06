/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 18:32:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 18:41:05
 * @FilePath: /js-demo/leetcode/常规题目/1748.js
 */
/**
 * @param {number[]} nums
 * @return {number}
1748. 唯一元素的和
    给你一个整数数组 nums 。数组中唯一元素是那些只出现 恰好一次 的元素。
    请你返回 nums 中唯一元素的 和 。
示例 1：
    输入：nums = [1,2,3,2]
    输出：4
    解释：唯一元素为 [1,3] ，和为 4 。
示例 2：
    输入：nums = [1,1,1,1,1]
    输出：0
    解释：没有唯一元素，和为 0 。
示例 3 ：
    输入：nums = [1,2,3,4,5]
    输出：15
    解释：唯一元素为 [1,2,3,4,5] ，和为 15 。
提示：
    1 <= nums.length <= 100
    1 <= nums[i] <= 100
 */
var sumOfUnique = function(nums) {
    let res = new Array(101).fill(0)
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        res[nums[i]] += 1
    }
    for (let i = 0; i < res.length; i++) {
        if(res[i] == 1){
            sum += i
        }
    }
    return sum
};

console.log(sumOfUnique([1, 2, 3, 2]))
console.log(sumOfUnique([1, 1, 1, 1, 1]))
console.log(sumOfUnique([1, 2, 3, 4, 5]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 17:45:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 17:52:25
 * @FilePath: /js-demo/leetcode/面试金典/17.16.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    面试题 17.16. 按摩师
        一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。
        在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。
        给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。
    示例 1：
        输入： [1,2,3,1]
        输出： 4
        解释： 选择 1 号预约和 3 号预约，总时长 = 1 + 3 = 4。
    示例 2：
        输入： [2,7,9,3,1]
        输出： 12
        解释： 选择 1 号预约、 3 号预约和 5 号预约，总时长 = 2 + 9 + 1 = 12。
    示例 3：
        输入： [2,1,4,5,3,1,1,3]
        输出： 12
        解释： 选择 1 号预约、 3 号预约、 5 号预约和 8 号预约，总时长 = 2 + 4 + 3 + 3 = 12。
 */
var massage = function(nums) {
    // dp[x] = Math.max(dp[x-1], dp[x-2] + nums[x])
    if(!nums || !nums.length) return 0
    let prev = 0
    let curr = nums[0]
    // let max = 0
    for (let i = 1; i < nums.length; i++) {
        let temp = Math.max(curr, prev + nums[i])
        prev = curr
        curr = temp
    }
    // console.log(curr, prev)
    return curr
};

console.log(massage([2,1,4,5,3,1,1,3]))
console.log(massage([1,2,3,1]))
console.log(massage([2,7,9,3,1]))
console.log(massage([1]))
console.log(massage([]))
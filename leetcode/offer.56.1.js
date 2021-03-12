/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 17:28:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 18:00:44
 * @FilePath: /js-demo/leetcode/offer.56.1.js
 */
/**
 * singleNumbers
 * @param {*} nums 
    剑指 Offer 56 - I. 数组中数字出现的次数
        一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。
        请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。
    示例 1：
        输入：nums = [4,1,4,6]
        输出：[1,6] 或 [6,1]
    示例 2：
        输入：nums = [1,2,10,4,1,4,3,3]
        输出：[2,10] 或 [10,2]
    限制：
        2 <= nums.length <= 10000
*/
var singleNumbers = (nums) => {
    let n = 0
    let x = 0
    let y = 0
    let m = 1
    for (let i = 0; i < nums.length; i++) n ^= nums[i];
    while((m & n) == 0) m <<= 1
    for (let i = 0; i < nums.length; i++) {
        if((m & nums[i]) == 0) x ^= nums[i]
        else y ^= nums[i]
    }
    return [x, y]
}

console.log(singleNumbers([3,3,1,4,4,6]))
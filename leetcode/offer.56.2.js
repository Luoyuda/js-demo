/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 17:28:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 18:06:30
 * @FilePath: /js-demo/leetcode/offer.56.2.js
 */
/**
 * singleNumbers
 * @param {*} nums 
    剑指 Offer 56 - II. 数组中数字出现的次数 II
        在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
    示例 1：
        输入：nums = [3,4,3,3]
        输出：4
    示例 2：
        输入：nums = [9,1,7,9,7,9,7]
        输出：1
    限制：
        1 <= nums.length <= 10000
        1 <= nums[i] < 2^31
*/
var singleNumbers = (nums) => {
    let ones = 0, twos = 0;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        ones = ones ^ num & ~twos;
        twos = twos ^ num & ~ones;   
    }
    return ones;
}

console.log(singleNumbers([9,3,7,9,7,9,7]))
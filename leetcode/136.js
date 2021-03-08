/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 17:39:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 17:49:21
 * @FilePath: /js-demo/leetcode/136.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    136. 只出现一次的数字
        给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
    说明：
        你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
    示例 1:
        输入: [2,2,1]
        输出: 1
    示例 2:
        输入: [4,1,2,1,2]
        输出: 4
 */
var singleNumber = function(nums) {
    let ans = nums[0]
    for (let i = 1; i < nums.length; i++) {
        ans = ans ^ nums[i]
    }
    return ans
};

var singleNumber = function(nums) {
    nums.sort((a, b) => a - b)
    // console.log(nums)
    let last = nums[0]
    for (let i = 1; i < nums.length - 1; i++) {
        // console.log(last, nums[i])
        if(last == nums[i]){
            last = nums[i + 1]
            i += 1
        }else{
            return last
        }
    }
    return last
};

console.log(singleNumber([4,1,2,1,2]))
console.log(singleNumber([2, 2, 1]))
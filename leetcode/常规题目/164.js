/*
 * @Author: xiaohuolong
 * @Date: 2021-05-02 15:25:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-02 15:44:03
 * @FilePath: /js-demo/leetcode/常规题目/164.js
 */
/*
164. 最大间距
    给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
    如果数组元素个数小于 2，则返回 0。
示例 1:
    输入: [3,6,9,1]
    输出: 3
    解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
示例 2:
    输入: [10]
    输出: 0
    解释: 数组元素个数小于 2，因此返回 0。
说明:
    你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
    请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    if(nums.length <= 1) return 0
    radixSort(nums)
    console.log(nums)
    let max = 0
    for (let i = 1; i < nums.length; i++) {
        max = Math.max(max, nums[i] - nums[i - 1])
    }
    return max
};

var radixSort = function(nums){
    let max = nums[0]
    let n = nums.length
    for (let i = 1; i < n; i++) {
        max = Math.max(max, nums[i])
    }
    let maxDigit = 0
    while (max != 0){
        maxDigit++
        max = Math.floor(max / 10)
    }
    let dev = 1
    let counting = new Array(10).fill(0)
    let result = new Array(n)
    for (let i = 0; i < maxDigit; i++) {
        for (const x of nums) {
            // console.log(x, dev, x/dev, parseInt(x / dev), dev > x)
            let radix = dev <= x ? parseInt(x / dev) % 10 : 0
            counting[radix]++
        }
        // console.log(counting)
        for (let j = 1; j < counting.length; j++) {
            counting[j] += counting[j - 1]
        }
        for (let j = n - 1; j >= 0; j--) {
            let radix = dev <= nums[j] ? parseInt(nums[j] / dev) % 10 : 0
            result[--counting[radix]] = nums[j]
        }
        for (let j = 0; j < n; j++) {
            nums[j] = result[j]
        }
        counting.fill(0)
        dev *= 10
    }
    return nums
}

console.log(maximumGap([3,6,9,1]))
console.log(maximumGap([1,10000000]))
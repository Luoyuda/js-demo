/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 09:56:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 11:26:58
 * @FilePath: /js-demo/leetcode/常规题目/1588.js
 */
/**
 * @param {number[]} arr
 * @return {number}
1588. 所有奇数长度子数组的和
    给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。
    子数组 定义为原数组中的一个连续子序列。
    请你返回 arr 中 所有奇数长度子数组的和 。
示例 1：
    输入：arr = [1,4,2,5,3]
    输出：58
    解释：所有奇数长度子数组和它们的和为：
    [1] = 1
    [4] = 4
    [2] = 2
    [5] = 5
    [3] = 3
    [1,4,2] = 7
    [4,2,5] = 11
    [2,5,3] = 10
    [1,4,2,5,3] = 15
    我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58
示例 2：
    输入：arr = [1,2]
    输出：3
    解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。
示例 3：
    输入：arr = [10,11,12]
    输出：66
提示：
    1 <= arr.length <= 100
    1 <= arr[i] <= 1000
 */
var sumOddLengthSubarrays = function(arr) {
    let len = arr.length
    let res = 0
    for (let i = 0; i < len; i++) {
        let leftOdd = Math.floor((i + 1) / 2)
        let leftEven = Math.floor(i/2) + 1
        let rightOdd = Math.floor((len - i) / 2)
        let rightEven = Math.floor((len - 1 - i) / 2) + 1
        // console.log(leftEven, leftOdd, rightEven, rightOdd)
        res += arr[i] * (leftOdd * rightOdd + leftEven * rightEven)
    }
    return res
};

console.log(sumOddLengthSubarrays([1,4,2,5,3]))
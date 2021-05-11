/*
 * @Author: xiaohuolong
 * @Date: 2021-05-07 17:37:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 18:02:17
 * @FilePath: /js-demo/leetcode/常规题目/673.js
 */
/*
673. 最长递增子序列的个数
    给定一个未排序的整数数组，找到最长递增子序列的个数。
示例 1:
    输入: [1,3,5,4,7]
    输出: 2
    解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
示例 2:
    输入: [2,2,2,2,2]
    输出: 5
    解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
注意: 给定的数组长度不超过 2000 并且结果一定是32位有符号整数。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
    let n = nums.length
    let dp = new Array(n).fill(1)
    let counts = new Array(n).fill(1)
    let max = 1
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if(nums[i] > nums[j]){
                if(dp[j] + 1 > dp[i]){
                    dp[i] = dp[j] + 1
                    counts[i] = counts[j]
                }else if(dp[j] + 1 == dp[i]){
                    counts[i] += counts[j];
                }
            }
        }
        max = Math.max(max, dp[i])
    }
    let res = 0
    for (let i = 0; i < n; i++) {
        if(dp[i] == max){
            res += counts[i]
        }
    }
    return res
};

let params = [
    [[1,3,5,4,7]],
    [[2,2,2,2,2]],
]

params.forEach(item => {
    console.log(findNumberOfLIS(...item))
})
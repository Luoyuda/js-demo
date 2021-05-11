/*
 * @Author: xiaohuolong
 * @Date: 2021-05-07 14:24:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 15:33:50
 * @FilePath: /js-demo/leetcode/常规题目/410.js
 */
/* 
410. 分割数组的最大值
    给定一个非负整数数组 nums 和一个整数 m ，你需要将这个数组分成 m 个非空的连续子数组。
    设计一个算法使得这 m 个子数组各自和的最大值最小。
示例 1：
    输入：nums = [7,2,5,10,8], m = 2
    输出：18
    解释：
    一共有四种方法将 nums 分割为 2 个子数组。 其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
    因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
示例 2：
    输入：nums = [1,2,3,4,5], m = 2
    输出：9
示例 3：
    输入：nums = [1,4,4], m = 3
    输出：4
提示：
    1 <= nums.length <= 1000
    0 <= nums[i] <= 106
    1 <= m <= min(50, nums.length)
*/
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    // f[i][j] 前i个数分割成j份的最大值
    let n = nums.length
    let f = new Array(n + 1)
    for (let i = 0; i < f.length; i++) {
        f[i] = new Array(m + 1).fill(Infinity)
    }
    let sub = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        sub[i + 1] = sub[i] + nums[i]
    }
    f[0][0] = 0
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, m); j++) {
            for (let k = 0; k < i; k++) {
                f[i][j] = Math.min(f[i][j], Math.max(f[k][j - 1], sub[i] - sub[k]));
            }
        }
    }
    return f[n][m]
};

var splitArray = function(nums, m){
    let left = 0
    let right = 0
    for (let i = 0; i < nums.length; i++) {
        if(nums[i] > left) left = nums[i];
        right += nums[i]
    }
    while (left < right){
        let mid = left + Math.floor((right - left) / 2)
        if(check(nums, mid, m)){
            right = mid
        }else{
            left = mid + 1
        }
    }
    return left
}

var check = function(nums, x, m){
    let cnt = 1
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if(sum + nums[i] > x){
            cnt++
            sum = nums[i]
        }else{
            sum += nums[i]
        }
    }
    return cnt <= m
}

let params = [
    [[7,2,5,10,8], 2],
    [[1,2,3,4,5], 2],
    [[1, 4, 4], 3],
]
params.map(item => {
    console.log(splitArray(...item))
})
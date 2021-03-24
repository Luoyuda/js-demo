/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 18:33:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 18:44:13
 * @FilePath: /js-demo/leetcode/常规题目/303.js
 */
/**
 * @param {number[]} nums
303. 区域和检索 - 数组不可变
    给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。
实现 NumArray 类：
    NumArray(int[] nums) 使用数组 nums 初始化对象
    int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）
    范围内元素的总和，包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
示例：
输入：
    ["NumArray", "sumRange", "sumRange", "sumRange"]
    [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
    [null, 1, -1, -3]
提示：
    0 <= nums.length <= 104
    -105 <= nums[i] <= 105
    0 <= i <= j < nums.length
    最多调用 104 次 sumRange 方法
 */
var NumArray = function(nums) {
    this.dp = []
    this.dp[0] = 0
    for (let i = 0; i < nums.length; i++) {
        this.dp[i+1] = this.dp[i] + nums[i]
    }
    // console.log(this.dp)
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.dp[right+1] - this.dp[left]
};

let num = new NumArray([-2, 0, 3, -5, 2, -1])

let funcs = ["sumRange", "sumRange", "sumRange"]
let params = [[0, 2], [2, 5], [0, 5]]
let result = [1, -1, -3]

for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    // console.log('func ->', func)
    // console.log('params ->', ...params[i])
    // console.log('result ->', result[i])
    let res = num[func](...params[i])
    console.log(res == result[i])
    console.log(res)
}


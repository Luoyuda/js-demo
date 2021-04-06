/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 16:26:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 16:38:50
 * @FilePath: /js-demo/leetcode/面试金典/17.18.js
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 * 面试题 17.19. 消失的两个数字
    给定一个数组，包含从 1 到 N 所有的整数，但其中缺了两个数字。你能在 O(N) 时间内只用 O(1) 的空间找到它们吗？
    以任意顺序返回这两个数字均可。
示例 1:
    输入: [1]
    输出: [2,3]
示例 2:
    输入: [2,3]
    输出: [1,4]
提示：
    nums.length <= 30000
 */
var missingTwo = function(nums) {
    let n = nums.length
    let all = 0
    // 1. 异或当前的数字
    for (let i = 0; i < n; i++) {
        all ^= nums[i]
    }
    // 2. 异或所有的数字
    for (let i = 1; i <= n + 2; i++){
        all ^= i;
    }
    // 3. 找到最低bit
    let b = all & (-all)
    let y = 0
    for (let i = 0; i < n; i++) {
        if(nums[i] & b) y ^= nums[i]
    }
    for (let i = 1; i <= n + 2; i++) {
        if(i & b) y ^= i
    }
    return [y, y ^ all]
}

console.log(missingTwo([1]))
console.log(missingTwo([2,3]))
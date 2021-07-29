/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 12:15:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 12:15:50
 * @FilePath: /js-demo/leetcode/常规题目/1658.js
 */
/*
1658. 将 x 减到 0 的最小操作数
    给你一个整数数组 nums 和一个整数 x 。每一次操作时，你应当移除数组 nums 最左边或最右边的元素，然后从 x 中减去该元素的值。请注意，需要 修改 数组以供接下来的操作使用。
    如果可以将 x 恰好 减到 0 ，返回 最小操作数 ；否则，返回 -1 。
示例 1：
    输入：nums = [1,1,4,2,3], x = 5
    输出：2
    解释：最佳解决方案是移除后两个元素，将 x 减到 0 。
示例 2：
    输入：nums = [5,6,7,8,9], x = 4
    输出：-1
示例 3：
    输入：nums = [3,2,20,1,1,3], x = 10
    输出：5
    解释：最佳解决方案是移除后三个元素和前两个元素（总共 5 次操作），将 x 减到 0 。
提示：
    1 <= nums.length <= 105
    1 <= nums[i] <= 104
    1 <= x <= 109
*/
var minOperations = function(nums, x) {
    let sum = 0
    for(let num of nums) sum += num
    let target = sum - x
    if(target < 0) return -1
    let n = nums.length
    let max = -Infinity
    let left = right = 0
    while(right < n){
        target -= nums[right++]
        while(target < 0) target += nums[left++]
        if(target == 0) max = Math.max(max, right - left)
    }
    return max === -Infinity ? -1 : n - max
};
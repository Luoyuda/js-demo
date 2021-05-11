/*
 * @Author: xiaohuolong
 * @Date: 2021-05-05 09:44:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-05 09:50:03
 * @FilePath: /js-demo/leetcode/常规题目/740.js
 */
/*
740. 删除并获得点数
    给你一个整数数组 nums ，你可以对它进行一些操作。
    每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。
    之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。
    开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。
示例 1：
    输入：nums = [3,4,2]
    输出：6
    解释：
    删除 4 获得 4 个点数，因此 3 也被删除。
    之后，删除 2 获得 2 个点数。总共获得 6 个点数。
示例 2：
    输入：nums = [2,2,3,3,3,4]
    输出：9
    解释：
    删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
    之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
    总共获得 9 个点数。
提示：
    1 <= nums.length <= 2 * 104
    1 <= nums[i] <= 104 
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    let max = 0
    for (const x of nums) {
        max = Math.max(max, x)
    }
    const sum = new Array(max + 1).fill(0)
    for (const x of nums) {
        sum[x] += x
    }
    let first = sum[0]
    let second = Math.max(sum[1], sum[0])
    for (let i = 2; i < sum.length; i++) {
        let temp = second
        second = Math.max(first + sum[i], second)
        first = temp
    }
    return second
};
console.log(deleteAndEarn([2,2,3,3,3,4]))
// var deleteAndEarn = function(nums) {
//     let maxVal = 0;
//     for (const val of nums) {
//         maxVal = Math.max(maxVal, val);
//     }
//     const sum = new Array(maxVal + 1).fill(0);
//     for (const val of nums) {
//         sum[val] += val;
//     }
//     return rob(sum);
// };

// const rob = (nums) => {
//     const size = nums.length;
//     let first = nums[0], second = Math.max(nums[0], nums[1]);
//     for (let i = 2; i < size; i++) {
//         let temp = second;
//         second = Math.max(first + nums[i], second);
//         first = temp;
//     }
//     return second;
// }
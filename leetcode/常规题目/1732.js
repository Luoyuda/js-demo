/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 00:04:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 00:08:10
 * @FilePath: /js-demo/leetcode/常规题目/1732.js
 */
/**
 * @param {number[]} gain
 * @return {number}
1732. 找到最高海拔
    有一个自行车手打算进行一场公路骑行，这条路线总共由 n + 1 个不同海拔的点组成。自行车手从海拔为 0 的点 0 开始骑行。
    给你一个长度为 n 的整数数组 gain ，其中 gain[i] 是点 i 和点 i + 1 的 净海拔高度差（0 <= i < n）。请你返回 最高点的海拔 。
示例 1：
    输入：gain = [-5,1,5,0,-7]
    输出：1
    解释：海拔高度依次为 [0,-5,-4,1,1,-6] 。最高海拔为 1 。
示例 2：
    输入：gain = [-4,-3,-2,-1,4,3,2]
    输出：0
    解释：海拔高度依次为 [0,-4,-7,-9,-10,-6,-3,-1] 。最高海拔为 0 。
提示：
    n == gain.length
    1 <= n <= 100
    -100 <= gain[i] <= 100
 */
var largestAltitude = function(gain) {
    let max = -Infinity
    let sum = 0
    for (let i = 0; i < gain.length; i++) {
        sum += gain[i];
        max = Math.max(max, sum)
    }
    return max < 0 ? 0 : max
};
var gain = [-5,1,5,0,-7]
console.log(largestAltitude(gain))
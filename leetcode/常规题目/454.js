/*
 * @Author: xiaohuolong
 * @Date: 2021-04-19 08:00:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-19 08:09:18
 * @FilePath: /js-demo/leetcode/常规题目/454.js
 */
/*
454. 四数相加 II
    给定四个包含整数的数组列表 A , B , C , D ,
    计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
    为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。
    所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。
例如:
输入:
    A = [ 1, 2]
    B = [-2,-1]
    C = [-1, 2]
    D = [ 0, 2]
输出:
    2
解释:
    两个元组如下:
    1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
    2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let ans = 0
    let countAB = new Map();
    nums1.forEach(a => {
        nums2.forEach(b => {
            countAB.set(a + b, (countAB.get(a + b) || 0) + 1);
        })
    })
    nums3.forEach(c => {
        nums4.forEach(d => {
            let diff = - c - d
            if(countAB.has(diff)){
                ans += countAB.get(diff);
            }
        })
    })
    return ans
};

console.log(fourSumCount(
    [ 1, 2],
    [-2,-1],
    [-1, 2],
    [ 0, 2]
))
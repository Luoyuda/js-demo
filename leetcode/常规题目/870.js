/*
 * @Author: xiaohuolong
 * @Date: 2021-05-27 17:23:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-27 17:24:36
 * @FilePath: /js-demo/leetcode/常规题目/870.js
 */
/*
870. 优势洗牌
    给定两个大小相等的数组 A 和 B，A 相对于 B 的优势可以用满足 A[i] > B[i] 的索引 i 的数目来描述。
    返回 A 的任意排列，使其相对于 B 的优势最大化。
示例 1：
    输入：A = [2,7,11,15], B = [1,10,4,11]
    输出：[2,11,7,15]
示例 2：
    输入：A = [12,24,8,32], B = [13,25,32,11]
    输出：[24,32,8,12]
提示：
    1 <= A.length = B.length <= 10000
    0 <= A[i] <= 10^9
    0 <= B[i] <= 10^9
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function(nums1, nums2) {
    let sortA = nums1.slice().sort((a, b) => a - b)
    let sortB = nums2.slice().sort((a, b) => a - b)
    let assigned = new Map()
    for(let b of nums2) assigned.set(b, [])
    let remaining = []
    let j = 0
    for(let a of sortA){
        if(a > sortB[j]){
            assigned.get(sortB[j++]).push(a)
        }else{
            remaining.push(a)
        }
    }
    let ans = []
    for(let i = 0; i < nums2.length; i++){
        let lst = assigned.get(nums2[i])
        if(lst.length > 0){
            ans[i] = lst.pop()
        }else{
            ans[i] = remaining.pop()
        }
    }
    return ans
};

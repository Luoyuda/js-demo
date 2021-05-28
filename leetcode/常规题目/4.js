/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 22:19:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-25 18:05:25
 * @FilePath: /js-demo/leetcode/常规题目/4.js
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
4. 寻找两个正序数组的中位数
    给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
示例 1：
    输入：nums1 = [1,3], nums2 = [2]
    输出：2.00000
    解释：合并数组 = [1,2,3] ，中位数 2
示例 2：
    输入：nums1 = [1,2], nums2 = [3,4]
    输出：2.50000
    解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
示例 3：
    输入：nums1 = [0,0], nums2 = [0,0]
    输出：0.00000
示例 4：
    输入：nums1 = [], nums2 = [1]
    输出：1.00000
示例 5：
    输入：nums1 = [2], nums2 = []
    输出：2.00000
提示：
    nums1.length == m
    nums2.length == n
    0 <= m <= 1000
    0 <= n <= 1000
    1 <= m + n <= 2000
    -106 <= nums1[i], nums2[i] <= 106
进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let i = 0
    let j = 0
    let res = []
    while (i < nums1.length && j < nums2.length) {
        res.push(nums1[i] < nums2[j] ? nums1[i++] : nums2[j++])
    }
    let rest = i == nums1.length ? nums2.slice(j) : nums1.slice(i)
    res.push(...rest)
    let mid = res.length >> 1
    if((res.length & 1)){
        mid = res[mid] * 2
    }else{
        mid = res[mid - 1] + res[mid]
    }
    // console.log(mid)
    // console.log(res)
    return mid / 2
};
var findMedianSortedArrays = (A, B) => {
    let m = A.length
    let n = B.length
    let len = m + n
    let mid = Math.floor(len / 2)
    let left = right = -1
    let aStart = bStart = 0
    for (let i = 0; i <= mid; i++) {
        left = right
        if(aStart < m && (bStart >= n || A[aStart] < B[bStart])){
            right = A[aStart++]
        }else{
            right = B[bStart++]
        }
        // console.log(left, right)
    }
    if((len & 1) == 0){
        return (left + right) / 2
    }else{
        return right
    }
}
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let total = nums1.length + nums2.length
    let half = Math.floor(total / 2)
    if(total % 2 == 0){
        let left = findK(nums1, 0, nums2, 0, half)
        let right = findK(nums1, 0, nums2, 0, half + 1)
        return (left + right) / 2
    }else{
        return findK(nums1, 0, nums2, 0, half + 1)
    }
};
/**
 * 
 * @param {number[]} nums1 
 * @param {number} i 
 * @param {number[]} nums2 
 * @param {number} j 
 * @param {number} k 
 * @return {number}
 */
var findK = function(nums1, i, nums2, j, k){
    if(nums1.length - i > nums2.length - j) return findK(nums2, j, nums1, i, k)
    if(nums1.length == i) return nums2[j + k - 1]
    if(k == 1) return Math.min(nums1[i], nums2[j])
    let si = Math.min(i + Math.floor(k / 2), nums1.length)
    let sj = j + Math.floor(k / 2)
    if(nums1[si - 1] > nums2[sj - 1]){
        return findK(nums1, i, nums2, sj, k - Math.floor(k / 2))
    }else{
        return findK(nums1, si, nums2, j, k - (si - i))
    }
}
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let len1 = nums1.length
    let len2 = nums2.length
    let len = len1 + len2
    let m = Math.floor(len / 2)
    let left = 0
    let l = len % 2 == 0 ? m - 1 : m
    let right = 0
    let r = m
    let pos1 = 0
    let pos2 = 0
    let i = 0
    while(pos1 < len1 && pos2 < len2 && i <= r){
        let ans
        if(nums1[pos1] < nums2[pos2]){
            ans = nums1[pos1]
            pos1++
        }else{
            ans = nums2[pos2]
            pos2++
        }
        if(i == l){
            left = ans
        }
        if(i == r){
            right = ans
        }
        i++
    }
    while(pos1 < len1 && i <= r){
        let ans = nums1[pos1]
        pos1++
        if(i == l){
            left = ans
        }
        if(i == r){
            right = ans
        }
        i++
    }
    while(pos2 < len2 && i <= r){
        let ans = nums2[pos2]
        pos2++
        if(i == l){
            left = ans
        }
        if(i == r){
            right = ans
        }
        i++
    }
    // console.log(l, r, left, right)
    if(len % 2 == 0){
        return (left + right) / 2
    }else{
        return left
    }
};
console.log(findMedianSortedArrays([1,3], [2,4]))
console.log(findMedianSortedArrays([1,3], [2]))
console.log(findMedianSortedArrays([1,3], [2,4, 5]))

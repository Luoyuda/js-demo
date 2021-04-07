/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 22:19:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-07 08:06:15
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
var findMedianSortedArrays = (A, B) => {
    let n = A.length
    let m = B.length
    let left = Math.floor((n + m + 1) / 2)
    let right = (Math.floor(n + m + 2) / 2)
    return (getKth(A, 0, n - 1, B, 0, m -1, left) 
    + getKth(A, 0, n - 1, B, 0, m - 1, right)) / 2
}
var getKth = function(nums1, start1, end1, nums2, start2, end2, k){
    let len1 = end1 - start1 + 1;
    let len2 = end2 - start2 + 1;
    //让 len1 的长度小于 len2，这样就能保证如果有数组空了，一定是 len1 
    if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
    if (len1 == 0) return nums2[start2 + k - 1];

    if (k == 1) return Math.min(nums1[start1], nums2[start2]);

    let i = start1 + Math.min(len1, k / 2) - 1;
    let j = start2 + Math.min(len2, k / 2) - 1;

    if (nums1[i] > nums2[j]) {
        return getKth(nums1, start1, end1, nums2, j + 1, end2, k - (j - start2 + 1));
    }
    else {
        return getKth(nums1, i + 1, end1, nums2, start2, end2, k - (i - start1 + 1));
    }
}

// console.log(findMedianSortedArrays([1,3], [2,4]))
// console.log(findMedianSortedArrays([1,3], [2]))
console.log(findMedianSortedArrays([1,3], [2,4, 5]))

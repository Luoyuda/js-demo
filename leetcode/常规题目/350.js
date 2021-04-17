/*
 * @Author: xiaohuolong
 * @Date: 2020-07-13 22:04:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-16 11:55:19
 * @FilePath: /js-demo/leetcode/常规题目/350.js
 */ 
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
350. 两个数组的交集 II
    给定两个数组，编写一个函数来计算它们的交集。
示例 1：
    输入：nums1 = [1,2,2,1], nums2 = [2,2]
    输出：[2,2]
示例 2:
    输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出：[4,9]
说明：
    输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
    我们可以不考虑输出结果的顺序。
进阶：
    如果给定的数组已经排好序呢？你将如何优化你的算法？
    如果 nums1 的大小比 nums2 小很多，哪种方法更优？
    如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
 */
var intersect = function(nums1, nums2) {
    const hash = {}
    let short, long
    if(nums1.length > nums2.length){
        short = nums2
        long = nums1
    }else{
        short = nums1
        long = nums2
    }
    short.forEach(item => {
        hash[item] = (hash[item] || 0) + 1
    })
    return long.filter(item => {
        return hash[item] > 0 ? (hash[item] -= 1) || true : false 
    })
};

var intersect = function(nums1, nums2) {
    let hash = {}
    let ans = []
    for(let i = 0; i < nums1.length; i++){
        hash[nums1[i]] = (hash[nums1[i]] || 0) + 1
    }
    for (let i = 0; i < nums2.length; i++) {
        let num = nums2[i];
        if(hash[num]){
            hash[num] -= 1
            ans.push(num)
        }
    }
    return ans
};

var intersect = function(nums1, nums2) {
    nums1 = nums1.sort((a, b) => a - b)
    nums2 = nums2.sort((a, b) => a - b)
    let i = 0
    let j = 0
    let res = []
    while (i < nums1.length && j < nums2.length){
        if(nums1[i] < nums2[j]){
            i++
        }else if(nums1[i] > nums2[j]){
            j++
        }else{
            res.push(nums2[j])
            i++
            j++
        }
    }
    return res
};


console.log(intersect([1,2,2,1], [2,2]))
console.log(intersect([4,9,5], [9,4,9,8,4]))
console.log(intersect([9,4,9,8,4], [4,9,5]))
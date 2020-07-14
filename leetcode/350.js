/*
 * @Author: xiaohuolong
 * @Date: 2020-07-13 22:04:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-13 22:58:11
 * @FilePath: /js-demo/leetcode/350.js
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

var intersect2 = function(nums1, nums2) {
    nums1 = nums1.sort((a, b) => a - b)
    nums2 = nums2.sort((a, b) => a - b)
    console.log(nums1)
    console.log(nums2)
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
// console.log(intersect2([1,2,2,1], [2,2]))
console.log(intersect2([4,9,5], [9,4,9,8,4]))
console.log(intersect2([9,4,9,8,4], [4,9,5]))
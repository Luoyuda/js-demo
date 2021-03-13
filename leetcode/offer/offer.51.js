/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 10:23:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 17:33:21
 * @FilePath: /js-demo/leetcode/offer/offer.51.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    剑指 Offer 51. 数组中的逆序对
        在数组中的两个数字，如果前面一个数字大于后面的数字，
        则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
    示例 1:
        输入: [7,5,6,4]
        输出: 5
    限制：
        0 <= 数组长度 <= 50000
 */
var reversePairs = function(nums) {
    return mergeSort([], nums, 0, nums.length - 1)
};

var mergeSort = (tmp, nums, l, r) => {
    if(l >= r) return 0
    let m = (l + r) >> 1
    let res = mergeSort(tmp, nums, l, m) + mergeSort(tmp, nums, m + 1, r)
    let i = l, j = m + 1
    for (let k = l; k <= r; k++) {
        tmp[k] = nums[k]
    }
    for (let k = l; k <= r; k++) {
        // console.log(i, m, j, k, tmp[i], tmp[j])
        if(i == m + 1){
            nums[k] = tmp[k]
        }else if(j == r + 1 || tmp[i] <= tmp[j]){
            nums[k] = tmp[i++]
        }else{
            nums[k] = tmp[j++]
            res += m - i + 1
        }
    }
    return res
}

var sort = function(nums){
    // return mergeSort([], nums, 0, nums.length - 1)
    return mergeSort1(nums, 0, nums.length - 1, [])
}
var mergeSort1 = (nums, l, r, temp) => {
    if(l >= r) return 0
    let m = (l + r) >> 1
    let res = mergeSort1(nums, l, m, temp) + mergeSort1(nums, m + 1, r, temp)
    let i = l, j = m + 1
    for (let k = l; k <= r; k++) {
        temp[k] = nums[k]
    }
    // console.log(nums, l, r, m, i, j)
    for (let k = l; k <= r; k++) {
        // console.log(i, m, j, k, temp[i], temp[j])
        if(i == m + 1){
            nums[k] = temp[k]
        }else if(j == r + 1 || temp[i] <= temp[j]){
            nums[k] = temp[i++]
        }else{
            nums[k] = temp[j++]
            res += m - i + 1
        }
    }
    // console.log(nums)
    return res
}

console.log(reversePairs([7,3,2,6,0,1,5,4]))
console.log(sort([7,3,2,6,0,1,5,4]))
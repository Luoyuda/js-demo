/*
 * @Author: xiaohuolong
 * @Date: 2021-04-30 21:18:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-06 20:05:24
 * @FilePath: /js-demo/algorithm/Sort/MergeSort.js
 */
/**
 * 归并排序：将一个数组分割成N个小数组，然后将小数组逐一合并成一个个有序的数组
 * 时间: O(nlogn)
 * 空间: O(n)
 * 稳定
 * @param {*} arr 待排序数组
 */
var MergeSort = function(arr){
    if(!arr.length) return
    let result = mergeSort(arr, 0 , arr.length - 1)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = result[i]
    }
    return arr
}
/**
 * 二分分割数组
 * @param {[Number]} arr 
 * @param {Number} start 
 * @param {Number} end 
 * @returns 
 */
var mergeSort = function(arr, start, end){
    if(start == end) return [arr[start]]
    let mid = Math.floor((start + end) / 2)
    let left = mergeSort(arr, start, mid)
    let right = mergeSort(arr, mid + 1, end)
    return merge(left, right)
}
/**
 * 合并两个有序数组
 * @param {[Number]} arr1 
 * @param {[Number]} arr2 
 */
var merge = function(arr1, arr2){
    let result = new Array(arr1.length + arr2.length)
    let i = 0
    let j = 0
    while (i < arr1.length && j < arr2.length){
        result[i + j] = arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]
    }
    while(i < arr1.length){
        result[i + j] = arr1[i++]
    }
    while(j < arr2.length){
        result[i + j] = arr2[j++]
    }
    return result
}

/**
 * 归并排序空间优化版：将一个数组分割成N个小数组，然后将小数组逐一合并成一个个有序的数组
 * 时间: O(nlogn)
 * 空间: O(n)
 * 稳定
 * @param {*} arr 待排序数组
 */
var MergeSort = function(arr){
    if(!arr.length) return
    let result = new Array(arr.length)
    mergeSort(arr, 0 , arr.length - 1, result)
    return arr
}
/**
 * 二分分割数组
 * @param {[Number]} arr 
 * @param {Number} start 
 * @param {Number} end 
 * @returns 
 */
var mergeSort = function(arr, start, end, result){
    if(start == end) return 
    let mid = Math.floor((start + end) / 2)
    mergeSort(arr, start, mid, result)
    mergeSort(arr, mid + 1, end, result)
    merge(arr, start, end, result)
}
/**
 * 合并两个有序数组
 * @param {[Number]} arr1 
 * @param {[Number]} arr2 
 */
var merge = function(arr, start, end, result) {
    let end1 = Math.floor((start + end) / 2)
    let start2 = end1 + 1
    let end2 = end

    let index1 = start
    let index2 = start2
    while(index1 <= end1 && index2 <= end2) {
        result[index1 + index2 - start2] = arr[index1] <= arr[index2] ? arr[index1++] : arr[index2++]
    }
    while(index1 <= end1){
        result[index1 + index2 - start2] = arr[index1++]
    }
    while(index2 <= end2){
        result[index1 + index2 - start2] = arr[index2++]
    }
    while(start <= end){
        arr[start] = result[start++]
    }
    return arr
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    if(!nums.length) return nums
    let result = new Array(nums.length)
    margeArray(nums, 0, nums.length - 1, result)
    return nums
};

var margeArray = function(nums, start, end, result){
    if(start >= end) return nums
    let mid = (start + end) >> 1
    margeArray(nums, start, mid, result)
    margeArray(nums, mid + 1, end, result)
    marge(nums, start, end, result)
}

var marge = function(nums, start, end, result){
    let end1 = (start + end) >> 1
    let start2 = end1 + 1
    let index1 = start
    let index2 = start2
    let end2 = end
    console.log(index1, end1, index2, end2)
    while(index1 <= end1 && index2 <= end2){
        result[index1 + index2 - start2] = nums[index1] <= nums[index2] ? nums[index1++] : nums[index2++]
    }
    while(index1 <= end1){
        result[index1 + index2 - start2] = nums[index1++]
    }
    while(index2 <= end2){
        result[index1 + index2 - start2] =nums[index2++]
    }
    console.log(result)
    while(start <= end){
        nums[start] = result[start++]
    }
    return nums
}
let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(sortArray(arr))
// console.log(merge([1, 2, 3], []))
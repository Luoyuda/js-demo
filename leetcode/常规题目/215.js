/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 22:12:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 17:45:27
 * @FilePath: /js-demo/leetcode/常规题目/215.js
 */ 
var findKthLargest = function(nums, k) {
    if(k < 1) return 0
    let res = nums.sort((a, b) => a > b ? -1 : 1)
    return res[k-1]
};

let partition = (arr, p, q) => {
    let x = arr[p]
    let i = p
    let j = p + 1
    for (j; j <= q; j++) {
        if(arr[j] < x){
            let temp = arr[++i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    let temp = arr[i]
    arr[i] = x
    arr[p] = temp
    return i
}

let quickSort = function(arr, p, q, k){
    const pos = partition(arr, p, q)
    if(k == pos){
        // console.log(arr)
        return arr[k]
    }else if(k < pos){
        return quickSort(arr, p, pos - 1, k)
    }else{
        return quickSort(arr, pos + 1, q, k)
    }
}
var findKthLargest = function(nums, k){
    return quickSort(nums, 0, nums.length - 1, nums.length - k)
}
var num = [3,2,3,1,2,4,5,5,6]
var num = [6,10,13,5,8,3,2,11,-1,-1,-100]
var num = [9, 3, 8, 2, 1]
// console.log(quickSort(num, 0, num.length - 1))
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))
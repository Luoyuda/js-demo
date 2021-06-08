/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 12:12:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-07 10:44:00
 * @FilePath: /js-demo/algorithm/Sort/InsertSort.js
 */
var swap = (arr, i, j) => {
    if(i == j) return
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]
}
/**
 * 插入排序：在新数字插入过程中，不断与前面的数字交换，直到找到自己合适的位置。交换法
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 */
var InsertSort = function(arr){
    for (let i = 1; i < arr.length; i++) {
        let j = i
        while (j >= 1 && arr[j - 1] > arr[j]){
            swap(arr, j, j - 1)
            j--
        }
    }
    return arr
}
/**
 * 插入排序：在新数字插入过程中，不断与前面的数字交换，直到找到自己合适的位置。插入一次法
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 */
var InsertSort = function(arr){
    for (let i = 1; i < arr.length; i++) {
        let x = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > x){
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = x
    }
    return arr
}

let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(InsertSort(arr))
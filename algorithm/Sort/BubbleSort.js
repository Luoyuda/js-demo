/*
 * @Author: xiaohuolong
 * @Date: 2021-04-28 21:24:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 11:07:40
 * @FilePath: /js-demo/algorithm/Sort/BubbleSort.js
 */
var swap = (arr, i, j) => {
    // let temp = arr[i]
    // arr[i] = arr[j]
    // arr[j] = temp
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]
}

/**
 * 冒泡排序
    最外层的 for 循环每经过一轮，
    剩余数字中的最大值就会被移动到当前轮次的最后一位，
    中途也会有一些相邻的数字经过交换变得有序。
    总共比较次数是 (n-1)+(n-2)+(n-3)+…+1(n−1)+(n−2)+(n−3)+…+1。
    这种写法相当于相邻的数字两两比较，并且规定：“谁大谁站右边”。
    经过 n-1n−1 轮，数字就从小到大排序完成了。
 */
/**
 * 冒泡排序原始版
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 * @returns {[Number]}
 */
var bubbleSort = (arr) => {
    let n = arr.length
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if(arr[j] > arr[j + 1]){
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}
/**
 * 冒泡排序改进版：如果某一趟没有发生交换，则提前跳出
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 * @returns {[Number]}
 */
var bubbleSort = arr => {
    let n = arr.length
    let swapped = true
    for (let i = 0; i < n - 1; i++) {
        if(!swapped) break
        swapped = false
        for (let j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]){
                swap(arr, j, j + 1)
                swapped = true
            }
        }
    }
    return arr
}
/**
 * 冒泡排序改进版:记录上一次交换的位置
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 * @returns {[Number]}
 */
var bubbleSort = arr => {
    let lastIndex = arr.length - 1
    let swapped = true
    let swappedIndex = 0
    while (swapped){
        swapped = false
        for (let i = 0; i < lastIndex; i++) {
            if(arr[i] > arr[i + 1]){
                swap(arr, i, i + 1)
                swapped = true
                swappedIndex = i
            }
        }
        lastIndex = swappedIndex
    }
    return arr
}
let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(bubbleSort(arr))
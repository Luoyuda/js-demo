/*
 * @Author: xiaohuolong
 * @Date: 2021-05-01 23:35:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-02 15:46:29
 * @FilePath: /js-demo/algorithm/Sort/RadixSort.js
 */
/**
 * 基数排序
 * 基数排序可以分为以下三个步骤：
 * 找出数组中最大的数字的位数 maxDigit
 * 获取数组中每个数字的基数
 * 遍历 maxDigit 轮数组，每轮按照基数对其进行排序
 * 时间复杂度为 O(d(n + k))
 * 空间复杂度为 O(n+k)
 * 稳定
 * @param {number[]} arr 
 */
var radixSort = function(arr){
    if(arr.length <= 1) return arr
    let max = -Infinity
    for (const x of arr) {
        max = Math.max(max, Math.abs(x))
    }
    let maxDigit = 0;
    while (max != 0) {
        maxDigit++;
        max = Math.floor(max / 10);
    }
    let counting = new Array(20).fill(0)
    let result = new Array(arr.length)
    let dev = 1
    for (let i = 0; i < maxDigit; i++) {
        // console.log(arr)
        for (const x of arr) {
            let radix = (dev <= Math.abs(x) ? parseInt(x / dev) % 10 : 0) + 9
            // console.log(radix, x)
            counting[radix]++
        }
        // console.log(counting)
        for (let j = 1; j < counting.length; j++) {
            counting[j] += counting[j - 1]
        }
        for (let j = arr.length - 1; j >= 0; j--){
            let radix = (dev <= Math.abs(arr[j]) ? parseInt(arr[j] / dev) % 10 : 0) + 9 
            result[--counting[radix]] = arr[j]
        }
        // console.log(result)
        for (let j = 0; j < result.length; j++) {
            arr[j] = result[j];
        }
        counting.fill(0)
        dev *= 10
    }
    return arr
}
let arr = [0, 10, -10, -20, -11,-1]
console.log(radixSort(arr))
console.log(radixSort([1,10000000, -1000000, -10000]))

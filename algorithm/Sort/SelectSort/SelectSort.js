/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 10:45:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 11:38:34
 * @FilePath: /js-demo/algorithm/Sort/SelectSort.js
 */
var swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
/**
 * 选择排序:双重循环遍历数组，每经过一轮比较，
 * 找到最小元素的下标，将其交换至首位。
 * 时间:O(n*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var SelectSort = (arr) => {
  let n = arr.length
  let min
  for (let i = 0; i < n - 1; i++) {
    min = i
    for (let j = i + 1; j < n; j++) {
      if(arr[j] < arr[min]) {
        min = j
      }
    }
    swap(arr, i, min)
  }
  return arr
}

/**
 * 选择排序改进版:双重循环遍历数组，每经过一轮比较，找到最小元素的下标，
 * 将其交换至首位。找到最大的坐标放在最后一位
 * 时间:O(n*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var SelectSort = (arr) => {
  let n = arr.length
  for (let i = 0; i < n >> 1; i++) {
    let min = i
    let max = i
    for (let j = i + 1; j < n - i; j++) {
      if(arr[j] < arr[min]) {
        min = j
      }
      if(arr[j] > arr[max]) {
        max = j
      }
    }
    if(arr[min] == arr[max]) break
    swap(arr, i, min)
    // 如果最大值的下标刚好是 i，
    // 由于 arr[i] 和 arr[min] 已经交换了，所以这里要更新 max 的值。
    if(i == max) max = min
    swap(arr, max, n - i - 1)
  }
  return arr
}

var arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(SelectSort(arr))
console.log(arr.sort((a, b) => a - b))

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 09:05:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-14 20:36:10
 * @FilePath: /js-demo/algorithm/Sort/QuickSort.js
 */
/**
 * 划分函数：从头开始，双指针划分
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
  let x = arr[p]
  let i = p
  let j = p + 1
  while(j <= q){
    if(arr[j] < x){
      i++
      swap(arr, i, j)
    }
    j++
  }
  swap(arr, i, p)
  return i
}
/**
 * 划分函数：从头开始，双指针划分
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
  // 取第一个数为基数
  let pivot = arr[p]
  // 从第二个数开始分区
  let i = p + 1
  // 右边界
  let j = q
  // 相遇时退出循环
  while (i < j){
    // 找到第一个大于基数的位置
    while (i < j && arr[i] <= pivot) i++
    if(i != j){
      // 交换到右分区，使得左边分区都小于或等于基数，右边分区大于或等于基数
      swap(arr, i, j)
      j--
    }
  }
  // 如果两个指针相等，单独比较 arr[j] pivot
  if(arr[j] > pivot) j--
  // 将基数和中间树交换
  swap(arr, p, j)
  // 返回中间的下标
  return j
}

/**
 * 划分函数：将 arr 从 p 到 q 分区，左边区域比基数小，右边区域比基数大，然后返回中间值的下标
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
  // 取第一个数为基数
  let pivot = arr[p]
  // 从第二个数开始分区
  let i = p + 1
  // 右边界
  let j = q
  // 相遇时退出循环
  while (i < j){
    // 找到第一个大于基数的位置
    while (i < j && arr[i] <= pivot) i++
    while (i < j && arr[j] >= pivot) j--
    // 交换到右分区，使得左边分区都小于或等于基数，右边分区大于或等于基数
    swap(arr, i, j)
  }
  // 如果两个指针相等，单独比较 arr[j] pivot
  if(arr[j] > pivot) j--
  // 将基数和中间树交换
  swap(arr, p, j)
  // 返回中间的下标
  return j
}
/**
 * 划分函数：将 arr 从 p 到 q 分区，左边区域比基数小，右边区域比基数大，然后返回中间值的下标
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
  let pivot = arr[p]
  let i = p + 1
  let j = q
  while (i < j){
    while (i < j && arr[i] <= pivot) i++
    while (i < j && arr[j] >= pivot) j--
    swap(arr, i, j)
    i++
    j--
  }
  if(arr[j] >= pivot) j--
  swap(arr, p, j)
  return j
}
/**
 * 快速排序算法的基本思想是：
 * 从数组中取出一个数，称之为基数（pivot）
 * 遍历数组，将比基数大的数字放到它的右边，比基数小的数字放到它的左边。遍历完成后，数组被分成了左右两个区域
 * 将左右两个区域视为两个数组，重复前两个步骤，直到排序完成
 * 时间复杂度: O(nlogn ~ n*n)
 * 空间复杂度: O(logn ~ n)
 * 稳定: 不稳定
 * @param {*} arr 
 * @param {*} p 
 * @param {*} q 
 * @returns 
 */
var QuickSort = (arr, p, q) => {
  if(p < q){
    // 将数组分区，并获得中间值的下标
    const r = partition(arr, p, q)
    // 对左边区域快速排序
    QuickSort(arr, p, r - 1)
    // 对右边区域快速排序
    QuickSort(arr, r + 1, q)
  }
  return arr
}

var sortArray = function(arr){
  // shuffle(arr)
  return QuickSort(arr, 0, arr.length - 1)
}

/**
 * 优化: 将排序数组用洗牌算法打乱
 * @return {number[]}
 */
var shuffle = function(nums) {
  let n = nums.length
  for (let i = 0; i < n; i++) {
    let rand = randOne(i, n - 1)
    swap(nums, i, rand)
  }
  return nums
};

// [n, m] 内的一个随机整数
var randOne = function(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
};
// 交换
var swap = function(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
};


var sortArray = function(arr){
  shuffle(arr)
  return QuickSort(arr, 0, arr.length - 1)
}

var QuickSort = (arr, p, q) => {
  if(p >= q) return arr
  let m = partition(arr, p, q)
  QuickSort(arr, p, m - 1)
  QuickSort(arr, m + 1, q)
  return arr
}
var partition = (arr, p, q) => {
  let x = arr[p]
  let i = p + 1
  let j = q
  while (i < j){
    while (i < j && arr[i] <= x) i++
    while (i < j && arr[j] >= x) j--
    swap(arr, i, j)
  }
  if(arr[j] >= x) j--
  swap(arr, p, j)
  return j
}
var swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
var randOne = (n, m) => n + Math.floor(Math.random() * (m - n + 1))
var shuffle = (arr) => {
  let n = arr.length
  for (let i = 0; i < n; i++) {
    let rand = randOne(i, n - 1)
    swap(arr, i, rand)
  }
}

let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(sortArray(arr))


// 3路快排 [l,...lt, .. i, ... gt, r]

var QuickSort = (arr, l, r) => {
  if(l >= r) return arr
  let x = arr[l]
  let lt = l
  let gt = r + 1
  let i = l + 1
  while(i < gt){
    if(arr[i] < x){
      swap(arr, i, lt + 1)
      lt++
      i++
    }else if(arr[i] > x){
      swap(arr, i, gt - 1)
      gt--
    }else{
      i++
    }
  }
  swap(arr, lt, l)
  QuickSort(arr, l, lt -1)
  QuickSort(arr, gt, r)
  return arr
}
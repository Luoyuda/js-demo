---
title: 排序算法 - 归并排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 归并
categories:
 - 技术
comments: true
date: 2022-04-07 14:35
---
# 归并排序

## 描述

将一个数组分割成 `N` 个小数组，然后将小数组逐一合并成一个个有序的数组，是分治法的应用

* 分割：递归对半分割数组
* 合并：保持元素顺序的同时，将上一步得到的子集合并到一起

## 编码实现

* 将数组递归分割，直到只剩下一个元素
* 逐渐合并两个有序的数组
    * `[6] [10]` => `[6, 10][13]` => `[6, 10, 13]`
* 将最后输出的数组结果同步到原数组中

```js
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
  // 只剩下一个数字，停止拆分
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
```

![GIF.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c438b8eff04445d192a8fe38df05a6fb~tplv-k3u1fbpfcp-watermark.image?)

## 优化角度

### 优化空间使用

只使用一个数组去承载计算的结果

```js
/**
 * @param {*} arr 待排序数组
 */
var MergeSort = function(arr){
  if(!arr.length) return
  let result = new Array(arr.length)
  mergeSort(arr, 0 , arr.length - 1, result)
  return arr
}
var mergeSort = function(arr, start, end, result){
  if(start == end) return 
  let mid = Math.floor((start + end) / 2)
  mergeSort(arr, start, mid, result)
  mergeSort(arr, mid + 1, end, result)
  merge(arr, start, end, result)
}
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
```

## 算法复杂度

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(nlogn) | O(nlogn) | O(nlogn) | O(n) | out-place | 稳定

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/MergeSort)
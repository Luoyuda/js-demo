---
title: 排序算法 - 选择排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 选择
categories:
 - 技术
comments: true
date: 2022-04-07 14:35
---
# 选择排序

## 描述

选择排序(Selection-sort)是一种简单直观的排序算法。

它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

## 编码实现

* 遍历数组，假设第一个为最小值 `min = i`
* 遍历 `(i, n)` 找到最小值的下标 `min`，最后与 `i` 进行交换

```js
var SelectSort = (arr) => {
  let n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      if(arr[j] < arr[min]) {
        min = j
      }
    }
    swap(arr, i, min)
  }
  return arr
}
```

![select.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/777f546043054de2b2cfa7e21fba2aad~tplv-k3u1fbpfcp-watermark.image?)

## 优化角度

### 同时找最小和最大元素

双重循环遍历数组，每经过一轮比较，找到最小元素的下标，将其交换至首位。找到最大的坐标放在最后一位

* 遍历数组，找出最大值 `max` 和最小值 `min`
* 交换 `min` 与 `i` 
* 判断 `i` 是否为 `max`，如果刚好为 `i` 则由于 `i` 已经被交换过，`max` 的值应该是跟 `i` 交换过后的 `min` 
* 交换 `max` 和 `n - i - 1` (尾部)

```js
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
```

![select.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f95a11a2be244019eef61fd975f530d~tplv-k3u1fbpfcp-watermark.image?)

## 算法复杂度 (稳如狗的时间复杂度)

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(n²) | O(n²) | O(n²) | O(1) | in-place | 不稳定


## 对比

![select.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d687e051f88647c0a1c04f8296446252~tplv-k3u1fbpfcp-watermark.image?)

## 跟插入、冒泡相比

从图中不难看出，这个排序方法确实很辣鸡啊，无论正序，逆序，随机各种情况下都是很稳定的久（令人泪目）

![对比.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1bd076a99874128b3164c76cc38d073~tplv-k3u1fbpfcp-watermark.image?)

[网站地址](https://www.toptal.com/developers/sorting-algorithms)

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/SelectSort)
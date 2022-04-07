---
title: 排序算法 - 插入排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 插入
categories:
 - 技术
comments: true
date: 2022-04-07 14:35
---

# 插入排序

## 描述

把要排序的数组分为了两个部分, 一部分是数组的全部元素(除去待插入的元素), 另一部分是待插入的元素; 先将第一部分排序完成, 然后再插入这个元素. 其中第一部分的排序也是通过再次拆分为两部分来进行的.

## 编码实现

### 交换法

* 第一个元素开始，我们可以认为该元素已经被排序
* 取出 `i` 元素，在 `(0, i)` 的区间扫描 假设从 `j = i` 位置开始往前挪
* 如果 `arr[j - 1] > arr[j]`，则需要将 `arr[j]` 与 `arr[j - 1]` 交换
* 重复直到不满足条件 `j >= 1 && arr[j - 1] > arr[j]`

```js
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
```

![insert.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96c5608434e54647ac9701a654ae6d64~tplv-k3u1fbpfcp-watermark.image?)

### 一次插入法

* 取出第一个元素，默认其有序
* 从 `i = 1` 开始遍历，取出 `x = arr[i]` 往前查找适合的位置后进行插入
* 比 `x` 小的值往后移动一位

```js
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
```

![insert.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/652ed4da44bd4364956245aba3c7fb6a~tplv-k3u1fbpfcp-watermark.image?)

## 折半插入排序

折半插入排序是直接插入排序的升级版. 鉴于插入排序第一部分为已排好序的数组, 我们不必按顺序依次寻找插入点, 只需比较它们的中间值与待插入元素的大小即可。

折半插入明显的减少了查询的次数，但是数组移动的次数并没有改变，所以时间复杂度还是跟插入排序一致

### 编码实现

* 第一个元素开始，我们可以认为该元素已经被排序
* 取出 `x = arr[i]` 元素，在 `(l, r)` 的区间中 取出中间 的下标 `m` 
* 直到 `arr[m] >= x` 则将 `l` 位置往后挪 1 位，反之则将 `r` 往前挪 1 位 直到 `l <= r` 时跳出
* 接下来就需要在 将 `(l, i)` 中的元素一起往后挪 1 位， 最后在 `l` 位置插入 `x`
* 重复直到外循环结束

```js
var InsertSort = function(arr){
  let n = arr.length
  for (let i = 1; i < n; i++) {
    let x = arr[i]
    let l = 0
    let r = i - 1
    while(l <= r){
      // 二分查找
      let m = l + Math.floor((r - l) / 2)
      if(x >= arr[m]){
        l = m + 1
      }else{
        r = m - 1
      }
    }
    // 确定好插入位置后，元素集体往后挪一位
    for (let j = i; j > l; j--) {
      arr[j] = arr[j - 1]
    }
    //插入元素
    arr[l] = x
  }
  return arr
}
```

![insert.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18731aa1c77d4edeac08180d85b0ab46~tplv-k3u1fbpfcp-watermark.image?)


## 对比

![insert.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e16549d7ca4367a3847fda30041ebf~tplv-k3u1fbpfcp-watermark.image?)

## 算法复杂度
平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(n²) | O(n) | O(n²) | O(1) | in-place | 稳定
无 | 输入数组按升序排列|输入数组按降序排列 |


[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/InsertSort)
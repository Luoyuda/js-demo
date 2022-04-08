---
title: 排序算法 - 快速排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 快排
categories:
 - 技术
comments: true
date: 2022-04-08 12:35
---

# 快速排序

## 描述

快速排序借用了分治的思想, 并且基于冒泡排序做了改进。 它将数组拆分为两个子数组, 其中一个子数组的所有元素都比另一个子数组的元素小, 然后对这两个子数组再重复进行上述操作, 直到数组不可拆分, 排序完成。

### 基本思想

* 从数组中取出一个数，称之为基数（pivot）
* 遍历数组，将比基数大的数字放到它的右边，比基数小的数字放到它的左边
* 遍历完成后，数组被分成了左右两个区域
* 将左右两个区域视为两个数组，重复前两个步骤，直到排序完成

## 实现

### 基本框架

* `sortArray`：入口方法
* `QuickSort`：递归方法，负责不停的划分，直到 `p` `q` 指针对撞
* `partition`: 划分函数，根据 `pivot` 划分区域，然后返回中点，中点右边的值均大于 `pivot`，左边的值均小于 `pivot`

```js
// 排序函数
function sortArray(arr){
    return QuickSort(arr, 0, arr.length - 1)
}
// QuickSort
function QuickSort(arr, p, q){
  // 此时排序已完成
  if(p >= q) return arr
  // 通过划分函数获得中点
  let m = partition(arr, p, q)
  // 接着视为两个区域进行递归
  QuickSort(arr, p, m - 1)
  QuickSort(arr, m + 1, q)
  return arr
}
// 划分函数
function partition(arr, p, q){
  // 重点是划分函数的实现
}
```

### 第一种写法

按照基本思想进行

* 选取一个基准点 `pivot`, 定义两个指针 `i = p`, `j = p + 1`
* 移动 `j` 指针找到 比 `pivot` 小的，移动 `i` 指针，将其与 `i` 换位
* 直到 `j > q` 之后跳出循环
* 最后将 `p` 与 `i` 进行互换，返回 `i` 指针

```js
function partition(arr, p, q){
  let pivot = arr[p]
  let i = p
  let j = p + 1
  while(j <= q){
    if(arr[j] < pivot){
      i++
      swap(arr, i, j)
    }
    j++
  }
  swap(arr, i, p)
  return i
}
```

![GIF.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0732030c7044c9ba33d4102afab7f11~tplv-k3u1fbpfcp-watermark.image?)

#### 详细过程

1. `arr = [15, 9, 31, 21, 44, 22, 33, 18, 2]` `p = 0` `q = arr.length - 1 = 8`
2. `pivot = arr[0]` `i = 0` `j = 1` 开始比对
    1. `9 < 15` `i++; i = 1` `swap(1, 1)` `arr` 不变
    2. `31 > 15`, `21 > 15`, `44 > 15`, `22 > 15`, `33 > 15`, `18 > 15`（跳过）
    3. `2 < 15` `i++; i = 2` `swap(2, 8)` `[15, 9, 2, 21, 44, 22, 33, 18, 31]`
3. `i = 2, p = 0` `swap(0, 2)` `[2, 9, 15, 21, 44, 22, 33, 18, 31]`
4. 返回 `i = 2`, `QuickSort(arr, 0, 1)` ` QuickSort(arr, 3, 8)`
5. `QuickSort(arr, 0, 1)` `arr = [2, 9, 15, 21, 44, 22, 33, 18, 31]` `p = 0` `q = 1` `i = 0` `j = 2` `swap(0, 0)` 返回 `i = 0` , `QuickSort(arr, 0, -1)`（跳过） ` QuickSort(arr, 1, 1)` （跳过）
6. `QuickSort(arr, 3, 8)` => `partition(arr, 3, 8)`
7. `[..., 21, 44, 22, 33, 18, 31]` `i = 3` `j = 4` `pivot = 21`
    1. `44 > 21`, `22 > 21`, `33 > 21` （跳过）
    2. `18 < 21` `i = 4, j = 7` `swap(4, 7)` `[..., 21, 18, 22, 33, 44, 31]`
    3. `31 > 21`（跳过），`i = 4, p = 3`, `swap(3, 4)` `[..., 18, 21, 22, 33, 44, 31]`
8. 返回 `i = 4` `QuickSort(arr, 3, 3)` （跳过）
9. `QuickSort(arr, 5, 8)` => `partition(arr, 5, 8)`
10. `[..., 22, 33, 44, 31]` `i = 5, j = 6` `pivot = 22` （跳过）
11. 返回 `i = 5` `QuickSort(arr, 4, 4)`
12. `QuickSort(arr, 6, 8)` `[..., 33, 44, 31]` `i = 6, j = 7, pivot = 33`
    1. `44 > 33` （跳过）
    2. `31 < 33` `i = 7, j = 8` `swap(7, 8)` `[..., 33, 31, 44]`
    3. `i = 7, p = 6` `swap(6, 7)` `[..., 31, 33, 44]`
    
13. 返回 `i = 7` `QuickSort(arr, 6, 6)`（跳过） `QuickSort(arr, 8, 8)`（跳过）
14. 排序完成 `[2, 9, 15, 18, 21, 22, 31, 33, 44]`


### 第二种写法

```js
var partition = (arr, p, q) => {
  // 取第一个数为基数
  let pivot = arr[p]
  // 从第二个数开始分区 (i, j) = (p + 1, q)
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
```

![GIF.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6674ed9f08a64b5abbfe6d6b152dbe2e~tplv-k3u1fbpfcp-watermark.image?)

#### 详细过程

1. `[31, 15, 18, 22, 33, 21, 44, 2, 9]` `pivot = 31, i = 1, j = 8`
    1. `15, 18, 22 < 31` （跳过）
    2. `33 > 31` `i = 4 j = 8` `swap(4, 8)` `[31, 15, 18, 22, 9, 21, 44, 2, 33]` `j = 7`
    3. `9, 21 < 31`（跳过）
    4. `44 > 31` `i = 6 j = 7` `swap(6, 7)` `[31, 15, 18, 22, 9, 21, 2, 44, 33]` `j = 6`
    5. 跳出循环 `arr[6] = 2 < 31` `swap(0, 6)` `[2, 15, 18, 22, 9, 21, 31, 44, 33]` 返回 `j = 6`
2. `QuickSort(arr, 0, 5)` 和 `QuickSort(arr, 7, 8)`
3. `QuickSort(arr, 0, 5)` => `partition(arr, 0, 5)` `[2, 15, 18, 22, 9, 21]` `pivot = 2, i = 1, j = 5`
    1. `15 > 2` `swap(1, 5)` => `[2, 21, 18, 22, 9, 15]` `j = 4`
    2. `21 > 2` `swap(1, 4)` => `[2, 9, 18, 22, 21, 15]` `j = 3`
    3. `9 > 2` `swap(1, 3)` => `[2, 22, 18, 9, 21, 15]` `j = 2`
    4. `22 > 2` `swap(1, 2)` => `[2, 18, 22, 9, 21, 15]` `j = 1`
    5. 跳出循环 `arr[1] = 18 > 2` `j--` `swap(0, 0)` 返回 `j = 0`
4. `QuickSort(arr, 0, -1)`（跳过）和 `QuickSort(arr, 1, 5)`
5. `QuickSort(arr, 1, 5)` => `partition(arr, 1, 5)` `[18, 22, 9, 21, 15]` `pivot = 18, i = 2, j = 5`
    1. `22 > 18` `swap(2, 5)` => `[18, 15, 9, 21, 22]` `j = 4`
    2. `15, 9 < 18` （跳过）
    3. `21 > 18` 此时 `i = j = 4`
    4. 跳出循环 `arr[4] = 21 > 18` `j--` `swap(2, 3)` 返回 `j = 3` `[9, 15, 18, 21, 22]`
6. `QuickSort(arr, 1, 2)`（跳过）和 `QuickSort(arr, 4, 5)`（跳过）
7. 回到 `QuickSort(arr, 7, 8)` 交换后完成排序 `[2, 9, 15, 18, 21, 22, 31, 33, 44]`

### 第三种写法

```js
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
    // 找到第一个小于基数的位置
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
```

![GIF.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be4db0655c1e41e7806dcc1f3c28adfc~tplv-k3u1fbpfcp-watermark.image?)

#### 详细过程

1. `[22, 2, 18, 31, 33, 9, 15, 44, 21]` `pivot = 22` `i = 1, j = 8`
    1. `2, 18 < 22` （跳过），`31 > 22` `i = 3`
    2. `21 < 22`  `j = 8`
    3. `swap(3, 8)` `[22, 2, 18, 21, 33, 9, 15, 44, 31]`
    4. `21 < 22`（跳过） `33 > 22` `i = 4`
    5. `31, 44 > 22`（跳过） `15 < 22` `j = 6`
    6. `swap(4, 6)` `[22, 2, 18, 21, 15, 9, 33, 44, 31]`
    7. `15, 9 < 22` 跳过，`i = 6` `j = 6` 跳出循环
    8. `arr[6] = 33 > 22` `j--` `swap(0, 5)` `[9, 2, 18, 21, 15, 22, 33, 44, 31]` 返回 `j = 5`
2. `QuickSort(arr, 0, 4)` 和 `QuickSort(arr, 6, 8)`
3. `QuickSort(arr, 0, 4)` => `partition(arr, 0, 4)` `[9, 2, 18, 21, 15]` `pivot = 9, i = 1, j = 4`
    1. `2 < 9` （跳过） `18 > 9` `i = 2`
    2. `15, 21, 18 > 9` （跳过） `j = 2` 跳出循环
    3. `arr[j] = 18 > 9` `j--` `swap(0, 1)` `[2, 9, 18, 21, 15]` 返回 `j = 1`
4. `QuickSort(arr, 0, 0)`（跳过） 和 `QuickSort(arr, 2, 4)`
5. `QuickSort(arr, 2, 4)` => `partition(arr, 2, 4)` `[18, 21, 15]` `pivot = 18, i = 3, j = 4`
    1. `21 > 18` `i = 3`
    2. `15 < 18` `j = 4`
    3. `swap(3, 4)` `[18, 15, 21]` `j = 4` 跳出循环
    4. `arr[4] = 21 > 18` `j--` `swap(2, 3)` `[15, 18, 21]` 返回 `j = 3`
6. `QuickSort(arr, 2, 2)`（跳过） 和 `QuickSort(arr, 4, 4)`（跳过）
7. 回到 `QuickSort(arr, 6, 8)` => `partition(arr, 6, 8)` `[33, 44, 31]` `pivot = 33, i = 7, j = 8`
    1. `44 > 33` `i = 7`
    2. `31 < 33` `j = 8`
    3. `swap(7, 8)` `[33, 31, 44]` `j = 8` 跳出循环
    4. `arr[8] > 33` `j--` `swap(6, 7)` `[31, 33, 44]` 返回 `j = 7`
8. `QuickSort(arr, 6, 6)`（跳过） 和 `QuickSort(arr, 8, 8)`（跳过）
9. 返回数组 `[2, 9, 15, 18, 21, 22, 31, 33, 44]` 完成排序


## 三种方式对比

![GIF.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b05a51f75eb4f16894154363544b07f~tplv-k3u1fbpfcp-watermark.image?)

## 优化角度

分析上面三个版本的实现，我们可以发现，在随机化越高的情况下，快速排序所用的轮次会越少，所以一般我们可以通过打乱数组后进行排序，效率更高

```js
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
var sortArray = function(arr){
  // 排序前先打乱其顺序
  shuffle(arr)
  return QuickSort(arr, 0, arr.length - 1)
}
```

## 完整代码

```js
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
```

### 再补一个三路快排

```js
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
```

## 算法复杂度

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(nlogn) | O(nlogn) | O(n^2) | O(n) | in-place | 不稳定

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/QuickSort)

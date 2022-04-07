---
title: 排序算法 - 冒泡排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 冒泡
categories:
 - 技术
comments: true
date: 2022-04-07 11:35
---

# 冒泡排序

## 描述

冒泡排序是一种简单的排序算法。 它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。 

走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

## 编码实现

简单来说，冒泡排序就是通过比较相邻元素，交换两个元素位置针对所有的元素作同样的工作之后，排序就完成了

* 首先用一个外循环来循环数组的所有元素
* 然后将当前循环到的元素与其他元素比较换位

```js
function swap(i,j,arr){
  var temp = arr[j]
  arr[j] = arr[i]
  arr[i] = temp
}
var bubbleSort = (arr) => {
  let n = arr.length
  for (let i = 0; i < n - 1; i++) {
    //外循环 看目前排了几个有序的元素
    let position = n - 1 - i
    for (let j = 0; j < position; j++) {
      // 内循环比较其他元素
      // 每次走完这个循环之后，就会有一个元素被冒到  position 的位置
      // (position, n) 有序的区间
      // 而我们要接着走的是 (0, position) 这个无序的区间
      if(arr[j] > arr[j + 1]){
        swap(arr, j, j + 1)
      }
    }    
    /* 
    当然也可以这样写
    let j = 0
    while (j < position) {
      if(arr[j] > arr[j + 1]){
        swap(arr, j, j + 1)
      }
      j++
    }
    */
  }
  return arr
}

```
## 复杂度
平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(n²) | O(n) | O(n²) | O(1) | in-place | 稳定
无| 当输入的数据已经是正序时 | 当输入的数据是反序时 | 

### 优化角度

#### 某一趟未交换时可提前退出

```js
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
```

#### 记录最后一次交换位置

```js
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
```

#### 双向冒泡排序

##### 描述
双向冒泡排序是冒泡排序的一个简易升级版，其原理是从两个方向分别排序，第一轮找出最大的放在后面，第二轮找出最小的放在前面，通过逐渐缩短查找范围的方式，因此性能会比冒泡排序好一点

##### 编码实现
首先它既然是从两个方向查找的，我们需要定义前后两个下标变量，方便我们来定位当前的查找区间，并且在每一次查找之后需要缩短查找的范围

* 
```js
var bubbleSort = arr => {
  let low = 0
  let high = arr.length - 1
  let pos, i
  while (low < high) {
    //当 low >= high 的时候，双向的区间都已经有序，则跳出循环 
    i = low
    while (i < high) {
      //第一轮 从(low, high) 区间开始 查找最大的放在 high 位
      if(arr[i] > arr[i + 1]){
        swap(arr, i, i + 1)
        pos = i
      }
      i++
    }
    //第一轮 从(low, pos) 区间开始
    i = high = pos
    while (i > low) {
      //第二轮 从(low, pos) 区间开始 查找最大的放在 low 位
      if(arr[i] < arr[i - 1]){
        swap(arr, i, i - 1)
        pos = i
      }
      i--
    }
    // low逐渐变大 high逐渐变小
    low = pos
  }
  return arr
}
```


## 对比图


![bubble.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35304d4c250e459b8e37128ecbf67da9~tplv-k3u1fbpfcp-watermark.image?)


[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/BubbleSort)
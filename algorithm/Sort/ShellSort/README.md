---
title: 排序算法 - 希尔排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 希尔
categories:
 - 技术
comments: true
date: 2022-04-07 17:35
---
# 希尔排序

## 描述

希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

本质上是对插入排序的一种优化，它利用了插入排序的简单，又克服了插入排序每次只交换相邻两个元素的缺点。

## 编码实现

通过每一轮的调控，让整个数组有序

* 外层是一个调控增量的循环，`gap >>= 1` 意味着 `gap` 每次都缩小一半，相当于除 2
* 内部是一个插入排序
* 划分 `gap` 之后，可以看作是 `[0, ... i - gap, i]` 的一组数组进行插入排序
* 随着 `gap` 的逐渐缩小，最后一轮为 `gap = 1` 的插入排序时，数组已经实际上基本有序，使用插入排序会得到最高的效率

```js
var ShellSort = arr => {
  let n = arr.length
  for (let gap = n >> 1; gap > 0; gap >>= 1) {
    for (let i = gap; i < n; i++) {
      let x = arr[i]
      let j = i - gap
      while (j >= 0 && x < arr[j]){
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = x
    }
  }
  return arr
}
```

参考动图可以理解的比较直观

![GIF.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc39e63e4e4242869fea7cf187339f2e~tplv-k3u1fbpfcp-watermark.image?)

## 优化角度

由上可知，增量序列的选择时决定希尔排序效率的关键，如果增量序列每次都无法调整位置，会堆积到最后一趟为 1 的时候大量移动

> 增量元素不互质，则小增量可能根本不起作用

### Knuth 增量序列实现


```js
var ShellSort = arr => {
  let n = arr.length
  let maxGap = 1;
  while (maxGap <= n / 3) {
      maxGap = maxGap * 3 + 1;
  }
  for (let gap = maxGap; gap > 0; gap = (gap - 1) / 3) {
    for (let i = gap; i < n; i++) {
      let x = arr[i]
      let j = i - gap
      while (j >= 0 && x < arr[j]){
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = x
    }
  }
  return arr
}
```

![GIF.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29be25baccb8412487e269834ef95942~tplv-k3u1fbpfcp-watermark.image?)

## 对比

![GIF.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbf904474ad947aca0ea8b686e73129d~tplv-k3u1fbpfcp-watermark.image?)


## 算法复杂度

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---|
O(nlog n) | O(nlog2 n) | O(nlog2 n) | O(1) | in-place | 不稳定

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/ShellSort)
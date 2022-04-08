---
title: 排序算法 - 计数排序 （JavaScript实现）
tags: 
 - JavaScript
 - 算法
 - 排序算法
 - 计数排序
categories:
 - 技术
comments: true
date: 2022-04-08 16:35
---
# 计数排序

## 描述

计数排序（Counting sort）是一种稳定的线性时间排序算法。它的复杂度为 `Ο(n+k)`（其中 `k` 是整数的范围大小）

## 基本思想

对于给定的输入序列中的每一个元素x，确定该序列中值小于x的元素的个数（此处并非比较各元素的大小，而是通过对元素值的计数和计数值的累加来确定）。然后顺序输出


## 实现

```js
var CountingSort = (arr) => {
  // 判空及防止数组越界
  if (arr == null || arr.length <= 1) return arr;
  // 找最大最小
  let min = Math.min(...arr)
  let range = Math.max(...arr) - min + 1
  // 建立长度为 range 的数组，下标 0~8 对应数字 1~9
  let counting = new Array(range).fill(0)
  // 遍历 arr 中的每个元素
  for (const x of arr) {
    // 将每个整数出现的次数统计到计数数组中对应下标的位置
    counting[x - min] += 1
  }
  // 记录前面比自己小的数字的总数
  let preCounts = 0
  for (let i = 0; i < counting.length; i++) {
    // 将 counting 计算成当前数字在结果中的起始下标位置。位置 = 前面比自己小的数字的总数。
    preCounts += counting[i]
    // 当前的数字比下一个数字小，累计到 preCounts 中
    counting[i] = preCounts - counting[i]
  }
  let result = new Array(arr.length)
  for (const x of arr) {
    // counting[x - 1] 表示此元素在结果数组中的下标
    let index = counting[x - min]
    result[index] = x
    // 更新 counting[x - 1]，指向此元素的下一个下标
    counting[x-min]+=1
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = result[i]
  }
  return arr
}
```

![GIF.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f208a03b14fa4c2c9ecd1f55feba7e42~tplv-k3u1fbpfcp-watermark.image?)

## 过程分析

假如当前输入 `[0,2,3,4,1,5,3,1,6,3,6,7,1,2]`

1. 找出 `max = 7` 和 `min = 0`，生成一个数组 `counting = [0, 0, 0, 0, 0, 0, 0, 0]` 用于计数
2. 遍历 `arr` 对每个数进行收集， `[1, 3, 2, 3, 1, 1, 2, 1]`
3. 记录比自己小的数字的总数 `counting = [0, 1, 4, 6, 9, 10, 11, 13]`
4. 初始化新数组 `[empty × 14]`，再遍历 `arr`
    1. `x = 0`, `counting[0] = 0` `counting[0]++`
        1. `result = [0, empty × 13]`
        2. `counting = [1, 1, 4, 6, 9, 10, 11, 13]`
    2. `x = 2`, `counting[2] = 4` `counting[2]++`
        1. `result = [0,  empty × 3, 2,  empty × 9]`
        2. `counting = [1, 1, 5, 6, 9, 10, 11, 13]`
    3. `x = 3`, `counting[3] = 6` `counting[3]++`
        1. `result = [0,  empty × 3, 2,  empty × 1, 3, empty × 7]`
        2. `counting = [1, 1, 5, 7, 9, 10, 11, 13]`
    4. `x = 4`, `counting[4] = 9` `counting[4]++`
        1. `result = [0,  empty × 3, 2,  empty × 1, 3, empty × 2, 4, empty × 4]`
        2. `counting = [1, 1, 5, 7, 10, 10, 11, 13]`
    5. `x = 1`, `counting[1] = 1` `counting[1]++`
        1. `result = [0, 1, empty × 2, 2,  empty × 1, 3, empty × 2, 4, empty × 4]`
        2. `counting = [1, 2, 5, 7, 10, 10, 11, 13]`
    5. `x = 5`, `counting[5] = 10` `counting[5]++`
        1. `result = [0, 1, empty × 2, 2,  empty × 1, 3, empty × 2, 4, 5, empty × 3]`
        2. `counting = [1, 2, 5, 7, 10, 11, 11, 13]`
    6. `x = 3`, `counting[3] = 7` `counting[3]++`
        1. `result = [0, 1, empty × 2, 2,  empty × 1, 3, 3, empty × 1, 4, 5, empty × 3]`
        2. `counting = [1, 2, 5, 8, 10, 11, 11, 13]`
    7. `x = 1`, `counting[1] = 2` `counting[1]++`
        1. `result = [0, 1, 1, empty × 1, 2,  empty × 1, 3, 3, empty × 1, 4, 5, empty × 3]`
        2. `counting = [1, 3, 5, 8, 10, 11, 11, 13]`
    8. `x = 6`, `counting[6] = 11` `counting[6]++`
        1. `result = [0, 1, 1, empty × 1, 2,  empty × 1, 3, 3, empty × 1, 4, 5, 6, empty × 2]`
        2. `counting = [1, 3, 5, 8, 10, 11, 12, 13]`
    9. `x = 3`, `counting[3] = 8` `counting[3]++`
        1. `result = [0, 1, 1, empty × 1, 2,  empty × 1, 3, 3, 3, 4, 5, 6, empty × 2]`
        2. `counting = [1, 3, 5, 9, 10, 11, 13, 13]`
    10. `x = 6`, `counting[6] = 12` `counting[6]++`
        1. `result = [0, 1, 1, empty × 1, 2,  empty × 1, 3, 3, 3, 4, 5, 6, 6, empty × 1]`
        2. `counting = [1, 3, 5, 9, 10, 11, 13, 13]`
    11. `x = 7`, `counting[6] = 13` `counting[7]++`
        1. `result = [0, 1, 1, empty × 1, 2,  empty × 1, 3, 3, 3, 4, 5, 6, 6, 7]`
        2. `counting = [1, 3, 5, 9, 10, 11, 13, 14]`
    12. `x = 1`, `counting[1] = 3` `counting[1]++`
        1. `result = [0, 1, 1, 1, 2,  empty × 1, 3, 3, 3, 4, 5, 6, 6, 7]`
        2. `counting = [1, 4, 5, 9, 10, 11, 13, 14]`
    13. `x = 2`, `counting[2] = 5` `counting[2]++`
        1. `result = [0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 5, 6, 6, 7]`
        2. `counting = [1, 4, 6, 9, 10, 11, 13, 14]`
        
5. 最后输出数组 `[0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 5, 6, 6, 7]`
    
## 算法复杂度

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(n+k) | O(n+k) | O(n+k) | O(n+k) | out-place | 稳定

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/CountingSort)

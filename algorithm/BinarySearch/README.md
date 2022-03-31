---
title: 二分查找 - 算法（JavaScript）
tags: 
 - 二分查找
 - 算法
 - JavaScript
categories:
 - 技术
comments: true
date: 2020-03-30 19:23
---

# 二分查找

>搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半

讲人话就是：每次都取中间元素，直到左右指针互相碰撞时为止

## 应用

一般用于一组有序元素的查找，例如一组学生中找到分数等于85的那个同学

[704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

## binarySearch 方法

```js
/**
 * binarySearch
 * @param {number[]} list 已经排序数组
 * @param {number} target 查找对象
 * @return {number} 找到返回下标，没找到返回 -1
 */
function binarySearch(list, target){
  
}

```


## 先写测试用例

写一个跑测试用例的方法，接收一组测试用例和执行函数，当不匹配时打印
```js
const runTests = (tests, fn) => {
  let pass = tests.every(( { input, output } ) => {
    const result = fn(...input);
    if(!(JSON.stringify(result) === JSON.stringify(output))){
      console.log(input, output, result);
      return false;
    }
    return true
  })
  return console.log(pass ? '通过' : 'gg')
}

const Tests = [
  
]

runTests(Tests, binarySearch)
```

Tests要怎么写？一个个写显然太麻烦可以这样写

```js
const Tests = [
  ...new Array(12).fill(0)
  .map((item, index) => ({ 
    input:[new Array(10).fill(0).map((item, i) => i), index], 
    output: index > 9 ? -1 : index
  }))
]
[
  { input: [ [0,1,2,3,4,5,6,7,8,9], 0 ], output: 0 },
  ...
  { input: [ [0,1,2,3,4,5,6,7,8,9], 9 ], output: 9 },
  ...
  { input: [ [0,1,2,3,4,5,6,7,8,9], 11 ], output: -1 }
]
```

当然你也可以加些间隔
```js
const Tests = [
  ...new Array(11).fill(0).map((item, index) => ({ 
    input:[new Array(10).fill(0).map((item, i) => i * 5), index * 5], 
    output: index > 9 ? -1 : index
  }))
]

[
  { input: [ [0,5,10,15,20,25,30,35,40,45], 0 ], output: 0 },
  ...
  { input: [ [0,5,10,15,20,25,30,35,40,45], 45 ], output: 9 },
  ...
  { input: [ [0,5,10,15,20,25,30,35,40,45], 55 ], output: -1 },
]
```

直接抽离成函数
```js
const createTests = (len, gap, other) => new Array(len + other).fill(0)
.map((item, index) => ({ 
  input:[new Array(len).fill(0).map((item, i) => i * gap), index * gap], 
  output: index > len - 1 ? -1 : index
}))

const Tests = [
  ...createTests(10, 1, 2),
  ...createTests(10, 5, 2),
]
```

## 开始编码

定义左右指针`i`,`j` 当满足 `while` 时证明已经找到/没法再找了

```js
function binarySearch(list, target){
  let l = 0
  let r = list.length - 1
  while(l < r){

  }
  return list[l] === target ? l : -1
}
```

接着写循环里面内容

1. 计算出中间元素下标
2. 判断中间元素缩短查找范围

```js
while(l < r){
  let mid = l + ((r - l) >> 1) 
  if(list[mid] >= target) r = mid
  else l = mid + 1
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6849d354c9cf4276bbd1a97237ad59f2~tplv-k3u1fbpfcp-watermark.image?)

这个写法是判断右边元素往左边靠拢的写法，当遇到重复的有序数组，例如 `[0,1,1,1,1,2]`
会找到第一个 1 的位置，如果要找到最后一个 1 要怎么写？

反过来写就行拉

```js
/**
 * binarySearch
 * @param {number[]} list 已经排序数组
 * @param {number} target 查找对象
 * @return {number} 找到返回下标，没找到返回 -1
 */
function binarySearch(list, target){
  let l = 0
  let r = list.length - 1
  while(l < r){
    let mid = l + ((r - l + 1) >> 1) // 这里得处理下溢出的情况
    if(list[mid] <= target) l = mid // 左往右缩范围
    else r = mid - 1
  }
  return list[l] === target ? l : -1
}
```


[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/BinarySearch)

[博客地址](https://luoyuda.github.io/)
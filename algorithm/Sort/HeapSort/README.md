---
title: 排序算法 - 堆排序 （JavaScript实现）
tags:
  - JavaScript
  - 算法
  - 排序算法
  - 堆排序
categories:
  - 技术
comments: true
date: '2022-04-10 20:35'
theme: devui-blue
---
一起养成写作习惯！这是我参与「掘金日新计划 · 4 月更文挑战」的第10天，[点击查看活动详情](https://juejin.cn/post/7080800226365145118 "https://juejin.cn/post/7080800226365145118")。

## 堆排序

利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

1. 最大堆
   1. 堆内所有节点都大于或等于其孩子的节点值
   2. 堆顶元素就是堆内的最大值
2. 最小堆
   1. 堆内所有节点都小于或等于其孩子的节点只
   2. 堆顶元素就是堆内最大值

## 实现一个堆

```js
class Heap {
  constructor(size){ }
  get size() { }
  // 比较函数
  handle(i, j){ }
  // 添加元素
  add(el){ }
  // 弹出元素
  pop(){ }
  // 上浮
  up(){ }
  // 下沉
  down(){ }
  // 获取堆顶元素
  peek(){ }
}
class MaxHeap extends Heap {
  handle(i, j){ }
}
class MinHeap extends Heap {
  handle(i, j){ }
}
```

写一些辅助函数

```js
const helper = {
  // 交换数组中的值
  swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  },
  // 获取父元素的下标
  parent(i){
    return i >> 1
  },
  // 获取左孩子下标
  left(i){
    return i * 2
  },
  // 获取右孩子下标
  right(i){
    return i * 2 + 1
  }
}
```

#### 构造函数

```js
constructor(size){
  // 开辟数组空间 heap[0] 表示堆的个数
  this.heap = new Array(size + 1);
  // 不真的使用第一个下标，方便后续定位
  this.heap[0] = 0
}
```

#### 获取堆当前个数

```js
// 直接返回数组第一项
get size() { return this.heap[0] }
```

#### 获取堆顶元素

```js
peek(){
   return this.heap[1]
}
```

#### 比较函数

```js
handle(i, j){
  return this.heap[i] < this.heap[j]
}
```

##### 最大堆、最小堆继承父类，修改`handle`函数

```js
class MaxHeap extends Heap {
  handle(i, j){
    return this.heap[i] > this.heap[j]
  }
}
class MinHeap extends Heap {
  handle(i, j){
    return this.heap[i] < this.heap[j]
  }
}
```

#### 添加元素

将元素插入到完全二叉树的最后一个节点，并执行堆上浮操作

```js
// 添加元素
add(el){
  if(this.size >= this.heap.length) return -1
  // 往尾部插入元素后进行上浮操作
  this.heap[0] += 1
  this.heap[this.size] = el
  this.up()
  return el
}
```

##### 上浮

将节点与其父节点进行比较，如果不满足堆条件则和父节点交换，直到满足条件

```js
up(){
  let i = this.size
  let j = helper.parent(i)
  while (this.handle(i, j) && i > 1){
    helper.swap(this.heap, i, j)
    i = j
    j = helper.parent(i)
  }
}
```

#### 弹出元素

将堆顶元素删除，把最后一个节点复制到堆顶，然后将堆顶元素执行下沉操作

```js
// 弹出元素
pop(){
  if(!this.size) return -1
  // 弹出堆顶后将最后一个元素放置到堆顶，然后执行下沉操作
  let el = this.peek()
  helper.swap(this.heap, 1, this.size)
  this.heap[this.size] = undefined
  this.heap[0] -= 1
  this.down()
  return el
}
```

##### 下沉

将节点与子节点比较，与较小/较大的节点交换，直到满足条件

```js
down(){
  let i = 1
  while(i < this.size && i <= this.size / 2){
    // 获取左右孩子下标
    let l = helper.left(i)
    let r = helper.right(i)
    if(this.handle(r, i) || this.handle(l, i)){
      // 如果有一个不满足，则进入判断
      let j = this.handle(r, l) ? r : l
      helper.swap(this.heap, i, j)
      i = j
    }else{
      // 找到合适位置，跳出
      break
    }
  }
}
```

## 完整代码

```js
const helper = {
  swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  },
  parent(i){
    return i >> 1
  },
  left(i){
    return i * 2
  },
  right(i){
    return i * 2 + 1
  }
}
class Heap {
  constructor(size){
    // 开辟数组空间 heap[0] 表示堆的个数
    this.heap = new Array(size + 1);
    this.heap[0] = 0
  }
  get size() { return this.heap[0] }
  handle(i, j){
    return this.heap[i] < this.heap[j]
  }
  // 添加元素
  add(el){
    if(this.size >= this.heap.length) return -1
    // 往尾部插入元素后进行上浮操作
    this.heap[0] += 1
    this.heap[this.size] = el
    this.up()
    return el
  }
  // 弹出元素
  pop(){
    if(!this.size) return -1
    // 弹出堆顶后将最后一个元素放置到堆顶，然后执行下沉操作
    let el = this.peek()
    helper.swap(this.heap, 1, this.size)
    this.heap[this.size] = undefined
    this.heap[0] -= 1
    this.down()
    return el
  }
  // 上浮
  up(){
    let i = this.size
    let j = helper.parent(i)
    while (this.handle(i, j) && i > 1){
      helper.swap(this.heap, i, j)
      i = j
      j = helper.parent(i)
    }
  }
  // 下沉
  down(){
    let i = 1
    while(i < this.size && i <= this.size / 2){
      let l = helper.left(i)
      let r = helper.right(i)
      if(this.handle(r, i) || this.handle(l, i)){
        let j = this.handle(r, l) ? r : l
        helper.swap(this.heap, i, j)
        i = j
      }else{
        break
      }
    }
  }
  // 获取堆顶元素
  peek(){
    return this.heap[1]
  }
}
class MaxHeap extends Heap {
  handle(i, j){
    return this.heap[i] > this.heap[j]
  }
}
class MinHeap extends Heap {
  handle(i, j){
    return this.heap[i] < this.heap[j]
  }
}
var sortArray = function(arr){
  let n = arr.length
  let heap = new MinHeap(n)
  for (let i = 0; i < n; i++) {
    heap.add(arr[i])
  }
  for (let i = 0; i < n; i++) {
    arr[i] = heap.pop()
  }
  return arr
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f508c99ca5f5422ea5882b692bb4f309~tplv-k3u1fbpfcp-watermark.image?)

## 执行过程

![GIF.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d63e7a6b851b42599fc47acb0ee764c0~tplv-k3u1fbpfcp-watermark.image?)


## 算法复杂度

平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 排序方式 | 稳定性
----|---|---|---|---|---
O(nlogn) | O(nlogn) | O(nlogn) | O(n) | in-place | 不稳定

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/algorithm/Sort/HeapSort)

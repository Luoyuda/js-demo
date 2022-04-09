---
title: 数据结构 - 堆（JavaScript实现）
tags: 
 - 数据结构
 - 堆
 - JavaScript
categories:
 - 技术
comments: true
date: 2020-06-24 19:23
updated: 2020-06-24 19:23
---

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/data-structures/Heap)

# 堆

堆 是一种特别的二叉树，满足以下条件的二叉树，可以称之为堆

1. 完全二叉树
2. 每一个节点的值都必须 大于等于或者小于等于 其孩子节点的值。

## 特点

1. 可以在 O(logN) 的时间复杂度内向 堆 中插入元素；
2. 可以在 O(logN) 的时间复杂度内向 堆 中删除元素；
3. 可以在 O(1) 的时间复杂度内获取 堆 中的最大值或最小值。
   
## 分类

1. 最大堆
   1. 堆内所有节点都大于或等于其孩子的节点值
   2. 堆顶元素就是堆内的最大值
2. 最小堆
   1. 堆内所有节点都小于或等于其孩子的节点只
   2. 堆顶元素就是堆内最大值

## 堆操作

1. 堆上浮
   1. 将节点与其父节点进行比较，如果不满足堆条件则和父节点交换，直到满足条件
2. 堆下沉
   1. 将节点与子节点比较，与较小/较大的节点交换，直到满足条件
3. 添加元素
   1. 将元素插入到完全二叉树的最后一个节点，并执行堆上浮操作
4. 删除元素
   1. 将堆顶元素删除，把最后一个节点复制到堆顶，然后将堆顶元素执行下沉操作

## 完全二叉树与数组转换

```
tree
      1
    2   3
  4  5 6  7
==>
res = [7, 1, 2, 3, 4, 5, 6, 7]
res[0]: 完全二叉树的大小 len
父节点： n / 2
子节点： left: 2n、right: 2n + 1
是否叶子节点： n > len / 2
```

## 编码实现

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
```

## 时间复杂度

| 插入元素 | 获取堆顶元素 | 删除堆顶元素 | 创建「堆」 |
| ------ | ------ | --------- | -------- |
| O(logN)   | O(1)   | O(logN)    | O(logN)    |

### 空间复杂度

O(n)
---
title: LRU 缓存算法 （JavaScript实现）
tags: 
 - 数据结构
 - LRU
 - JavaScript
categories:
 - 技术
comments: true
date: 2022-04-14 21:23
theme: devui-blue
---


## 是什么

`LRU（Least Recently Used）`，即**最近最少使用**，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。

## 方法

* `LRUCache(capacity)` 以正整数作为容量 `capacity` 初始化 `LRU` 缓存
* `get(key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
* `put(key, value)` 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组`「关键字-值」`。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

![GIF.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd64f76dca9f4866abd74423117c0940~tplv-k3u1fbpfcp-watermark.image?)

[leetcode 习题](https://leetcode-cn.com/problems/OrIXps/) 用于验证

## array + hash 版本

```js
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.keys = []
  this.values = {}
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const value = this.values[key]
  // 如果不存在，返回 -1
  if (value === undefined) return -1
  // 更新 key 的位置
  this.update(key)
  return value
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.update = function (key) {
  for (let i = 0; i < this.keys.length; i++) {
    if (key === this.keys[i]) {
      // 找到 key 的位置，把前面的元素往后移动一位
      for (let j = i; j >= 1; j--) {
        this.keys[j] = this.keys[j - 1]
      }
      // 将 key 移动到首位
      this.keys[0] = key
      break
    }
  }
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const val = this.values[key]
  // 更新值
  this.values[key] = value
  if (val !== undefined) {
    // 如果之前存在值，更新位置
    this.update(key)
  } else {
    // 超出先删除
    if (this.keys.length >= this.capacity) {
      delete this.values[this.keys.pop()]
    }
    // 往第一个位置插入
    this.keys.unshift(key)
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03b1cad336bc4dc09e2c086b22caf894~tplv-k3u1fbpfcp-watermark.image?)

虽然通过，但是效率并不高

## 采用双向链表优化

### 更新过程

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10fc81f64f0f44f38ce9dea72444249a~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09be8bbf192147dfb5804f37c25169f6~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88e0fde9f6ab41feb7b5b1d950205619~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36f258d4fcbb4be1959c16f262b3dfbc~tplv-k3u1fbpfcp-watermark.image?)

```js
/**
 * @param {number} k
 * @param {number} v
 * @param {Node} l
 * @param {Node} r
 */
function Node(k, v, l, r) {
  this.l = l
  this.r = r
  this.k = k
  this.v = v
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.size = capacity
  this.map = new Map()
  this.head = new Node(-1, -1)
  this.tail = new Node(-1, -1)
  this.head.r = this.tail
  this.tail.l = this.head
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map.get(key)
  if (!node) return -1
  this.update(node)
  return node.v
}

/**
 * @param {Node} node
 * @return {void}
 */
LRUCache.prototype.update = function (node) {
  // 先从链表中提取出来
  this.delete(node)
  // 在头节点位置插入
  node.r = this.head.r
  node.l = this.head
  this.head.r.l = node
  this.head.r = node
}

/**
 * @param {Node} key
 * @return {void}
 */
LRUCache.prototype.delete = function (node) {
  if (node.l) {
    // 断开节点 1 -> 2 -> 3
    // 1 -> 3
    let l = node.l
    l.r = node.r
    node.r.l = l
  }
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = this.map.get(key) || new Node(key, value)
  // 更新节点
  node.v = value
  this.map.set(key, node)
  // 更新位置
  this.update(node)
  if (this.map.size > this.size) {
    // 删除队尾元素
    let del = this.tail.l
    this.map.delete(del.k)
    this.delete(del)
  }
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45e8ff4909a440fdbe66e0c30ca577ea~tplv-k3u1fbpfcp-watermark.image?)

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/data-structures/cache/LRU)
---
title: LFU 缓存算法 （JavaScript实现）
tags: 
 - 数据结构
 - LFU
 - JavaScript
categories:
 - 技术
comments: true
date: 2022-04-15 21:23
theme: devui-blue
---

## 是什么

**最不经常使用算法（LFU）：** 这个缓存算法使用一个计数器来记录条目被访问的频率。通过使用LFU缓存算法，最低访问数的条目首先被移除。这个方法并不经常使用，因为它无法对一个拥有最初高访问率之后长时间没有被访问的条目缓存负责。[leetcode真题地址](https://leetcode-cn.com/problems/lfu-cache/)

## 方法

* `LFUCache(capacity)` - 用数据结构的容量 `capacity` 初始化对象
* `get(key)` - 如果键 `key` 存在于缓存中，则获取键的值，否则返回 -1 
* `put(key, value)` - 如果键 `key` 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最近最久未使用 的键。

## 流程拆解

我们需要 `map` 和双向链表的结构以达到 `get` 和 `put` 的时间复杂度为 `O(1)`

* `nodeMap`：用于存储节点信息
* `freqMap`：按使用频率存储双向链表结构，方便定位

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f520ccc7716408bb11b84b1c287469b~tplv-k3u1fbpfcp-watermark.image?)

当我们调用 `put(1,1)` 方法时是这样的，将其作为插入到 `key = 1` 双向链表中的第一个元素，然后更新 `minFreq` 为 1

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cc051a2ece5417098735243e30cd30e~tplv-k3u1fbpfcp-watermark.image?)

`put(2,2)`：将其作为插入到 `key = 1` 双向链表中的第一个元素，然后更新 `minFreq` 为 1

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09ace4cf56994eb9bfb4bdaa7c6dc3bc~tplv-k3u1fbpfcp-watermark.image?)

`get(1)`：此时通过 `nodeMap` 中获取值，然后更新 `freqMap` 中的 `key = 2` 双向链表

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/881602da2c584756b35b253d68dbcf85~tplv-k3u1fbpfcp-watermark.image?)

`put(3,3)`：此时因为个数已经满了，需要删除最不经常使用的元素，通过 `minFreq` 去定位找到目标链表，并取出最后一个元素

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1a8836f1916453fb0a9da9f0aa4f6dd~tplv-k3u1fbpfcp-watermark.image?)

将 `node-2` 删除后，将 `node-3` 插入，并更新 `minFreq` 为 1

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c33bb0a4ed5442c78b84969b9a564157~tplv-k3u1fbpfcp-watermark.image?)

## 代码实现

```js
/**
 * @param {number} k
 * @param {number} v
 * @param {number} c
 * @param {Node} l
 * @param {Node} r
 */
function ListNode(k, v, c, l, r) {
  this.k = k
  this.v = v
  this.c = c || 1
  this.l = l
  this.r = r
}
/**
 * 双向链表类
 */
function Linklist() {
  this.head = new ListNode(-1, 'head')
  this.tail = new ListNode(-1, 'tail')
  this.head.r = this.tail
  this.tail.l = this.head
  this.length = 0
}
/**
 * 往头部插入元素
 * @param {Node} node
 */
Linklist.prototype.add = function (node) {
  let r = this.head.r
  node.r = r
  node.l = this.head
  r.l = node
  this.head.r = node
  this.length++
}
/**
 * 删除某个节点
 * @param {Node} node
 */
Linklist.prototype.delete = function (node) {
  if (node.l) {
    let l = node.l
    l.r = node.r
    node.r.l = l
  }
  this.length--
}
/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.capacity = capacity
  // 当前最小的使用次数的链表位置
  this.minFreq = 1
  // 存储节点
  this.nodeMap = new Map()
  // 存储次数跟链表映射关系
  this.freqMap = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (this.capacity === 0) return -1
  const node = this.nodeMap.get(key)
  if (!node) return -1
  // 更新位置
  this.update(node)
  return node.v
}

/**
 * @param {Node} node
 */
LFUCache.prototype.update = function (node) {
  // 从旧链表中删除节点
  let last = this.freqMap.get(node.c)
  last.delete(node)
  if (!last.length && node.c === this.minFreq) {
    // 如果链表为空，且当前次数是最低次数的链表值，最低次数的指针 + 1
    this.minFreq++
  }
  // 从新链表头部插入
  let now = this.freqMap.get(++node.c)
  if (!now) {
    now = new Linklist()
    this.freqMap.set(node.c, now)
  }
  now.add(node)
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity === 0) return
  let node = this.nodeMap.get(key)
  if (!node) {
    // 不存在节点，创建
    node = new ListNode(key, value)
    if (!this.freqMap.get(node.c)) {
      this.freqMap.set(node.c, new Linklist())
    }
    const nodes = this.freqMap.get(node.c)
    if (this.nodeMap.size >= this.capacity) {
      // 个数超过时，从最低使用次数的链表中的尾部移除元素
      let minNodes = this.freqMap.get(this.minFreq)
      let minNode = minNodes.tail.l
      this.nodeMap.delete(minNode.k)
      minNodes.delete(minNode)
    }
    // 因为新增，必然使用此时最低，回归到1
    this.minFreq = 1
    this.nodeMap.set(key, node)
    nodes.add(node)
  } else {
    node.v = value
    this.update(node)
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f16fef87554d44708e2acf622a500ddf~tplv-k3u1fbpfcp-watermark.image?)

## 缺点

存在历史数据影响将来数据的"缓存污染"问题，累计的数据越多，对新加的数据可能起不到缓存的作用。比如历史记录中前 `9` 条数据都是 `100+` 的次数，后面新数据上来，使用次数赶不上历史数据时会优先被淘汰。

无法对一个拥有最初高访问率之后长时间没有被访问的条目缓存负责

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/data-structures/cache/LFU)
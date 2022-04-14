// 实现 LRUCache 类：
// LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

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
const lRUCache = new LRUCache(2)
console.log(lRUCache.put(1, 1))
console.log(lRUCache.put(2, 2))
console.log(lRUCache.get(1))
console.log(lRUCache.put(3, 3))
console.log(lRUCache.get(2))
console.log(lRUCache.put(4, 4))
console.log(lRUCache.get(1))
console.log(lRUCache.get(3))
console.log(lRUCache.get(4))

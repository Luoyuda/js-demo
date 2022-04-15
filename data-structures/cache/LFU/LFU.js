// 实现 LFUCache 类：

// LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象
// int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1 。
// void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，
// 请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，
// 移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）
// 时，应该去除 最近最久未使用 的键。
// 为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。使用计数最小的键是最久未使用的键。

// 当一个键首次插入到缓存中时，它的使用计数器被设置为 1(由于 put 操作)。
// 对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。
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

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// const fns = ['get', 'put', 'get', 'put', 'put', 'get', 'get']
// const inputs = [[2], [2, 6], [1], [1, 5], [1, 2], [1], [2]]
// const fns = [
//   'put',
//   'put',
//   'get',
//   'put',
//   'get',
//   'get',
//   'put',
//   'get',
//   'get',
//   'get',
// ]
// const inputs = [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
// const result = [null, null, 1, null, -1, 3, null, -1, 3, 4]

const fns = [
  'put',
  'put',
  'put',
  'put',
  'put',
  'get',
  'put',
  'get',
  'get',
  'put',
  'get',
  'put',
  'put',
  'put',
  'get',
  'put',
  'get',
  'get',
  'get',
  'get',
  'put',
  'put',
  'get',
  'get',
  'get',
  'put',
  'put',
  'get',
  'put',
  'get',
  'put',
  'get',
  'get',
  'get',
  'put',
  'put',
  'put',
  'get',
  'put',
  'get',
  'get',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'get',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'get',
  'put',
  'get',
  'get',
  'get',
  'put',
  'get',
  'get',
  'put',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'put',
  'get',
  'get',
  'get',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'get',
  'get',
  'get',
  'put',
  'put',
  'put',
  'put',
  'get',
  'put',
  'put',
  'put',
  'put',
  'put',
  'put',
  'put',
]
const inputs = [
  [10, 13],
  [3, 17],
  [6, 11],
  [10, 5],
  [9, 10],
  [13],
  [2, 19],
  [2],
  [3],
  [5, 25],
  [8],
  [9, 22],
  [5, 5],
  [1, 30],
  [11],
  [9, 12],
  [7],
  [5],
  [8],
  [9],
  [4, 30],
  [9, 3],
  [9],
  [10],
  [10],
  [6, 14],
  [3, 1],
  [3],
  [10, 11],
  [8],
  [2, 14],
  [1],
  [5],
  [4],
  [11, 4],
  [12, 24],
  [5, 18],
  [13],
  [7, 23],
  [8],
  [12],
  [3, 27],
  [2, 12],
  [5],
  [2, 9],
  [13, 4],
  [8, 18],
  [1, 7],
  [6],
  [9, 29],
  [8, 21],
  [5],
  [6, 30],
  [1, 12],
  [10],
  [4, 15],
  [7, 22],
  [11, 26],
  [8, 17],
  [9, 29],
  [5],
  [3, 4],
  [11, 30],
  [12],
  [4, 29],
  [3],
  [9],
  [6],
  [3, 4],
  [1],
  [10],
  [3, 29],
  [10, 28],
  [1, 20],
  [11, 13],
  [3],
  [3, 12],
  [3, 8],
  [10, 9],
  [3, 26],
  [8],
  [7],
  [5],
  [13, 17],
  [2, 27],
  [11, 15],
  [12],
  [9, 19],
  [2, 15],
  [3, 16],
  [1],
  [12, 17],
  [9, 1],
  [6, 19],
  [4],
  [5],
  [5],
  [8, 1],
  [11, 7],
  [5, 2],
  [9, 28],
  [1],
  [2, 2],
  [7, 4],
  [4, 22],
  [7, 24],
  [9, 26],
  [13, 28],
  [11, 26],
]
const results = [
  null,
  null,
  null,
  null,
  null,
  -1,
  null,
  19,
  17,
  null,
  -1,
  null,
  null,
  null,
  -1,
  null,
  -1,
  5,
  -1,
  12,
  null,
  null,
  3,
  5,
  5,
  null,
  null,
  1,
  null,
  -1,
  null,
  30,
  5,
  30,
  null,
  null,
  null,
  -1,
  null,
  -1,
  24,
  null,
  null,
  18,
  null,
  null,
  null,
  null,
  14,
  null,
  null,
  18,
  null,
  null,
  11,
  null,
  null,
  null,
  null,
  null,
  18,
  null,
  null,
  -1,
  null,
  4,
  29,
  30,
  null,
  12,
  11,
  null,
  null,
  null,
  null,
  29,
  null,
  null,
  null,
  null,
  17,
  -1,
  18,
  null,
  null,
  null,
  -1,
  null,
  null,
  null,
  20,
  null,
  null,
  null,
  29,
  18,
  18,
  null,
  null,
  null,
  null,
  20,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]
const lfu = new LFUCache(10)
fns.forEach((item, index) => {
  if (results[index] != lfu[item](...inputs[index])) {
    debugger
    console.log(`${item}(${inputs[index].join(',')})`)
    // console.log(lfu.map)
  }
})

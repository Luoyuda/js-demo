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

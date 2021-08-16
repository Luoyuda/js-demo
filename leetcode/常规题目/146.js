/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 22:11:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-13 22:40:16
 * @FilePath: /js-demo/leetcode/常规题目/146.js
 */
/**
 * @param {number} capacity
146. LRU 缓存机制
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
实现 LRUCache 类：
    LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
    int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
    void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？
示例：
输入
    ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
    [null, null, null, 1, null, -1, null, -1, 3, 4]
解释
    LRUCache lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // 缓存是 {1=1}
    lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
    lRUCache.get(1);    // 返回 1
    lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
    lRUCache.get(2);    // 返回 -1 (未找到)
    lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
    lRUCache.get(1);    // 返回 -1 (未找到)
    lRUCache.get(3);    // 返回 3
    lRUCache.get(4);    // 返回 4
提示：
    1 <= capacity <= 3000
    0 <= key <= 3000
    0 <= value <= 104
    最多调用 3 * 104 次 get 和 put
 */
var LRUCache = function(capacity) {
    this.length = capacity
    this.queue = []
    this.hash = {}
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let value = this.hash[key]
    if(value == undefined) return -1
    this.update(key)
    return value
};

LRUCache.prototype.update = function(key){
    for (let i = 0; i < this.queue.length; i++) {
        const num = this.queue[i];
        if(num == key){
            for (let j = i; j >= 0; j--) {
                this.queue[j] = this.queue[j - 1]
            }
            this.queue[0] = num
            break
        }
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.hash[key] != undefined){
        this.hash[key] = value;
        this.update(key)
        return
    }
    if(this.queue.length >= this.length){
        let key = this.queue.pop()
        delete this.hash[key]
    }
    this.queue.unshift(key)
    this.hash[key] = value
};

var Node = function(k, v, l, r){
    this.l = l
    this.r = r
    this.k = k
    this.v = v
}
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.n = capacity
    this.map = new Map()
    this.head = new Node(-1, -1)
    this.tail = new Node(-1, -1)
    this.head.r = this.tail
    this.tail.l = this.head
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.map.has(key)){
        let node = this.map.get(key)
        this.update(node)
        return node.v
    }
    return -1
};

/** 
 * @param {Node} node
 * @return {void}
 */
LRUCache.prototype.update = function(node) {
    this.delete(node)
    node.r = this.head.r
    node.l = this.head
    this.head.r.l = node
    this.head.r = node
};

LRUCache.prototype.delete = function(node) {
    if(node.l){
        let l = node.l
        l.r = node.r
        node.r.l = l
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node
    if(this.map.has(key)){
        node = this.map.get(key)
        node.v = value
    }else{
        if(this.map.size === this.n){
            let del = this.tail.l
            this.map.delete(del.k)
            this.delete(del)
        }
        node = new Node(key, value)
        this.map.set(key, node)
    }
    this.update(node)
};

var funcs = ["put", "put", "get", "put", "get", "put", "get", "get", "get"]
var params = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
var results =[null, null, 1, null, -1, null, -1, 3, 4]
// var funcs = ["get","put","get","put","put","get","get"]
// var params = [[2],[2,6],[1],[1,5],[1,2],[1],[2]]
// var results = [-1,null,-1,null,null,2,6]
// var funcs = ["put","put","put","put","get","get"]
// var params = [[2,1],[1,1],[2,3],[4,1],[1],[2]]
// var results =[null,null,null,null,-1,3]
var lru = new LRUCache(2)
funcs.forEach((item, index) => {
    var res = lru[item](...params[index])
    // console.log(`${item}(${params[index].join(',')})`)
    // console.log(`res = ${res}`,`result = ${results[index]}`)
    console.log(res == results[index])
    // console.log(lru.hash)
    // console.log(lru.queue)
})
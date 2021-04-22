/*
 * @Author: xiaohuolong
 * @Date: 2021-04-21 08:34:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-21 10:45:03
 * @FilePath: /js-demo/leetcode/常规题目/622.js
 */
/* 
622. 设计循环队列
    设计你的循环队列实现。 循环队列是一种线性数据结构，
    其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
    循环队列的一个好处是我们可以利用这个队列之前用过的空间。
    在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。
    但是使用循环队列，我们能使用这些空间去存储新的值。
你的实现应该支持如下操作：
    MyCircularQueue(k): 构造器，设置队列长度为 k 。
    Front: 从队首获取元素。如果队列为空，返回 -1 。
    Rear: 获取队尾元素。如果队列为空，返回 -1 。
    enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
    deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
    isEmpty(): 检查循环队列是否为空。
    isFull(): 检查循环队列是否已满。
示例：
    MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
    circularQueue.enQueue(1);  // 返回 true
    circularQueue.enQueue(2);  // 返回 true
    circularQueue.enQueue(3);  // 返回 true
    circularQueue.enQueue(4);  // 返回 false，队列已满
    circularQueue.Rear();  // 返回 3
    circularQueue.isFull();  // 返回 true
    circularQueue.deQueue();  // 返回 true
    circularQueue.enQueue(4);  // 返回 true
    circularQueue.Rear();  // 返回 4
提示：
    所有的值都在 0 至 1000 的范围内；
    操作数将在 1 至 1000 的范围内；
    请不要使用内置的队列库。
*/
/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.q = new Array(k)
    this.length = k
    this.head = -1
    this.tail = -1
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if(this.isFull()) return false
    if(this.isEmpty()){
        this.head = 0
    }
    if(this.tail >= this.length - 1) this.tail = -1
    this.tail += 1
    this.q[this.tail] = value
    return true
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if(this.isEmpty()) return false
    this.q[this.head] = undefined
    if(this.head == this.tail){
        this.head = -1
        this.tail = -1
    }else{
        if(this.head == this.length - 1){
            this.head = -1
        }
        this.head += 1
    }
    return true
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    return this.isEmpty() ? -1 : this.q[this.head]
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    return this.isEmpty() ? -1 : this.q[this.tail]
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.tail == this.head && this.tail == -1
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.tail == ((this.head == 0 ? this.length : this.head) - 1)
};

var circularQueue = new MyCircularQueue(3); // 设置长度为 3
console.log(circularQueue.enQueue(1));  // 返回 true
console.log(circularQueue.enQueue(2));  // 返回 true
console.log(circularQueue.enQueue(3));  // 返回 true
console.log(circularQueue.enQueue(4));  // 返回 false，队列已满
console.log(circularQueue);  // 返回 3
console.log(circularQueue.Rear());  // 返回 3
console.log(circularQueue.isFull());  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue);  // 返回 3
console.log(circularQueue.enQueue(4));  // 返回 true
console.log(circularQueue.Rear());  // 返回 4
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue.enQueue(1));  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue.enQueue(2));  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue.enQueue(3));  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue.deQueue());  // 返回 true
console.log(circularQueue);  // 返回 3
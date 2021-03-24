/*
 * @Author: xiaohuolong
 * @Date: 2021-03-24 08:32:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-24 08:37:06
 * @FilePath: /js-demo/leetcode/面试金典/03.04.js
 */
/**
 * Initialize your data structure here.
面试题 03.04. 化栈为队
    实现一个MyQueue类，该类用两个栈来实现一个队列。
示例：
    MyQueue queue = new MyQueue();
    queue.push(1);
    queue.push(2);
    queue.peek();  // 返回 1
    queue.pop();   // 返回 1
    queue.empty(); // 返回 false
 */
var MyQueue = function() {
    this.enqueue = []
    this.dequeue = []
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.enqueue.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(!this.dequeue.length){
        while(this.enqueue.length){
            this.dequeue.push(this.enqueue.pop())
        }
    }
    return this.dequeue.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if(!this.dequeue.length){
        while(this.enqueue.length){
            this.dequeue.push(this.enqueue.pop())
        }
    }
    return this.dequeue[this.dequeue.length - 1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.dequeue.length && !this.enqueue.length
};

const queue = new MyQueue();
console.log(queue.push(1));
console.log(queue.push(2));
console.log(queue.peek());  // 返回 1
console.log(queue.pop());   // 返回 1
console.log(queue.empty()); // 返回 false
console.log(queue.pop());   // 返回 1

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 16:04:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 16:54:47
 * @FilePath: /js-demo/leetcode/常规题目/1670.js
 */
var FrontMiddleBackQueue = function() {
    this.head = new ListNode(0)
    this.length = 0
};

FrontMiddleBackQueue.prototype.push = function(val, index){
    if(index > this.length || index < 0) return
    let prev = this.head
    for (let i = 0; i < index; i++) {
        prev = prev.next
    }
    prev.next = new ListNode(val, prev.next)
    this.length++
    return
}

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
    return this.push(val, 0)
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
    return this.push(val, parseInt(this.length / 2))
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
    return this.push(val, this.length)
};

FrontMiddleBackQueue.prototype.pop = function(index) {
    if(index > this.length || index < 0 || this.length == 0) return -1
    let prev = this.head
    // console.log('pop-index', index)
    for (let i = 0; i < index; i++) {
        prev = prev.next
    }
    // console.log(prev)
    let cur = prev.next
    prev.next = prev.next.next
    this.length--
    return cur.val
}

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
    return this.pop(0)
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
    return this.pop(Math.ceil(this.length / 2)-1)
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
    return this.pop(this.length - 1)
};

let funcs = ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
let params = [[1], [2], [3], [4], [], [], [], [], []]
let result = [null, null, null, null, 1, 3, 4, 2, -1]

const queue = new FrontMiddleBackQueue();
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push(curr.val)
        curr = curr.next
    }
    console.log(res.join('>'))
}
for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    // console.log('func ->', func)
    // console.log('params ->', ...params[i])
    // console.log('result ->', result[i])
    let res = queue[func](...params[i])
    // printList(queue.head.next)
    console.log(res == result[i])
    // console.log(res)
}
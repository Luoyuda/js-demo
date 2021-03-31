/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 21:15:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 22:57:22
 * @FilePath: /js-demo/leetcode/面试金典/03.01.js
 */
/**
 * @param {number} stackSize
面试题 03.01. 三合一
    三合一。描述如何只用一个数组来实现三个栈。
    你应该实现push(stackNum, value)、pop(stackNum)、isEmpty(stackNum)、peek(stackNum)方法。
    stackNum表示栈下标，value表示压入的值。
    构造函数会传入一个stackSize参数，代表每个栈的大小。
示例1:
输入：
    ["TripleInOne", "push", "push", "pop", "pop", "pop", "isEmpty"]
    [[1], [0, 1], [0, 2], [0], [0], [0], [0]]
输出：
    [null, null, null, 1, -1, -1, true]
说明：当栈为空时`pop, peek`返回-1，当栈满时`push`不压入元素。
示例2:
输入：
    ["TripleInOne", "push", "push", "push", "pop", "pop", "pop", "peek"]
    [[2], [0, 1], [0, 2], [0, 3], [0], [0], [0], [0]]
输出：
    [null, null, null, null, 2, 1, -1, -1]
 */
var TripleInOne = function(stackSize) {
    this.stack = []
    this.stack0 = -1
    this.stack1 = stackSize - 1
    this.stack2 = stackSize + stackSize - 1
    this.stackSize = stackSize
};

/** 
 * @param {number} stackNum 
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function(stackNum, value) {
    let stackKey = `stack${stackNum}`
    let nowTop = this[stackKey]
    let top = this.stackSize * (stackNum + 1)
    let bottom = this.stackSize * (stackNum)
    if(nowTop+1 >= top) return null
    this.stack[++nowTop] = value
    this[stackKey] = nowTop
    return null
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function(stackNum) {
    let stackKey = `stack${stackNum}`
    let nowTop = this[stackKey]
    let bottom = this.stackSize * (stackNum)
    if(nowTop < bottom) return -1
    let val = this.stack[nowTop]
    this.stack[nowTop] = null
    this[stackKey] -= 1
    return val
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.peek = function(stackNum) {
    let stackKey = `stack${stackNum}`
    let nowTop = this[stackKey]
    let bottom = this.stackSize * (stackNum)
    if(nowTop < bottom) return -1
    return this.stack[nowTop]
};

/** 
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function(stackNum) {
    let stackKey = `stack${stackNum}`
    let nowTop = this[stackKey]
    let bottom = this.stackSize * (stackNum)
    return nowTop < bottom
};
var obj = new TripleInOne(18)
// var obj = new TripleInOne(2)
// var obj = new TripleInOne(1)

// var funcs = ["push", "push", "push", "pop", "pop", "pop", "peek"]
// var params = [[0, 1], [0, 2], [0, 3], [0], [0], [0], [0]]
// var results = [null, null, null, 2, 1, -1, -1]
// var funcs = ["push", "push", "pop", "pop", "pop", "isEmpty"]
// var params = [[0, 1], [0, 2], [0], [0], [0], [0]]
// var results = [null, null, 1, -1, -1, true]
var funcs = ["peek", "pop", "isEmpty", "push", "pop", "push", "push", "pop", "push", "push", "isEmpty", "pop", "peek", "push", "peek", "isEmpty", "peek", "pop", "push", "isEmpty", "pop", "peek", "peek", "pop", "peek", "isEmpty", "pop", "push", "isEmpty", "peek", "push", "peek", "isEmpty", "isEmpty", "isEmpty", "isEmpty", "peek", "push", "push", "peek", "isEmpty", "peek", "isEmpty", "push", "push", "push", "peek", "peek", "pop", "push", "push", "isEmpty", "peek", "pop", "push", "peek", "peek", "pop", "isEmpty", "pop", "peek", "peek", "push", "push"]
var params = [[1], [2], [1], [2, 40], [2], [0, 44], [1, 40], [0], [1, 54], [0, 42], [0], [1], [1], [0, 56], [2], [0], [2], [2], [1, 15], [1], [1], [0], [2], [0], [0], [1], [0], [0, 32], [0], [0], [0, 30], [2], [1], [1], [0], [0], [0], [0, 56], [1, 40], [2], [0], [0], [0], [2, 11], [0, 16], [0, 3], [2], [0], [2], [0, 39], [0, 63], [1], [2], [0], [2, 36], [1], [0], [2], [1], [0], [1], [2], [0, 8], [0, 38]]
var results = [-1,-1,true,null,40,null,null,44,null,null,false,54,40,null,-1,false,-1,-1,null,false,15,56,-1,56,42,false,42,null,false,32,null,-1,false,false,false,false,30,null,null,-1,false,56,false,null,null,null,11,3,11,null,null,false,-1,63,null,40,39,36,false,39,40,-1,null,null]
funcs.forEach((item, index) => {
    let res = obj[item](...params[index])
    // console.log(item, params[index])
    // console.log(JSON.stringify(obj.stack))
    // console.log(res, results[index])
    console.log(JSON.stringify(res) == JSON.stringify(results[index]))
})
console.log(obj)



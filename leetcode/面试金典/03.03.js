/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 08:13:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 08:50:19
 * @FilePath: /js-demo/leetcode/面试金典/03.03.js
 */
/**
 * @param {number} cap
面试题 03.03. 堆盘子
堆盘子。设想有一堆盘子，堆太高可能会倒下来。因此，在现实生活中，
盘子堆到一定高度时，我们就会另外堆一堆盘子。
请实现数据结构SetOfStacks，模拟这种行为。SetOfStacks应该由多个栈组成，
并且在前一个栈填满时新建一个栈。此外，SetOfStacks.push()和SetOfStacks.pop()
应该与普通栈的操作方法相同（也就是说，pop()返回的值，应该跟只有一个栈时的情况一样）。 
进阶：实现一个popAt(int index)方法，根据指定的子栈，执行pop操作。
当某个栈为空时，应当删除该栈。当栈中没有元素或不存在该栈时，pop，popAt 应返回 -1.
示例1:
输入：
    ["StackOfPlates", "push", "push", "popAt", "pop", "pop"]
    [[1], [1], [2], [1], [], []]
输出：
    [null, null, null, 2, 1, -1]
示例2:
输入：
    ["StackOfPlates", "push", "push", "push", "popAt", "popAt", "popAt"]
    [[2], [1], [2], [3], [0], [0], [0]]
输出：
    [null, null, null, null, 2, 1, 3]
 */
var StackOfPlates = function(cap) {
    this.cap = cap
    this.stack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
StackOfPlates.prototype.push = function(val) {
    if(this.cap <= 0) return
    if(!this.stack.length || this.stack[this.stack.length-1].length >= this.cap){
        this.stack.push([val])
    }else{
        this.stack[this.stack.length - 1].push(val)
    }
};

/**
 * @return {number}
 */
StackOfPlates.prototype.pop = function() {
    return this.stack.length > 0 ? this.popAt(this.stack.length - 1) : -1
};

/** 
 * @param {number} index
 * @return {number}
 */
StackOfPlates.prototype.popAt = function(index) {
    if(index < 0 || index >= this.stack.length) return -1
    let stack = this.stack[index]
    let val = stack.pop()
    if(!stack.length){
        this.stack.splice(index, 1)
    }
    return val != undefined ? val : -1
};


// let funcs = ["push", "push", "push", "popAt", "popAt", "popAt"]
// let params = [[1], [2], [3], [0], [0], [0]]
// let results = [null, null, null, 2, 1, 3]
// let obj = new StackOfPlates(2)
let funcs = ["push", "push", "popAt", "pop", "pop"]
let params = [[1], [2], [1], [], []]
let results = [null, null, 2, 1, -1]
let obj = new StackOfPlates(1)
funcs.forEach((item, index) => {
    let res = obj[item](...params[index])
    // console.log(item)
    // console.log(res, results[index])
    console.log(res == results[index])
    // console.log(obj)
})
console.log(obj.pop())
console.log(obj.popAt(0))
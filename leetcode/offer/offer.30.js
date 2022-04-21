/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 08:37:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 08:45:38
 * @FilePath: /js-demo/leetcode/offer.30.js
 */
/**
 * initialize your data structure here.
    剑指 Offer 30. 包含min函数的栈
        定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，
        调用 min、push 及 pop 的时间复杂度都是 O(1)。
    示例:
        MinStack minStack = new MinStack();
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);
        minStack.min();   --> 返回 -3.
        minStack.pop();
        minStack.top();      --> 返回 0.
        minStack.min();   --> 返回 -2.
    提示：
        各函数的调用总次数不超过 20000 次
 */
var MinStack = function () {
  this.minStack = []
  this.stack = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  const min = this.min()
  this.minStack.push(val > min ? min : val)
  this.stack.push(val)
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.minStack.pop()
  this.stack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minStack[this.minStack.length - 1]
}

let minStack = new MinStack()
console.log(minStack.push(-2))
console.log(minStack.push(0))
console.log(minStack.push(-3))
console.log(minStack)
console.log(minStack.min()) //  --> 返回 -3.
console.log(minStack.pop())
console.log(minStack.top()) //  --> 返回 0.
console.log(minStack.min()) //  --> 返回 -2.
console.log(minStack)

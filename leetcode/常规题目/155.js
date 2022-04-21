/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 08:37:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 08:48:09
 * @FilePath: /js-demo/leetcode/155.js
 */
/**
 * initialize your data structure here.
    155. 最小栈
        设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
        push(x) —— 将元素 x 推入栈中。
        pop() —— 删除栈顶的元素。
        top() —— 获取栈顶元素。
        getMin() —— 检索栈中的最小元素。
    示例:
    输入：
        ["MinStack","push","push","push","getMin","pop","top","getMin"]
        [[],[-2],[0],[-3],[],[],[],[]]
    输出：
        [null,null,null,null,-3,null,0,-2]
    解释：
        MinStack minStack = new MinStack();
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);
        minStack.getMin();   --> 返回 -3.
        minStack.pop();
        minStack.top();      --> 返回 0.
        minStack.getMin();   --> 返回 -2.
    提示：
        pop、top 和 getMin 操作总是在 非空栈 上调用。
 */
var MinStack = function () {
  this.min = []
  this.stack = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  const min = this.getMin()
  this.min.push(val > min ? min : val)
  this.stack.push(val)
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.min.pop()
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
MinStack.prototype.getMin = function () {
  return this.min[this.min.length - 1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

let minStack = new MinStack()
console.log(minStack.push(-2))
console.log(minStack.push(0))
console.log(minStack.push(-3))
console.log(minStack)
console.log(minStack.getMin()) //  --> 返回 -3.
console.log(minStack.pop())
console.log(minStack.top()) //  --> 返回 0.
console.log(minStack.getMin()) //  --> 返回 -2.
console.log(minStack)

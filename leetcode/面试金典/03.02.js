/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 10:09:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 10:17:50
 * @FilePath: /js-demo/leetcode/面试金典/03.02.js
 */
/**
 * initialize your data structure here.
面试题 03.02. 栈的最小值
    请设计一个栈，除了常规栈支持的pop与push函数以外，还支持min函数，
    该函数返回栈元素中的最小值。执行push、pop和min操作的时间复杂度必须为O(1)。
示例：
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin();   --> 返回 -3.
    minStack.pop();
    minStack.top();      --> 返回 0.
    minStack.getMin();   --> 返回 -2.
 */
var MinStack = function() {
    this.stack = [];
    this.minStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(this.minStack.length && x <= this.minStack[this.minStack.length - 1]){
        this.minStack.push(x)
    }else if(!this.minStack.length){
        this.minStack.push(x)
    }
    return this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(this.minStack.length && this.top() == this.minStack[this.minStack.length - 1]){
        this.minStack.pop()
    }
    return this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : -1
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStack.length > 0 ? this.minStack[this.minStack.length - 1] : -1
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
let minStack = new MinStack();
console.log(minStack.push(-2));
console.log(minStack.push(0));
console.log(minStack.push(-3));
console.log(minStack.getMin());   // 返回 -3.
console.log(minStack.pop());
console.log(minStack.top());      // 返回 0.
console.log(minStack.getMin());   // 返回 -2.
console.log(minStack);   // 返回 -2.
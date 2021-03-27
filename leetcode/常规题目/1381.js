/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 14:28:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 14:55:11
 * @FilePath: /js-demo/leetcode/常规题目/1381.js
 */
/**
 * @param {number} maxSize
1381. 设计一个支持增量操作的栈
    请你设计一个支持下述操作的栈。
    实现自定义栈类 CustomStack ：
    CustomStack(int maxSize)：
        用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
    void push(int x)：
        如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
    int pop()：
        弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
    void inc(int k, int val)：
        栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。
示例：
    输入：
    ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
    [[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
    输出：
    [null,null,null,2,null,null,null,null,null,103,202,201,-1]
解释：
    CustomStack customStack = new CustomStack(3); // 栈是空的 []
    customStack.push(1);                          // 栈变为 [1]
    customStack.push(2);                          // 栈变为 [1, 2]
    customStack.pop();                            // 返回 2 --> 返回栈顶值 2，栈变为 [1]
    customStack.push(2);                          // 栈变为 [1, 2]
    customStack.push(3);                          // 栈变为 [1, 2, 3]
    customStack.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
    customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
    customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
    customStack.pop();                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
    customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
    customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
    customStack.pop();                            // 返回 -1 --> 栈为空，返回 -1
提示：
    1 <= maxSize <= 1000
    1 <= x <= 1000
    1 <= k <= 1000
    0 <= val <= 100
    每种方法 increment，push 以及 pop 分别最多调用 1000 次
 */
var CustomStack = function(maxSize) {
    this.maxSize = maxSize
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if(this.stack.length >= this.maxSize) return
    this.stack.push(x)
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    return !this.stack.length ? -1 : this.stack.pop()
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    k = k > this.stack.length ? this.stack.length : k
    for (let i = k-1; i >= 0; i--) {
        this.stack[i] += val
    }
};

let funcs = ["push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
let params = [[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
let result = [null,null,2,null,null,null,null,null,103,202,201,-1]
let customStack = new CustomStack(3)
funcs.forEach((item, index) => {
    let res = customStack[item](...params[index])
    let realRes = result[index]
    // console.log(customStack.stack)
    // console.log(res,realRes)
    console.log(res == realRes)
})
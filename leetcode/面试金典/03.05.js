/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 07:46:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 08:10:56
 * @FilePath: /js-demo/leetcode/面试金典/03.05.js
面试题 03.05. 栈排序
    栈排序。 编写程序，对栈进行排序使最小元素位于栈顶。最多只能使用一个其他的临时栈存放数据，
    但不得将元素复制到别的数据结构（如数组）中。
    该栈支持如下操作：push、pop、peek 和 isEmpty。当栈为空时，peek 返回 -1。
示例1:
输入：
    ["SortedStack", "push", "push", "peek", "pop", "peek"]
    [[], [1], [2], [], [], []]
输出：
    [null,null,null,1,null,2]
示例2:
输入： 
    ["SortedStack", "pop", "pop", "push", "pop", "isEmpty"]
    [[], [], [], [1], [], []]
输出：
    [null,null,null,null,null,true]
说明:
    栈中的元素数目在[0, 5000]范围内。
 */
var SortedStack = function() {
    this.stack = []
    this.help = []
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function(val) {
    if(!this.stack.length) this.stack.push(val)
    else{
        while(this.stack.length && this.stack[this.stack.length - 1] < val){
            this.help.push(this.stack.pop())
        }
        this.stack.push(val)
        while(this.help.length){
            this.stack.push(this.help.pop())
        }
    }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
    this.stack.pop()
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : -1
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
    return !this.stack.length
};

let funcs = ["peek", "push", "push", "peek", "pop", "peek"]
let params = [[],[1], [2], [], [], []]
let results = [-1,null,null,1,null,2]
let obj = new SortedStack()
funcs.forEach((item, index) => {
    let res = obj[item](...params[index])
    // console.log(item)
    // console.log(res, results[index])
    console.log(res == results[index])
    // console.log(obj)
})
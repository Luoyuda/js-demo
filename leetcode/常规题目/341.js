/*
 * @Author: xiaohuolong
 * @Date: 2021-03-23 07:54:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-13 21:25:21
 * @FilePath: /js-demo/leetcode/常规题目/341.js
341. 扁平化嵌套列表迭代器
    给你一个嵌套的整型列表。请你设计一个迭代器，使其能够遍历这个整型列表中的所有整数。
    列表中的每一项或者为一个整数，或者是另一个列表。其中列表的元素也可能是整数或是其他列表。
示例 1:
    输入: [[1,1],2,[1,1]]
    输出: [1,1,2,1,1]
    解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。
示例 2:
    输入: [1,[4,[6]]]
    输出: [1,4,6]
    解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。 
*/
var NestedIterator = function(nestedList) {
    this.stack = nestedList;
};

NestedIterator.prototype.hasNext = function() {
    while (this.stack.length !== 0) {
        if (this.stack[0].isInteger()) {
            return true;
        } else {
            let cur = this.stack[0].getList();
            this.stack.shift();
            this.stack.unshift(...cur);
        }
    }
};

NestedIterator.prototype.next = function() {
    return this.stack.shift().getInteger();
};

// 深度优先
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
 var NestedIterator = function(nestedList) {
    this.q = []
    this.dfs(nestedList)
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    return this.q.length
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    return this.q.shift().getInteger()
};

NestedIterator.prototype.dfs = function(list){
    for(let x of list){
        if(x.isInteger()){
            this.q.push(x)
        }else{
            this.dfs(x.getList())
        }
    }
}

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
 var NestedIterator = function(nestedList) {
    this.stack = []
    for(let i = nestedList.length - 1; i >= 0; i--){
        this.stack.push(nestedList[i])
    }
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    if(!this.stack.length){
        return false
    }else{
        let x = this.stack[this.stack.length - 1]
        if(x.isInteger()){
            return true
        }else{
            x = this.stack.pop().getList()
            for(let i = x.length - 1; i >= 0; i--){
                this.stack.push(x[i])
            }
            return this.hasNext()
        }
    }
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    return this.hasNext() ? this.stack.pop().getInteger() : -1
};


const nested = new NestedIterator([[1,1],2,[1,1]])
console.log(nested.next())
console.log(nested.hasNext())
console.log(nested.next())
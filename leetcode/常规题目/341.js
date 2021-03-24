/*
 * @Author: xiaohuolong
 * @Date: 2021-03-23 07:54:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-23 08:06:58
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

const nested = new NestedIterator([[1,1],2,[1,1]])
console.log(nested.next())
console.log(nested.hasNext())
console.log(nested.next())
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 19:22:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-22 20:42:29
 * @FilePath: /js-demo/leetcode/常规题目/173.js
 */
/**
 * @param {TreeNode} root
173. 二叉搜索树迭代器
    实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。
    调用 next() 将返回二叉搜索树中的下一个最小的数。
示例：
    let iterator = new BSTIterator(root);
    iterator.next();    // 返回 3
    iterator.next();    // 返回 7
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 9
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 15
    iterator.hasNext(); // 返回 true
    iterator.next();    // 返回 20
    iterator.hasNext(); // 返回 false
提示：
    next() 和 hasNext() 操作的时间复杂度是 O(1)，并使用 O(h) 内存，其中 h 是树的高度。
    你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 中至少存在一个下一个最小的数。
 */
var BSTIterator = function(root) {
    this.index = 0
    this.res = []
    this.order(root)
    console.log(this.res)
};

BSTIterator.prototype.order = function(root){
    if(!root) return
    this.order(root.left)
    this.res.push(root.val)
    this.order(root.right)
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    return this.res[this.index++]
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.index < this.res.length
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    this.stack = []
    while(root){
        this.stack.push(root)
        root = root.left
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let p = this.stack.pop()
    let res = p.val
    p = p.right
    while(p){
        this.stack.push(p)
        p = p.left
    }
    return res
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!this.stack.length
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
let root = new TreeNode(7)
root.left = new TreeNode(3)
root.right = new TreeNode(15)
root.right.left = new TreeNode(9)
root.right.right = new TreeNode(20)
let iterator = new BSTIterator(root);
console.log(iterator.next());    // 返回 3
console.log(iterator.next());    // 返回 7
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 9
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 15
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 20
console.log(iterator.hasNext()); // 返回 false
// console.log(iterator.next());    // 返回 20
/*
 * @Author: xiaohuolong
 * @Date: 2020-06-30 21:30:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-04 15:32:28
 * @FilePath: /js-demo/data-structures/BinaryTree/BinaryTree.js
 */ 
const { Queue } = require('../Queue/Queue')

// 前序遍历
const preOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取中间节点
    res.push(treeNode.data)
    // 再取左子树
    preOrderTraversal(treeNode.leftChild, res)
    // 最后右子树
    preOrderTraversal(treeNode.rightChild, res)
    return res
}
// 使用栈实现前序遍历
const preOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = []
    let node = treeNode
    let res = []
    while (node !== null || stack.length > 0) {
        while (node !== null){
            stack.push(node)
            res.push(node.data)
            node = node.leftChild
        }
        if(stack.length > 0) {
            node = stack.pop()
            node = node.rightChild
        }
    }
    return res
}
// 中序遍历
const inOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    inOrderTraversal(treeNode.leftChild, res)
    // 取中间节点
    res.push(treeNode.data)
    // 最后取右子树
    inOrderTraversal(treeNode.rightChild, res)
    return res
}
// 使用栈实现中序遍历
const inOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = []
    let node = treeNode
    let res = []
    while (node !== null || stack.length > 0) {
        while (node !== null){
            stack.push(node)
            node = node.leftChild
        }
        if(stack.length > 0) {
            node = stack.pop()
            res.push(node.data)
            node = node.rightChild
        }
    }
    return res
}
// 后序遍历
const postOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    postOrderTraversal(treeNode.leftChild, res)
    // 右子树
    postOrderTraversal(treeNode.rightChild, res)
    // 最后取中间节点
    res.push(treeNode.data)
    return res
}
// 使用栈实现后序遍历
const postOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = [treeNode]
    let curr = treeNode
    let last = treeNode
    let res = []
    while(stack.length > 0){
        curr = stack[stack.length - 1]
        if(curr.leftChild != null && last != curr.leftChild && last != curr.rightChild){
            stack.push(curr.leftChild)
        }else if(curr.rightChild != null && last != curr.rightChild){
            stack.push(curr.rightChild)
        }else{
            stack.pop()
            res.push(curr.data)
            last = curr
        }
    }
    return res
}
// 层序遍历
const levelOrderTraversal = function(treeNode) {
    if(!treeNode) return []
    const queue = new Queue()
    queue.enqueue(treeNode)
    let res = []
    while (!queue.isEmpty()) {
        let node = queue.dequeue()
        res.push(node.data)
        if(node.leftChild != null) {
            queue.enqueue(node.leftChild)
        }
        if(node.rightChild != null) {
            queue.enqueue(node.rightChild)
        }
    }
    return res
}
// 树节点
const TreeNode = function(data) {
    this.data = data
    this.leftChild = null
    this.rightChild = null
    this.lTag = 0
    this.rTag = 0
}
// 使用前序顺序生成
const createBinaryTree = function(list){
    let node = null
    if(list == null || list.length == 0) return null 
    let data = list.shift()
    if(data) {
        node = new TreeNode(data)
        node.leftChild = createBinaryTree(list, node.leftChild)
        node.rightChild = createBinaryTree(list, node.rightChild)
    }
    return node
}

// 二叉树线索化
let pre = null
const ThreadedInOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    ThreadedInOrderTraversal(treeNode.leftChild, res)
    if(!treeNode.leftChild){
        treeNode.lTag = 1
        treeNode.leftChild = pre
    }
    // 取中间节点
    res.push(treeNode.data)
    if(pre && !pre.rightChild){
        pre.rTag = 1
        pre.rightChild = treeNode
    }
    pre = treeNode
    // 最后取右子树
    ThreadedInOrderTraversal(treeNode.rightChild, res)
    return res
}

module.exports = {
    createBinaryTree,
    preOrderTraversal,
    preOrderTraversalByStack,
    inOrderTraversal,
    inOrderTraversalByStack,
    ThreadedInOrderTraversal,
    postOrderTraversal,
    postOrderTraversalByStack,
    levelOrderTraversal
}


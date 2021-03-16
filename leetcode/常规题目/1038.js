/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 17:22:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-15 21:18:24
 * @FilePath: /js-demo/leetcode/1038.js
 */ 
class BinarySearchTree {
    constructor(){
        this.root = null
    }
    node(value, left = null, right = null) {
        return {
            value,
            left,
            right
        }
    }
    insert(value){
        if(this.contains(value, this.root)) return false
        const node = this.node(value)
        if(!this.root) {
            this.root = node
            return node
        }
        let curr = this.root
        while(curr){
            // console.log(curr)
            if(curr.value < value){
                if(!curr.right){
                    curr.right = node
                    break
                }else{
                    curr = curr.right
                }
            }else if(curr.value > value){
                if(!curr.left){
                    curr.left = node
                    break
                }else{
                    curr = curr.left
                }
            }
        }
        return node
    }
    delete(value){
        let node = this.contains(value, this.root)
        if(!node) return false
        // console.log(node)
        if(node.right == null){
            let curr = node.left
            node.value = curr.value
            let left = curr.left
            let right = curr.right
            node.right = right
            node.left = left
        }else if(node.left == null){
            let curr = node.right
            node.value = curr.value
            let left = curr.left
            let right = curr.right
            node.right = right
            node.left = left
        }else{
            let curr = node.left
            while(curr.right){
                curr = curr.right
            }
            let left = curr.left
            node.value = curr.value
            if(node.left == curr){
                node.left = null
            }else{
                node.left.right = left
            }
        }
        return true
    }
    contains(value, node){
        if(!node) return null
        if(value == node.value) return node
        if(value < node.value) return this.contains(value, node.left)
        if(value > node.value) return this.contains(value, node.right)
    }
}

const binarySearchTree = new BinarySearchTree()
// console.log(binarySearchTree)
binarySearchTree.insert(4)
binarySearchTree.insert(1)
binarySearchTree.insert(6)
binarySearchTree.insert(0)
binarySearchTree.insert(2)
binarySearchTree.insert(5)
binarySearchTree.insert(7)
binarySearchTree.insert(3)
binarySearchTree.insert(8)
console.log(binarySearchTree)

// let sum = 0 
// 中序遍历
const bstToGst = function(root){
    let sum = 0
    const inOrderTraversal = function(treeNode) {
        if(!treeNode) return 
        inOrderTraversal(treeNode.right, sum)
        sum = sum + treeNode.value
        treeNode.value = sum
        inOrderTraversal(treeNode.left, sum)
        return treeNode
    }
    inOrderTraversal(root)
    return root
}

console.log(bstToGst(binarySearchTree.root))
console.log(binarySearchTree.root)
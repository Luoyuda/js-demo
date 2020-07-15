/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 17:22:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-14 23:57:23
 * @FilePath: /js-demo/data-structures/BinarySearchTree/BinarySearchTree.js
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
                console.log(node)
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
binarySearchTree.insert(15)
binarySearchTree.insert(4)
binarySearchTree.insert(13)
binarySearchTree.insert(14)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(11)
binarySearchTree.insert(8)
binarySearchTree.insert(16)
binarySearchTree.insert(6)
binarySearchTree.insert(18)
binarySearchTree.insert(17)
binarySearchTree.insert(39)
binarySearchTree.delete(13)
binarySearchTree.delete(8)
binarySearchTree.delete(18)
// console.log(binarySearchTree)

// 层序遍历
const levelOrderTraversal = function(treeNode) {
    if(!treeNode) return []
    const queue = []
    queue.push(treeNode)
    let res = []
    while (queue.length) {
        let node = queue.shift()
        res.push(node.value)
        if(node.left != null) {
            queue.push(node.left)
        }
        if(node.right != null) {
            queue.push(node.right)
        }
    }
    return res
}
console.log(levelOrderTraversal(binarySearchTree.root))
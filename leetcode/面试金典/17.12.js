/*
 * @Author: xiaohuolong
 * @Date: 2020-07-15 20:59:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-15 22:25:41
 * @FilePath: /js-demo/leetcode/17.12.js
 */ 
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const convertBiNode = function(root){
    if(!root) return null
    let prev = new TreeNode('')
    let head = prev
    const inOrderTraversal = function(node) {
        if(!node) return null
        inOrderTraversal(node.left)
        node.left = null
        prev.right = node
        prev = node
        inOrderTraversal(node.right)
        return prev
    }
    inOrderTraversal(root)
    return head.right
}


let root = new TreeNode(4)
root.left = new TreeNode(2)
root.right = new TreeNode(5)
root.left.left = new TreeNode(1)
root.left.right = new TreeNode(3)
root.right.right = new TreeNode(6)
root.left.left.left = new TreeNode(0)

root = convertBiNode(root)

const levelOrderTraversal = function(treeNode) {
    if(!treeNode) return []
    const queue = []
    queue.push(treeNode)
    let res = []
    while (queue.length) {
        let node = queue.shift()
        res.push(node.val)
        if(node.left != null) {
            queue.push(node.left)
        }
        if(node.right != null) {
            queue.push(node.right)
        }
    }
    return res
}
console.log(levelOrderTraversal(root))
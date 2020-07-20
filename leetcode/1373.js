/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 17:22:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-17 18:00:45
 * @FilePath: /js-demo/leetcode/1373.js
 */ 
class BinarySearchTree {
    constructor(){
        this.root = null
    }
    node(val, left = null, right = null) {
        return {
            val,
            left,
            right
        }
    }
    insert(val){
        if(this.contains(val, this.root)) return false
        const node = this.node(val)
        if(!this.root) {
            this.root = node
            return node
        }
        let curr = this.root
        while(curr){
            // console.log(curr)
            if(curr.val < val){
                if(!curr.right){
                    curr.right = node
                    break
                }else{
                    curr = curr.right
                }
            }else if(curr.val > val){
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
    delete(val){
        let node = this.contains(val, this.root)
        if(!node) return false
        // console.log(node)
        if(node.right == null){
            let curr = node.left
            node.val = curr.val
            let left = curr.left
            let right = curr.right
            node.right = right
            node.left = left
        }else if(node.left == null){
            let curr = node.right
            node.val = curr.val
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
            node.val = curr.val
            if(node.left == curr){
                node.left = null
            }else{
                node.left.right = left
            }
        }
        return true
    }
    contains(val, node){
        if(!node) return null
        if(val == node.val) return node
        if(val < node.val) return this.contains(val, node.left)
        if(val > node.val) return this.contains(val, node.right)
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
// binarySearchTree.delete(13)
// binarySearchTree.delete(8)
// binarySearchTree.delete(18)
// console.log(binarySearchTree)

// 层序遍历
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

const isBST = (root, min=-Infinity, max=Infinity) => {
    if (root == null) {
        return true;
    }
    // console.log(`val = ${root.val} min = ${min} max = ${max}`);
    return min < root.val && root.val < max 
        && isBST(root.left, min, root.val) 
        && isBST(root.right, root.val, max);
}

const maxSumBST = (node) => {
    if (!node) return 0;
    // 这个节点是BST，直接求和了
    if (isBST(node)) {
        // 是二叉搜索树，求节点和，节点和的最优解，肯定在子节点求和的过程中
        // console.log(node)
        return Math.max(inOrderTraversal(node), maxSumBST(node.left), maxSumBST(node.right))
    }
    // 不是BST，递归进入左右子树
    return Math.max(maxSumBST(node.left), maxSumBST(node.right))
}


// 中序遍历
const inOrderTraversal = function(treeNode, res=0) {
    if(!treeNode) return 0
    // 取中间节点
    // console.log(treeNode.val)
    if(treeNode.sum !== undefined) return treeNode.sum
    res = treeNode.val + inOrderTraversal(treeNode.left, res) + inOrderTraversal(treeNode.right, res)
    treeNode.sum = res
    return res
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
// [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
// const root1 = new TreeNode(1, 
//     new TreeNode(4, 
//         new TreeNode(2), new TreeNode(4)
//     ), 
//     new TreeNode(3,
//         new TreeNode(2), new TreeNode(5, new TreeNode(4), new TreeNode(6)))
//     )
// 使用前序顺序生成
const createBinaryTree = function(list){
    let node = null
    if(list == null || list.length == 0) return null 
    let data = list.shift()
    if(data) {
        node = new TreeNode(data)
        node.left = createBinaryTree(list, node.left)
        node.right = createBinaryTree(list, node.right)
    }
    return node
}
const root1 = createBinaryTree([4,8,6,9,null,null,null,1,-5,null,-3,null,null,4,null,10,null,null,null])
// const root1 = createBinaryTree([4,8,6,9])
console.log(root1)
console.log(root1.left.left)
    // 
// console.log(levelOrderTraversal(root1))

console.log(maxSumBST(root1))

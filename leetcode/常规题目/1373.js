/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 17:22:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-09-14 16:04:28
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
        if(node == null){
            res.push(null)
        }else{
            res.push(node.val)
            queue.push(node.left)
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

var maxSumBST = function(root) {
    // 计算二叉树最大和
    function dfs(root){
      // 四元组分别表示当前子树为二叉搜索树、子树最小值、子树最大值，
      // 以及当前二叉搜索树数值求和
        if(!root) return [true,Infinity,-Infinity,0]
        const left=dfs(root.left)
        const right=dfs(root.right)
    
        let sum=0,curMax,curMin;

        // 判断是否为二叉搜索树。当前节点比左子树最大值小或者比右子树最小值大都不是搜索树
        if(!left[0]||!right[0] 
            || root.val<=left[2]||root.val>=right[1]){
            return [false,0,0,0]
        }
    
        // 包含当前节点的二叉搜索树中节点值范围[左子树最小值,右子树最大值]
        curMin=root.left?left[1]:root.val;
        curMax=root.right?right[2]:root.val;
    
        // 先计算临时和，再与当前最大和比较。类似数组求最大和的过程
        sum+=left[3]+right[3]+root.val;
        max=Math.max(max,sum)
        
    
        return [true,curMin,curMax,sum]
    }
    let max=0;
    dfs(root)
    return max;
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
// 使用层序遍历生成
const createBinaryTree = function(list){
    let node = null
    if(list == null || list.length == 0) return node 
    let nodes = []
    let data = list.shift()
    let preNode =  node = new TreeNode(data)
    nodes.push(node)
    while(nodes.length){
        let leftNode = null
        let rightNode = null
        if(list.length > 0){
            let left = list.length > 0 ? list.shift() : null
            leftNode = left != null ? new TreeNode(left) : null
            nodes.push(leftNode)
            let right = list.length > 0 ? list.shift() : null
            rightNode = right != null ? new TreeNode(right) : null
            nodes.push(rightNode)
        }
        node = nodes.shift()
        if(node){
            node.left = leftNode
            node.right = rightNode
        }
    }
    return preNode
}
// const root1 = createBinaryTree([4,8,6,9,null,null,null,1,-5,null,-3,null,null,4,null,10,null,null,null])
// const root1 = createBinaryTree([1,4,3,2,4,2,5,null,null,null,null,null,null,4,6])
const root1 = createBinaryTree([4,8,null,6,1,9,null,-5,4,null,null,null,-3,null,10])
// const root1 = createBinaryTree([1,4,3])
// console.log(root1)
// console.log(root1.left)
// console.log(root1.right)
console.log(levelOrderTraversal(root1))

console.log(maxSumBST(root1))

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 23:27:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 23:45:11
 * @FilePath: /js-demo/leetcode/面试金典/04.04.js
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
面试题 04.04. 检查平衡性
实现一个函数，检查二叉树是否平衡。在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。
示例 1:
    给定二叉树 [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7
    返回 true 。
示例 2:
    给定二叉树 [1,2,2,3,3,null,null,4,4]
      1
     / \
    2   2
   / \
  3   3
 / \
4   4
    返回 false 。
 */
var isBalanced = function(root) {
    // return recur(root) != -1;
    return height(root) >= 0;
};

// var recur = (root) => {
//     if (root == null) return 0;
//     let left = recur(root.left);
//     if(left == -1) return -1;
//     let right = recur(root.right);
//     if(right == -1) return -1;
//     return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
// }
var height = function (root) {
    if (root == null) {
        return 0;
    }
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);
    if (leftHeight == -1 || rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    } else {
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


let node3 = new TreeNode(3)
let node9 = new TreeNode(9)
let node20 = new TreeNode(20)
let node15 = new TreeNode(15)
let node7 = new TreeNode(7)
node3.left = node9
node3.right = node20
node20.left = node15
node20.left.left = node7

console.log(isBalanced(node3))
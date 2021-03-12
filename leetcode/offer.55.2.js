/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 17:03:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 17:16:28
 * @FilePath: /js-demo/leetcode/offer.55.2.js
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
剑指 Offer 55 - II. 平衡二叉树
    输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
    如果某二叉树中任意节点的左右子树的深度相差不超过1，
    那么它就是一棵平衡二叉树。
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
限制：
    0 <= 树的结点个数 <= 10000
 */
var isBalanced = function(root) {
    return recur(root) != -1;
};

var recur = (root) => {
    if (root == null) return 0;
    let left = recur(root.left);
    if(left == -1) return -1;
    let right = recur(root.right);
    if(right == -1) return -1;
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
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
node20.right = node7

console.log(isBalanced(node3))
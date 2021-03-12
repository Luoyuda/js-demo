/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 16:59:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 17:01:54
 * @FilePath: /js-demo/leetcode/offer.55.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
    剑指 Offer 55 - I. 二叉树的深度
        输入一棵二叉树的根节点，求该树的深度。
        从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。
    例如：
        给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
        返回它的最大深度 3 。
    提示：
        节点总数 <= 10000
 */
var maxDepth = function(root) {
    if(!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let node3 = new TreeNode(3)
let node1 = new TreeNode(1)
let node2 = new TreeNode(2)
let node4 = new TreeNode(4)
node3.left = node1
node1.right = node2
node3.right = node4

console.log(maxDepth(node3))
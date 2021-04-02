/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 23:16:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 23:24:39
 * @FilePath: /js-demo/leetcode/面试金典/04.08.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
面试题 04.08. 首个共同祖先
设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。不得将其他的节点存储在另外的数据结构中。
注意：这不一定是二叉搜索树。
例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]
    3
   / \
  5   1
 / \ / \
6  2 0  8
  / \
 7   4
示例 1:
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
示例 2:
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
说明:
所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉树中。
 */
var lowestCommonAncestor = function(root, p, q) {
    if(root == null || root == p || root == q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if(left == null && right == null) return null
    if(left == null) return right
    if(right == null) return left
    return root
};
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let root = new TreeNode(3)
root.left = new TreeNode(5)
root.right = new TreeNode(1)
root.left.left = new TreeNode(6)
root.left.right = new TreeNode(2)
root.right.left = new TreeNode(0)
root.right.right = new TreeNode(8)
root.left.right.left = new TreeNode(7)
root.left.right.right = new TreeNode(4)


console.log(lowestCommonAncestor(root, root.right, root.left))
console.log(lowestCommonAncestor(root, root.left.right.right, root.left))
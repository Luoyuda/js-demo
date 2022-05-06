/*
 * @Author: xiaohuolong
 * @Date: 2021-04-17 11:02:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 11:25:58
 * @FilePath: /js-demo/leetcode/常规题目/98.js
 */
/**
98. 验证二叉搜索树
    给定一个二叉树，判断其是否是一个有效的二叉搜索树。
    假设一个二叉搜索树具有如下特征：
    节点的左子树只包含小于当前节点的数。
    节点的右子树只包含大于当前节点的数。
    所有左子树和右子树自身必须也是二叉搜索树。
示例 1:
输入:
    2
   / \
  1   3
输出: true
示例 2:
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
    根节点的值为 5 ，但是其右子节点值为 4 。
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  return isValid(root, -Infinity, Infinity)
}

var isValid = (root, lower, upper) => {
  if (!root) return true
  if (root.val <= lower || root.val >= upper) {
    return false
  }
  return (
    isValid(root.left, lower, root.val) && isValid(root.right, root.val, upper)
  )
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

var root = new TreeNode(2, new TreeNode(1), new TreeNode(3))

var root = new TreeNode(
  5,
  new TreeNode(1),
  new TreeNode(4, new TreeNode(3), new TreeNode(6))
)

var root = new TreeNode(
  5,
  new TreeNode(4),
  new TreeNode(6, new TreeNode(3), new TreeNode(7))
)
var root = new TreeNode(1, new TreeNode(1))
console.log(isValidBST(root))

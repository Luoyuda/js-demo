/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 19:19:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 19:34:54
 * @FilePath: /js-demo/leetcode/常规题目/104.js
 */
/**
104. 二叉树的最大深度
    给定一个二叉树，找出其最大深度。
    二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
    说明: 叶子节点是指没有子节点的节点。
示例：
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}
var maxDepth = function (root) {
  if (!root) return 0
  let queue = [root]
  let ans = 0
  while (queue.length) {
    let count = queue.length
    while (count) {
      let node = queue.shift()
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
      count -= 1
    }
    ans += 1
  }
  return ans
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

let root = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
)
console.log(root)
console.log(maxDepth(root))

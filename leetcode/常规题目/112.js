/*
 * @Author: xiaohuolong
 * @Date: 2020-07-07 23:55:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-07 23:58:12
 * @FilePath: /js-demo/leetcode/112.js
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * O(n) O(h)
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false
  const sum = targetSum - root.val
  if (!root.left && !root.right) return sum === 0
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum)
}

const tree = new TreeNode(5)
tree.left = new TreeNode(4)
tree.right = new TreeNode(8)
tree.left.left = new TreeNode(11)
tree.right.left = new TreeNode(13)
tree.right.right = new TreeNode(4)

console.log(hasPathSum(tree, 13))

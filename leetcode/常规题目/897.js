/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 07:33:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 07:38:28
 * @FilePath: /js-demo/leetcode/常规题目/897.JS
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * O(n) O(n)
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  let node = new TreeNode()
  let head = node
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    node.right = root
    root.left = null
    node = node.right
    dfs(root.right)
  }
  dfs(root)
  return head.right
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
let root = new TreeNode(
  5,
  new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(8, new TreeNode(7), new TreeNode(9)))
)

console.log(increasingBST(root))

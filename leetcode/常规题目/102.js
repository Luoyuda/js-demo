/*
 * @Author: xiaohuolong
 * @Date: 2021-04-11 10:48:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-11 10:51:35
 * @FilePath: /js-demo/leetcode/常规题目/102.js
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
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  let res = []
  let q = [root]
  while (q.length) {
    let result = []
    let len = q.length
    for (let i = 0; i < len; i++) {
      let node = q.shift()
      if (!node) continue
      result.push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
    res.push(result)
  }
  return res
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right.left = new TreeNode(5)

console.log(levelOrder(root))

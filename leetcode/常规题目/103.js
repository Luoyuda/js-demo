/*
 * @Author: xiaohuolong
 * @Date: 2021-03-27 15:11:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-27 15:31:54
 * @FilePath: /js-demo/leetcode/常规题目/103.js
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
var zigzagLevelOrder = function (root) {
  let res = []
  if (!root) return []
  let stack = [root]
  let isOrderLeft = true
  while (stack.length) {
    let levelList = []
    let size = stack.length
    for (let i = 0; i < size; i++) {
      let node = stack.shift()
      if (isOrderLeft) {
        levelList.push(node.val)
      } else {
        levelList.unshift(node.val)
      }
      if (node.left !== null) {
        stack.push(node.left)
      }
      if (node.right !== null) {
        stack.push(node.right)
      }
    }
    res.push(levelList)
    isOrderLeft = !isOrderLeft
  }
  return res
}
/**
 * O(n) O(n)
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const result = []
  if (!root) return result
  const stack = [root]
  let flag = true
  while (stack.length) {
    const res = []
    const len = stack.length
    for (let i = 0; i < len; i++) {
      const node = stack.shift()
      res.push(node.val)
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
    if (!flag) res.reverse()
    flag = !flag
    result.push(res)
  }
  return result
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
let root = new TreeNode(7)
root.left = new TreeNode(3)
root.right = new TreeNode(15)
root.right.left = new TreeNode(9)
root.right.right = new TreeNode(20)
console.log(zigzagLevelOrder(root))

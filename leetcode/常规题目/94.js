/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 10:41:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 11:05:01
 * @FilePath: /js-demo/leetcode/常规题目/94.js
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
94. 二叉树的中序遍历
    给定一个二叉树的根节点 root ，返回它的 中序 遍历。
示例 1：
    输入：root = [1,null,2,3]
    输出：[1,3,2]
示例 2：
    输入：root = []
    输出：[]
示例 3：
    输入：root = [1]
    输出：[1]
示例 4：
    输入：root = [1,2]
    输出：[2,1]
示例 5：
    输入：root = [1,null,2]
    输出：[1,2]
提示：
    树中节点数目在范围 [0, 100] 内
    -100 <= Node.val <= 100
    进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 */
var inorderTraversal = function (root) {
  let res = []
  if (!root) return res
  let stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}
/**
 * O(n) O(n)
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = []
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    result.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return result
}

/**
 * O(n) O(n)
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = []
  if (!root) return result
  const stack = []
  let node = root
  while (stack.length || node) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    result.push(node.val)
    node = node.right
  }
  return result
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
let root = new TreeNode(1)
root.right = new TreeNode(2)
root.right.left = new TreeNode(3)
console.log(inorderTraversal(root))

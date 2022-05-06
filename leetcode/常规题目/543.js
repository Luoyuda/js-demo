/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 22:11:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 22:20:44
 * @FilePath: /js-demo/leetcode/常规题目/543.js
 */

/**
543. 二叉树的直径
    给定一棵二叉树，你需要计算它的直径长度。
    一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
示例 :
    给定二叉树
          1
         / \
        2   3
       / \     
      4   5    
    返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
注意：两结点之间的路径长度是以它们之间边的数目表示。
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let ans = 1
  var depth = function (root) {
    if (!root) return 0
    let left = depth(root.left)
    let right = depth(root.right)
    ans = Math.max(ans, left + right + 1)
    return Math.max(left, right) + 1
  }
  depth(root)
  return ans - 1
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
let root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
)

console.log(diameterOfBinaryTree(root))

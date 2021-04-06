/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 09:23:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 09:27:15
 * @FilePath: /js-demo/leetcode/常规题目/226.js
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
226. 翻转二叉树
    翻转一棵二叉树。
示例：
输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
 */
var invertTree = function(root) {
    if(!root) return null
    let right = root.right
    root.right = invertTree(root.left)
    root.left = invertTree(right)
    return root
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7, new TreeNode(6), new TreeNode(9)))
console.log(invertTree(root))
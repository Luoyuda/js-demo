/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 17:51:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 17:56:22
 * @FilePath: /js-demo/leetcode/常规题目/404.js
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
 * @return {number}
404. 左叶子之和
    计算给定二叉树的所有左叶子之和。
示例：
    3
   / \
  9  20
    /  \
   15   7
在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 */
var sumOfLeftLeaves = function(root) {
    let sum = 0
    let dfs = root => {
        if(!root) return
        if(root.left && !root.left.left && !root.left.right) sum += root.left.val
        else dfs(root.left)
        dfs(root.right)
    }
    dfs(root)
    return sum
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(3, 
    new TreeNode(9, ), 
    new TreeNode(20,
        new TreeNode(15), 
        new TreeNode(7), 
    )
)

console.log(sumOfLeftLeaves(root))
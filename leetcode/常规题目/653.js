/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 17:40:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 17:49:51
 * @FilePath: /js-demo/leetcode/常规题目/653.js
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
 * @param {number} k
 * @return {boolean}
653. 两数之和 IV - 输入 BST
    给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
案例 1:
输入: 
    5
   / \
  3   6
 / \   \
2   4   7
Target = 9
输出: True
案例 2:
输入: 
    5
   / \
  3   6
 / \   \
2   4   7
Target = 28
输出: False
 */
var findTarget = function(root, k) {
    let hash = {}
    return dfs(root, k, hash)
};

var dfs = (root, k, hash) => {
    if(!root) return false
    if(hash[k - root.val]) return true
    hash[root.val] = true
    return dfs(root.left, k, hash) || dfs(root.right, k, hash)
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(5, 
    new TreeNode(3, 
        new TreeNode(2), 
        new TreeNode(4)
    ), 
    new TreeNode(6,
        null, 
        new TreeNode(7), 
    )
)

console.log(findTarget(root, 14))
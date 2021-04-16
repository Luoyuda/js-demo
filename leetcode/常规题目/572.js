/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 18:45:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 19:00:16
 * @FilePath: /js-demo/leetcode/常规题目/572.js
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
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
572. 另一个树的子树
给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。
示例 1:
给定的树 s:
     3
    / \
   4   5
  / \
 1   2
给定的树 t：
   4 
  / \
 1   2
返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。
示例 2:
给定的树 s：
     3
    / \
   4   5
  / \
 1   2
    /
   0
给定的树 t：
   4
  / \
 1   2
返回 false。
 */
var isSubtree = function(s, t) {
    return dfs(s, t)
};
var dfs = (s, t) => {
    if(!s) return false
    return check(s, t) || dfs(s.left, t) || dfs(s.right, t)
}
var check = (s, t) => {
    if(!s && !t) return true
    if(!s || !t || s.val != t.val) return false
    return check(s.left, t.left) && check(s.right, t.right)
}
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root1 = new TreeNode(3, 
    new TreeNode(4,
        new TreeNode(1), 
        new TreeNode(2, new TreeNode(0)), 
    ),
    new TreeNode(5, ), 
)
var root2 = new TreeNode(4,
    new TreeNode(1), 
    new TreeNode(2), 
)
var root1 = new TreeNode(1, 
    new TreeNode(1, ), 
)
var root2 = new TreeNode(1,
)
console.log(isSubtree(root1, root2))

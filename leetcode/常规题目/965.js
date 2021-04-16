/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 08:42:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 08:42:59
 * @FilePath: /js-demo/leetcode/常规题目/965.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
965. 单值二叉树
    如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。
    只有给定的树是单值二叉树时，才返回 true；否则返回 false。
示例 1：
    输入：[1,1,1,1,1,null,1]
    输出：true
示例 2：
    输入：[2,2,2,5,2]
    输出：false
提示：
    给定树的节点数范围是 [1, 100]。
    每个节点的值都是整数，范围为 [0, 99] 。
 */
var isUnivalTree = function(root) {
    return dfs(root, root.val)
};
var dfs = (root, val) => {
    if(!root) return true
    if(root.val != val) return false
    return dfs(root.left, val) && dfs(root.right, val)
}
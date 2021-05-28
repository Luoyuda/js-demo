/*
 * @Author: xiaohuolong
 * @Date: 2021-05-19 15:56:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 15:57:27
 * @FilePath: /js-demo/leetcode/常规题目/298.js
 */
/*
298. 二叉树最长连续序列
    给你一棵指定的二叉树，请你计算它最长连续序列路径的长度。
    该路径，可以是从某个初始结点到树中任意结点，通过「父 - 子」关系连接而产生的任意路径。
    这个最长连续的路径，必须从父结点到子结点，反过来是不可以的。
示例 1：
输入:
   1
    \
     3
    / \
   2   4
        \
         5
输出: 3
解析: 当中，最长连续序列是 3-4-5，所以返回结果为 3
示例 2：
输入:
   2
    \
     3
    / 
   2    
  / 
 1
输出: 2 
解析: 当中，最长连续序列是 2-3。注意，不是 3-2-1，所以返回 2。
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
 */
var longestConsecutive = function(root) {
    let max = 0
    let dfs = (root, parent, length) => {
        if(!root) return 0
        length = parent && parent.val + 1 == root.val ? length + 1 : 1
        max = Math.max(max, length)
        dfs(root.left, root, length)
        dfs(root.right, root, length)
    }
    dfs(root, null, 0)
    return max
};
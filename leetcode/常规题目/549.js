/*
 * @Author: xiaohuolong
 * @Date: 2021-05-19 16:27:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 16:27:26
 * @FilePath: /js-demo/leetcode/常规题目/549.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/*
549. 二叉树中最长的连续序列
    给定一个二叉树，你需要找出二叉树中最长的连续序列路径的长度。
    请注意，该路径可以是递增的或者是递减。例如，[1,2,3,4] 和 [4,3,2,1] 都被认为是合法的，
    而路径 [1,2,4,3] 则不合法。另一方面，路径可以是 子-父-子 顺序，并不一定是 父-子 顺序。
示例 1:
输入:
        1
       / \
      2   3
输出: 2
解释: 最长的连续路径是 [1, 2] 或者 [2, 1]。
示例 2:
输入:
        2
       / \
      1   3
输出: 3
解释: 最长的连续路径是 [1, 2, 3] 或者 [3, 2, 1]。
注意: 树上所有节点的值都在 [-1e7, 1e7] 范围内。
*/
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function(root) {
    let max = 0
    let dfs = root => {
        if(!root) return [0, 0]
        let inr = 1
        let dcr = 1
        if(root.left){
            let l = dfs(root.left)
            if(root.val == root.left.val + 1){
                dcr = l[1] + 1
            }else if(root.val == root.left.val - 1){
                inr = l[0] + 1
            }
        }
        if(root.right){
            let r = dfs(root.right)
            if(root.val == root.right.val + 1){
                dcr = Math.max(r[1] + 1, dcr)
            }else if(root.val == root.right.val - 1){
                inr = Math.max(r[0] + 1, inr)
            }
        }
        max = Math.max(max, dcr + inr - 1)
        return [inr, dcr]
    }
    dfs(root)
    return max
};
/*
 * @Author: xiaohuolong
 * @Date: 2021-05-19 17:16:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 17:16:49
 * @FilePath: /js-demo/leetcode/常规题目/687.js
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
687. 最长同值路径
    给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。
    注意：两个节点之间的路径长度由它们之间的边数表示。
示例 1:
    输入:
              5
             / \
            4   5
           / \   \
          1   1   5
    输出:
    2
示例 2:
    输入:
              1
             / \
            4   5
           / \   \
          4   4   5
    输出:
    2
注意: 给定的二叉树不超过10000个结点。 树的高度不超过1000。
*/
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestUnivaluePath = function(root) {
    let ans = 0
    let dfs = node => {
        if(!node) return 0
        let left = dfs(node.left)
        let right = dfs(node.right)
        let leftCount = 0
        let rightCount = 0
        if(node.left && node.left.val == node.val){
            leftCount += left + 1
        }
        if(node.right && node.right.val == node.val){
            rightCount += right + 1
        }
        ans = Math.max(ans, leftCount + rightCount)
        return Math.max(leftCount, rightCount)
    }
    dfs(root)
    return ans
};
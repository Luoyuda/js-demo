/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 14:19:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 14:27:09
 * @FilePath: /js-demo/leetcode/常规题目/938.js
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
938. 二叉搜索树的范围和
    给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
示例 1：
    输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
    输出：32
示例 2：
    输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
    输出：23
提示：
    树中节点数目在范围 [1, 2 * 104] 内
    1 <= Node.val <= 105
    1 <= low <= high <= 105
    所有 Node.val 互不相同
 */
var rangeSumBST = function(root, low, high) {
    if(!root) return 0
    if(root.val > high) return rangeSumBST(root.left, low, high)
    if(root.val < low) return rangeSumBST(root.right, low, high)
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(10, new TreeNode(5, new TreeNode(3), new TreeNode(7)), new TreeNode(15, null, new TreeNode(18)))

console.log(rangeSumBST(root, 7, 15))
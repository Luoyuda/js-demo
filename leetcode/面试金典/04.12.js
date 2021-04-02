/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 21:41:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 22:51:24
 * @FilePath: /js-demo/leetcode/面试金典/04.12.js
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
 * @param {number} sum
 * @return {number}
面试题 04.12. 求和路径
给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)。
设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。
注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。
示例:
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回: 3
解释：和为 22 的路径有：[5,4,11,2], [5,8,4,5], [4,11,7]
提示：
节点总数 <= 10000
 */
var dfs = (root, num) => {
    if(!root) return 0
    if(root.val == num) return 1 +  dfs(root.left, num - root.val) +  dfs(root.right, num - root.val)
    return dfs(root.left, num - root.val) +  dfs(root.right, num - root.val)
}

var pathSum = function(root, sum) {
    if(!root) return 0
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let root = new TreeNode(5)
root.left = new TreeNode(4)
root.right = new TreeNode(8)
root.left.left = new TreeNode(11)
root.right.left = new TreeNode(13)
root.right.right = new TreeNode(4)
root.right.right.left = new TreeNode(5)
root.right.right.left = new TreeNode(1)
root.left.left.left = new TreeNode(7)
root.left.left.right = new TreeNode(2)

console.log(pathSum(root, 22))
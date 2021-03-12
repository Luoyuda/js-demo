/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 14:46:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 16:21:22
 * @FilePath: /js-demo/leetcode/offer.34.js
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
 * @return {number[][]}
剑指 Offer 34. 二叉树中和为某一值的路径
    输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。
    从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。
示例:
    给定如下二叉树，以及目标和 sum = 22，
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
    返回:
    [
        [5,4,11,2],
        [5,8,4,5]
    ]
提示：
    节点总数 <= 10000
 */
var pathSum = function(root, sum) {
    let res = []
    dfs(root, sum, [], res)
    return res
};

var dfs = (root, sum, path=[], res=[]) => {
    if(!root) return null
    path.push(root.val)
    sum -= root.val
    if(sum == 0 && root.left == null && root.right == null) res.push(path.slice())
    dfs(root.left, sum, path, res)
    dfs(root.right, sum, path, res)
    path.pop()
}

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
root.left.left.left = new TreeNode(7)
root.left.left.right = new TreeNode(2)
root.right.right.left = new TreeNode(5)
root.right.right.right = new TreeNode(1)

console.log(pathSum(root, 22))
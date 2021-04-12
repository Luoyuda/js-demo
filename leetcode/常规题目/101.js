/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 21:17:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-08 21:28:47
 * @FilePath: /js-demo/leetcode/常规题目/101.js
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
 * @return {boolean}
101. 对称二叉树
    给定一个二叉树，检查它是否是镜像对称的。
    例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
    1
   / \
  2   2
 / \ / \
3  4 4  3
    但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
    1
   / \
  2   2
   \   \
   3    3
进阶：
    你可以运用递归和迭代两种方法解决这个问题吗？
 */
var isSymmetric = function(root) {
    if(!root || (root.left == root.right && root.left == null)) return true
    let queue = [root.left, root.right]
    while (queue.length){
        let len = queue.length
        let left = queue.shift()
        let right = queue.shift()
        if(!left && !right) continue 
        if(!left || !right) return false
        if(left.val != right.val) return false
        queue.push(left.left, right.right)
        queue.push(left.right, right.left)
    }
    return true
};

var isSymmetric = function(root) {
    if(!root) return true
    let dfs = (left, right) => {
        if(!left && !right) return true
        if(!left || !right) return false
        if(left.val != right.val) return false
        return dfs(left.right, right.left) &&  dfs(left.left, right.right)
    }
    return dfs(root.left, root.right)
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
let root = 
new TreeNode(1, 
    new TreeNode(2, 
        new TreeNode(3), 
        new TreeNode(4)
    ), 
    new TreeNode(2,
        new TreeNode(3),
        new TreeNode(4),
    )
)
console.log(isSymmetric(root))
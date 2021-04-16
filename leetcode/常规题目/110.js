/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 18:15:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 18:42:18
 * @FilePath: /js-demo/leetcode/常规题目/110.js
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
110. 平衡二叉树
    给定一个二叉树，判断它是否是高度平衡的二叉树。
    本题中，一棵高度平衡二叉树定义为：
    一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
示例 1：
    输入：root = [3,9,20,null,null,15,7]
    输出：true
示例 2：
    输入：root = [1,2,2,3,3,null,null,4,4]
    输出：false
示例 3：
    输入：root = []
    输出：true
提示：
    树中的节点数在范围 [0, 5000] 内
    -104 <= Node.val <= 104
 */
var isBalanced = function(root) {
    if(!root) return true
    return (Math.abs(height(root.left) - height(root.right)) <= 1) && isBalanced(root.left) && isBalanced(root.right)
};

var height = (root) => {
    if(!root) return 0
    return Math.max(height(root.left), height(root.right)) + 1
}

var isBalanced = function(root) {
    return recur(root) != -1;
}
var recur = function(root) {
    if(!root) return 0
    let left = recur(root.left)
    if(left == -1) return -1
    let right = recur(root.right)
    if(right == -1) return -1
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(3, 
    new TreeNode(9, ), 
    new TreeNode(20,
        new TreeNode(15), 
        new TreeNode(7), 
    )
)
console.log(isBalanced(root))

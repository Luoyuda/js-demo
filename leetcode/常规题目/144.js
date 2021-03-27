/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 15:19:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 15:23:12
 * @FilePath: /js-demo/leetcode/常规题目/144.js
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
 * @return {number[]}
144. 二叉树的前序遍历
    给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
示例 1：
    输入：root = [1,null,2,3]
    输出：[1,2,3]
示例 2：
    输入：root = []
    输出：[]
示例 3：
    输入：root = [1]
    输出：[1]
示例 4：
    输入：root = [1,2]
    输出：[1,2]
示例 5：
    输入：root = [1,null,2]
    输出：[1,2]
提示：
    树中节点数目在范围 [0, 100] 内
    -100 <= Node.val <= 100
进阶：递归算法很简单，你可以通过迭代算法完成吗？
 */
var preorderTraversal = function(root) {
    let res = []
    if(!root) return res
    let stack = [root]
    while(stack.length){
        let node = stack.pop()
        res.push(node.val)
        if(node.right) stack.push(node.right)
        if(node.left) stack.push(node.left)
    }
    return res
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.right.left = new TreeNode(4)
console.log(preorderTraversal(root))

/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 11:07:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 14:28:16
 * @FilePath: /js-demo/leetcode/常规题目/145.js
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
145. 二叉树的后序遍历
给定一个二叉树，返回它的 后序 遍历。
示例:
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [3,2,1]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 */
var postorderTraversal = function(root) {
    let res = []
    if(!root) return res
    let stack = []
    let prev = null
    while(stack.length || root){
        while(root != null){
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if(!root.right || root.right == prev){
            res.push(root.val)
            prev = root
            root = null
        }else{
            stack.push(root)
            root = root.right
        }
    }
    // console.log(res)
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
console.log(postorderTraversal(root))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 20:59:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 21:06:19
 * @FilePath: /js-demo/leetcode/常规题目/230.js
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let res = null
    let dfs = (root) => {
        if(!root) return null
        dfs(root.left)
        k--
        if(k == 0) return res = root.val
        dfs(root.right)
    }
    dfs(root)
    return res
};

var kthSmallest = function(root, k) {
    let stack = []
    while (true){
        while(root){
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        k--
        if(k == 0) return root.val
        root = root.right
    }
};


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let node3 = new TreeNode(3)
let node1 = new TreeNode(1)
let node2 = new TreeNode(2)
let node4 = new TreeNode(4)
node3.left = node1
node1.right = node2
node3.right = node4

console.log(kthSmallest(node3, 4))
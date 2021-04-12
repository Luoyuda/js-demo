/*
 * @Author: xiaohuolong
 * @Date: 2021-04-11 10:53:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-11 10:53:48
 * @FilePath: /js-demo/leetcode/常规题目/107.js
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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if(!root) return []
    let res = []
    let q = [root]
    while(q.length){
        let result = []
        let len = q.length
        for (let i = 0; i < len; i++) {
            let node = q.shift()
            if(!node) continue
            result.push(node.val)
            if(node.left) q.push(node.left)
            if(node.right) q.push(node.right)
        }
        res.unshift(result)
    }
    return res
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right.left = new TreeNode(5)

console.log(levelOrderBottom(root))
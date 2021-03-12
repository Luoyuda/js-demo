/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 12:50:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 12:55:10
 * @FilePath: /js-demo/leetcode/offer.32.3.js
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
 * @return {number[][]}
    剑指 Offer 32 - III. 从上到下打印二叉树 III
        请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，
        第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
    例如:
    给定二叉树: [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
    返回其层次遍历结果：
    [
        [3],
        [20,9],
        [15,7]
    ]
 */
var levelOrder = function(root) {
    let result = []
    if(!root) return result
    let queue = []
    queue.push(root)
    while(queue.length){
        let temp = []
        for (let i = queue.length; i > 0; i--) {
            const node = queue.shift();
            if(result.length % 2 == 0) temp.push(node.val)
            else temp.unshift(node.val)
            if(node.left != null) queue.push(node.left);
            if(node.right != null) queue.push(node.right);
        }
        result.push(temp)
    }
    return result
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(3)
root.left = new TreeNode(9)
root.right = new TreeNode(20)
root.right.left = new TreeNode(15)
root.right.right = new TreeNode(7)

console.log(levelOrder(root))
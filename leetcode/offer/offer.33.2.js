/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 11:45:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 12:26:43
 * @FilePath: /js-demo/leetcode/offer.33.js
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
    剑指 Offer 32 - II. 从上到下打印二叉树 II
        从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
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
            [9,20],
            [15,7]
        ]
    提示：
        节点总数 <= 1000
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
            temp.push(node.val)
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

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.right.right = new TreeNode(5)

console.log(levelOrder(root))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 11:45:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 11:59:50
 * @FilePath: /js-demo/leetcode/offer.32.js
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
    剑指 Offer 32 - I. 从上到下打印二叉树
        从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
    例如:
        给定二叉树: [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
        返回：
    [3,9,20,15,7]
    提示：
        节点总数 <= 1000
 */
var levelOrder = function(root) {
    let result = []
    if(!root) return result
    let res = []
    res.push(root)
    while(res.length){
        let item = res.shift()
        result.push(item.val)
        if(item.left) res.push(item.left)
        if(item.right) res.push(item.right)
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
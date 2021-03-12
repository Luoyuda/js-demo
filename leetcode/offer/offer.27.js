/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 07:54:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 08:12:15
 * @FilePath: /js-demo/leetcode/offer.27.js
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
    剑指 Offer 27. 二叉树的镜像
        请完成一个函数，输入一个二叉树，该函数输出它的镜像。
        例如输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9
    镜像输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
    示例 1：
        输入：root = [4,2,7,1,3,6,9]
        输出：[4,7,2,9,6,3,1]
    限制：
        0 <= 节点个数 <= 1000
 */
var mirrorTree = function(root) {
    if(root == null) return null
    let left = root.left
    root.left = mirrorTree(root.right)
    root.right = mirrorTree(left)
    return root
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(4)
root.left = new TreeNode(2)
root.right = new TreeNode(7)
root.left.left = new TreeNode(1)
root.left.right = new TreeNode(3)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(9)

console.log(mirrorTree(root))
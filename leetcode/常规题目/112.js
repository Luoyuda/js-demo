/*
 * @Author: xiaohuolong
 * @Date: 2020-07-07 23:55:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-07 23:58:12
 * @FilePath: /js-demo/leetcode/112.js
 */ 
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const hasPathSum = (root, sum) => {
    if (root == null) {
        return false;
    }
    if (root.left == null && root.right == null) {
        return sum == root.val;
    }
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}

const tree = new TreeNode(5)
tree.left = new TreeNode(4)
tree.right = new TreeNode(8)
tree.left.left = new TreeNode(11)
tree.right.left = new TreeNode(13)
tree.right.right = new TreeNode(4)

console.log(hasPathSum(tree, 13))
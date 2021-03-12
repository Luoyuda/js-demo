/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 08:03:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 08:10:16
 * @FilePath: /js-demo/leetcode/offer.28.js
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
    剑指 Offer 28. 对称的二叉树
        请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
        例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
    1
   / \
  2   2
 / \ / \
3  4 4  3
        但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
    1
   / \
  2   2
   \   \
   3    3
    示例 1：
        输入：root = [1,2,2,3,4,4,3]
        输出：true
    示例 2：
        输入：root = [1,2,2,null,3,null,3]
        输出：false
 */
var isSymmetric = function(root) {
    return root == null ? true : check(root.left, root.right)
};
var check = (L, R) => {
    if(L == null && R == null) return true
    if(L == null || R == null || L.val != R.val) return false
    return check(L.left, R.right) && check(L.right, R.left)
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(2)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right.left = new TreeNode(4)
root.right.right = new TreeNode(4)

console.log(isSymmetric(root))
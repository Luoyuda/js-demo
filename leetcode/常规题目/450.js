/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 07:46:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-08 08:46:41
 * @FilePath: /js-demo/leetcode/常规题目/450.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
450. 删除二叉搜索树中的节点
    给定一个二叉搜索树的根节点 root 和一个值 key，
    删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
    返回二叉搜索树（有可能被更新）的根节点的引用。
一般来说，删除节点可分为两个步骤：
    首先找到需要删除的节点；
    如果找到了，删除它。
    说明： 要求算法时间复杂度为 O(h)，h 为树的高度。
示例:
    root = [5,3,6,2,4,null,7]
    key = 3
    5
   / \
  3   6
 / \   \
2   4   7
    给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
    一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
    5
   / \
  4   6
 /     \
2       7
    另一个正确答案是 [5,2,6,null,4,null,7]。
    5
   / \
  2   6
   \   \
    4   7
 */
const successor = (root) => {
    // 右子树中找到最小的那个节点
    root = root.right;
    while (root.left != null) root = root.left;
    return root.val;
}
const predecessor = (root) => {
    // 左子树中找到最大的那个节点
    root = root.left;
    while (root.right != null) root = root.right;
    return root.val;
}
var deleteNode = function(root, key) {
    if(!root) return null
    if(root.val > key) root.left = deleteNode(root.left, key)
    else if(root.val < key) root.right = deleteNode(root.right, key)
    else{
        if(!root.left && !root.right){
            root = null
        }else if(root.right){
            root.val = successor(root)
            root.right = deleteNode(root.right, root.val)
        }else{
            root.val = predecessor(root)
            root.left = deleteNode(root.left, root.val)
        }
    }
    return root
};


let r5 = new TreeNode(5)
let r3 = new TreeNode(3)
let r6 = new TreeNode(6)
let r2 = new TreeNode(2)
let r4 = new TreeNode(4)
let r7 = new TreeNode(7)

r5.left = r3
r5.right = r6
r6.right = r7
r3.left = r2
r3.right = r4

// console.log(deleteNode(r5, r5.val))
console.log(deleteNode(r5, r3.val))
// console.log(deleteNode(r5, r2.val))
// console.log(deleteNode(r5, r7.val))
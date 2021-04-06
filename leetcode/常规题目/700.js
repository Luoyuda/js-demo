/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 19:39:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 19:46:23
 * @FilePath: /js-demo/leetcode/常规题目/700.js
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
700. 二叉搜索树中的搜索
    给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 
    返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
例如，
给定二叉搜索树:
        4
       / \
      2   7
     / \
    1   3
和值: 2
你应该返回如下子树:
      2     
     / \   
    1   3
在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
 */
var searchBST = function(root, val) {
    if(!root) return null
    if(root.val == val) return root
    else if(root.val > val) return searchBST(root.left, val)
    else if(root.val < val) return searchBST(root.right, val)
};
var searchBST = function(root, val) {
    if(!root) return null
    while(root){
        if(root.val == val) return root
        else if(root.val > val) root = root.left
        else if(root.val < val) root = root.right
    }
    return null
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7))

console.log(searchBST(root, 2))
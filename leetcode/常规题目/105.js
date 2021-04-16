/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 20:47:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 20:59:16
 * @FilePath: /js-demo/leetcode/常规题目/105.js
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
105. 从前序与中序遍历序列构造二叉树
    根据一棵树的前序遍历与中序遍历构造二叉树。
注意:
    你可以假设树中没有重复的元素。
例如，给出
    前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：
    3
   / \
  9  20
    /  \
   15   7
 */
var build = function(preorder, inorder, preorderLeft, preorderRight, inorderLeft, inorderRight, map){
    if(preorderLeft > preorderRight) return null
    let preorderRoot = preorderLeft
    let inorderRoot = map.get(preorder[preorderRoot])
    let root = new TreeNode(preorder[preorderRoot])
    let leftSize = inorderRoot - inorderLeft
    root.left = build(preorder, inorder, preorderLeft + 1, preorderLeft + leftSize, inorderLeft, inorderRoot - 1, map)
    root.right = build(preorder, inorder, preorderLeft + leftSize + 1, preorderRight, inorderRoot + 1, inorderRight, map)
    return root
}
var buildTree = function(preorder, inorder) {
    let map = new Map()
    let n = preorder.length
    for (let i = 0; i < n; i++) {
        map.set(inorder[i], i)
    }
    return build(preorder, inorder, 0, n-1, 0, n-1, map)
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))
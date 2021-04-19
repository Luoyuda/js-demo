/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 09:36:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 09:49:09
 * @FilePath: /js-demo/leetcode/常规题目/106.js
 */
/**
106. 从中序与后序遍历序列构造二叉树
    根据一棵树的中序遍历与后序遍历构造二叉树。
注意:
    你可以假设树中没有重复的元素。
例如，给出
    中序遍历 inorder = [9,3,15,20,7]
    后序遍历 postorder = [9,15,7,20,3]
返回如下的二叉树：
    3
   / \
  9  20
    /  \
   15   7
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    let postIndex
    let idxMap = new Map()
    let helper = (left, right) => {
        if(left > right) return null
        let rootVal = postorder[postIndex]
        let root = new TreeNode(rootVal)
        let index = idxMap.get(rootVal)
        postIndex--
        root.right = helper(index + 1, right)
        root.left = helper(left, index - 1)
        return root
    }
    postIndex = postorder.length - 1
    inorder.forEach((item, index) => {
        idxMap.set(item, index)
    })
    return helper(0, inorder.length - 1)
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

console.log(buildTree([9,3,15,20,7], [9,15,7,20,3]))
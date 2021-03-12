/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 15:36:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 16:21:46
 * @FilePath: /js-demo/leetcode/offer.07.js
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
剑指 Offer 07. 重建二叉树
    输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如，给出
    前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：
    3
   / \
  9  20
    /  \
   15   7
限制：
    0 <= 节点个数 <= 5000
 */
var buildTree = function(preorder, inorder) {

    var build = (preorder, inorder, preorder_left, preorder_right, inorder_left, inorder_right) => {
        if(preorder_left > preorder_right) return null
        let preorder_root = preorder_left
        let inorder_root = indexMap[preorder[preorder_root]]
        let root = new TreeNode(preorder[preorder_root])
        let left_size = inorder_root - inorder_left
        console.log(left_size)
        root.left = build(preorder, inorder, preorder_left + 1, preorder_left + left_size, inorder_left, inorder_root - 1)
        root.right = build(preorder, inorder, preorder_left + left_size + 1, preorder_right, inorder_root + 1, inorder_right)
        return root
    }
    let n = preorder.length
    const indexMap = {}
    for (let i = 0; i < n; i++) {
        const el = inorder[i];
        indexMap[el] = i
    }
    return build(preorder, inorder, 0, n - 1, 0, n - 1)
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))
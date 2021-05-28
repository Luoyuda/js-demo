/*
 * @Author: xiaohuolong
 * @Date: 2021-05-11 23:19:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-11 23:59:56
 * @FilePath: /js-demo/leetcode/常规题目/1008.js
 */
/**
1008. 前序遍历构造二叉搜索树
    返回与给定前序遍历 preorder 相匹配的二叉搜索树（binary search tree）的根结点。
    (回想一下，二叉搜索树是二叉树的一种，其每个节点都满足以下规则，对于 node.left 的任何后代，
    值总 < node.val，而 node.right 的任何后代，值总 > node.val。
    此外，前序遍历首先显示节点 node 的值，然后遍历 node.left，接着遍历 node.right。）
示例：
    输入：[8,5,1,7,10,12]
    输出：[8,5,10,1,7,null,12]
提示：
    1 <= preorder.length <= 100
    1 <= preorder[i] <= 10^8
    preorder 中的值互不相同
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function(preorder) {
    let len = preorder.length
    if(!len) return null
    let root = new TreeNode(preorder[0])
    let stack = [root]
    for(let i = 1; i < len; i++){
        let node = stack[stack.length - 1]
        let curr = new TreeNode(preorder[i])
        while(stack.length && stack[stack.length - 1].val < curr.val){
            node = stack.pop()
        }
        if(node.val < curr.val){
            node.right = curr
        }else{
            node.left = curr
        }
        stack.push(curr)
    }
    return root
};

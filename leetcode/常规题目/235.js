/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 21:25:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 21:26:11
 * @FilePath: /js-demo/leetcode/常规题目/235.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
235. 二叉搜索树的最近公共祖先
    给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
    百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
示例 1:
    输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
    输出: 6 
    解释: 节点 2 和节点 8 的最近公共祖先是 6。
示例 2:
    输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
    输出: 2
    解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
说明:
    所有节点的值都是唯一的。
    p、q 为不同节点且均存在于给定的二叉搜索树中。
 */
var lowestCommonAncestor = function(root, p, q) {
    if(!root) return null
    if(root == p || root == q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if(!left) return right
    if(!right) return left
    return root
};
var lowestCommonAncestor = function(root, p, q){
    let ancestor = root
    while(true){
        if(p.val < ancestor.val && q.val < ancestor.val){
            ancestor = ancestor.left
        }else if(p.val > ancestor.val && q.val > ancestor.val){
            ancestor = ancestor.right
        }else{
            break
        }
    }
    return ancestor
}
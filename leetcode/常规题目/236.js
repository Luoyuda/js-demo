/*
 * @Author: xiaohuolong
 * @Date: 2021-04-07 23:33:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-07 23:50:46
 * @FilePath: /js-demo/leetcode/常规题目/236.js
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
236. 二叉树的最近公共祖先
    给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
    百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
示例 1：
    输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
    输出：3
    解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
示例 2：
    输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
    输出：5
    解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
示例 3：
    输入：root = [1,2], p = 1, q = 2
    输出：1
提示：
    树中节点数目在范围 [2, 105] 内。
    -109 <= Node.val <= 109
    所有 Node.val 互不相同 。
    p != q
    p 和 q 均存在于给定的二叉树中。
 */
var lowestCommonAncestor = function(root, p, q) {
    let ans
    let dfs = (root, p, q) => {
        if(root == null) return false
        let left = dfs(root.left, p, q)
        let right = dfs(root.right, p, q)
        if((left && right) || (root.val == p.val || root.val == q.val) && (left || right)){
            ans = root
        }
        return left || right || (root.val == p.val || root.val == q.val)
    }
    dfs(root, p, q)
    return ans
};
var lowestCommonAncestor = function(root, p, q) {
    if(!root || root == p || root == q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if(!left && !right) return null
    if(!left) return right
    if(!right) return left
    // return root
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let r3 = new TreeNode(3)
let r5 = new TreeNode(5)
let r1 = new TreeNode(1)
let r6 = new TreeNode(6)
let r2 = new TreeNode(2)
let r0 = new TreeNode(0)
let r8 = new TreeNode(8)
let r7 = new TreeNode(7)
let r4 = new TreeNode(4)

r3.left = r5
r3.right = r1
r5.left = r6
r5.right = r2
r2.left = r7
r2.right = r4
r1.left = r0
r1.right = r8

console.log(lowestCommonAncestor(r3, r5, r4))
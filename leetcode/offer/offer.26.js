/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 15:06:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 15:24:55
 * @FilePath: /js-demo/leetcode/offer.26.js
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
剑指 Offer 26. 树的子结构
    输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
    B是A的子结构， 即 A中有出现和B相同的结构和节点值。
例如:
给定的树 A:
     3
    / \
   4   5
  / \
 1   2
给定的树 B：
   4 
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
示例 1：
    输入：A = [1,2,3], B = [3,1]
    输出：false
示例 2：
    输入：A = [3,4,5,1,2], B = [4,1]
    输出：true
限制：
    0 <= 节点个数 <= 10000
 */
var isSubStructure = function(A, B) {
    return (A != null && B != null) && (check(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
};

var check = (A, B) => {
    if(B == null) return true
    if(A == null || A.val != B.val) return false
    return check(A.left, B.left) && check(A.right, B.right)
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let A = new TreeNode(3)
A.left = new TreeNode(4)
A.right = new TreeNode(5)
A.left.left = new TreeNode(1)
A.left.right = new TreeNode(2)

let B = new TreeNode(4)
B.left = new TreeNode(1)

console.log(isSubStructure(A, B))
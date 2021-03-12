/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 16:47:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 16:57:04
 * @FilePath: /js-demo/leetcode/offer.54.js
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
    剑指 Offer 54. 二叉搜索树的第k大节点
        给定一棵二叉搜索树，请找出其中第k大的节点。
    示例 1:
        输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
        输出: 4
    示例 2:
        输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
        输出: 4
    限制：
        1 ≤ k ≤ 二叉搜索树元素个数
 */
var kthLargest = function(root, k) {
    let res = null
    var dfs = (root) => {
        if(!root) return null
        dfs(root.right)
        k--
        if(k == 0) return res = root
        dfs(root.left)
    }
    dfs(root)
    return res
};


let node3 = new TreeNode(3)
let node1 = new TreeNode(1)
let node2 = new TreeNode(2)
let node4 = new TreeNode(4)
node3.left = node1
node1.right = node2
node3.right = node4

console.log(kthLargest(node3, 1))
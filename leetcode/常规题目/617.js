/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 09:03:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 09:14:49
 * @FilePath: /js-demo/leetcode/常规题目/617.js
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
617. 合并二叉树
    给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
    你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，
    否则不为 NULL 的节点将直接作为新二叉树的节点。
示例 1:
输入: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
输出: 
合并后的树:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7
注意: 合并必须从两个树的根节点开始。
 */
var mergeTrees = function(root1, root2) {
    if(!root1 & !root2) return null
    if(!root1) return root2
    if(!root2) return root1
    let root = root1
    root.val += root2.val
    root.left = mergeTrees(root1.left, root2.left)
    root.right = mergeTrees(root1.right, root2.right)
    return root
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root1 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(2))
let root2 = new TreeNode(2, new TreeNode(1, null, new TreeNode(4)), new TreeNode(3, null, new TreeNode(7)))
// console.log(root1)
// console.log(root2)

console.log(mergeTrees(root1, root2))
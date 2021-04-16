/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 20:23:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 20:38:39
 * @FilePath: /js-demo/leetcode/常规题目/513.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
513. 找树左下角的值
给定一个二叉树，在树的最后一行找到最左边的值。
示例 1:
输入:
    2
   / \
  1   3
输出:
1
示例 2:
输入:
        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7
输出:
7
注意: 您可以假设树（即给定的根节点）不为 NULL。
 */
// bfs
var findBottomLeftValue = function(root) {
    let q = [root];
    let temp = null
    while(q.length){
        temp = q.shift()
        if(temp.right){
            q.push(temp.right)
        }
        if(temp.left) {
            q.push(temp.left)
        }
    }
    return temp.val
};

// dfs
var findBottomLeftValue = function(root) {
    let depth = 0
    let val = root.val
    let dfs = (root, level) => {
        if(!root.left && !root.right){
            if(level > depth){
                depth = level
                val = root.val
            }
            return
        }
        if(root.left)dfs(root.left, level+1)
        if(root.right)dfs(root.right, level+1)
    }
    dfs(root, 0)
    return val
};


function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root1 = new TreeNode(2, 
    new TreeNode(1), 
    new TreeNode(3)
)
let root2 = new TreeNode(1, 
    new TreeNode(2, 
        new TreeNode(4)
    ), 
    new TreeNode(3, 
        new TreeNode(5, 
            new TreeNode(7)
        ), 
        new TreeNode(6)
    )
)

console.log(findBottomLeftValue(root1))
console.log(findBottomLeftValue(root2))
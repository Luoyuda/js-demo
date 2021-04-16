/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 21:36:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 22:00:56
 * @FilePath: /js-demo/leetcode/常规题目/1302.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
1302. 层数最深叶子节点的和
    给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
示例 1：
    输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
    输出：15
示例 2：
    输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
    输出：19
 */
var deepestLeavesSum = function(root) {
    let maxDepth = -1
    let total = 0
    let dfs = (root, depth) => {
        if(!root) return
        if(maxDepth < depth){
            maxDepth = depth
            total = root.val
        }else if(depth == maxDepth){
            total += root.val
        }
        dfs(root.left, depth + 1)
        dfs(root.right, depth + 1)
    }
    dfs(root, 0)
    return total
};
var deepestLeavesSum = function(root) {
    if(!root) return 0
    let q = [root, 0]
    let maxDep = -1
    let total = 0
    while(q.length){
        let node = q.shift()
        let dep = q.shift()
        if(dep > maxDep){
            total = node.val
            maxDep = dep
        }else if(dep == maxDep){
            total += node.val
        }
        if(node.left){
            q.push(node.left, dep + 1)
        }
        if(node.right){
            q.push(node.right, dep + 1)
        }
    }
    return total
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root1 = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4, new TreeNode(7)),
        new TreeNode(5),
    ),
    new TreeNode(3,
        new TreeNode(6, null, new TreeNode(8)),
    ),
)
console.log(deepestLeavesSum(root1))

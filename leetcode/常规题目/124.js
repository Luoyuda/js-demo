/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 21:50:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 22:00:17
 * @FilePath: /js-demo/leetcode/常规题目/124.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number}
124. 二叉树中的最大路径和
    路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
    路径和 是路径中各节点值的总和。
    给你一个二叉树的根节点 root ，返回其 最大路径和 。
示例 1：
    输入：root = [1,2,3]
    输出：6
    解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
示例 2：
    输入：root = [-10,9,20,null,null,15,7]
    输出：42
    解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
提示：
    树中节点数目范围是 [1, 3 * 104]
    -1000 <= Node.val <= 1000
 */
var maxPathSum = function(root) {
    let max = -Infinity
    let dfs = (root)=>{
        if(!root) return 0
        let left = Math.max(dfs(root.left), 0)
        let right = Math.max(dfs(root.right), 0)
        let temp = root.val + left + right
        max = Math.max(max, temp)
        return root.val + Math.max(left, right)
    }
    dfs(root)
    return max
};

let root = new TreeNode(-10,
    new TreeNode(9),
    new TreeNode(20, 
        new TreeNode(15),
        new TreeNode(7),
    )
)

console.log(maxPathSum(root))
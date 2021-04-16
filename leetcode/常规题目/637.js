/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 07:56:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 07:59:50
 * @FilePath: /js-demo/leetcode/常规题目/637.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[]}
637. 二叉树的层平均值
    给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
示例 1：
输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
提示：
    节点值的范围在32位有符号整数范围内。
 */
var averageOfLevels = function(root) {
    if(!root) return []
    let res = []
    let q = [root]
    while(q.length){
        let len = q.length
        let sum = 0
        for (let i = 0; i < len; i++) {
            let node = q.shift()
            if(!node) continue
            sum += node.val
            if(node.left) q.push(node.left)
            if(node.right) q.push(node.right)
        }
        res.push(sum / len)
    }
    return res
};

let root = new TreeNode(3, 
    new TreeNode(9, 
        // new TreeNode(0), 
        // new TreeNode(1)
    ), 
    new TreeNode(20,
        new TreeNode(15), 
        new TreeNode(7)
    ) 
)
console.log(averageOfLevels(root))
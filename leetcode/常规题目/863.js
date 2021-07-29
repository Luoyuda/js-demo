/*
 * @Author: xiaohuolong
 * @Date: 2021-07-28 08:22:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-28 08:23:19
 * @FilePath: /js-demo/leetcode/常规题目/863.js
 */
/*
863. 二叉树中所有距离为 K 的结点
    给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。
    返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。
示例 1：
    输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
    输出：[7,4,1]
    解释：
    所求结点为与目标结点（值为 5）距离为 2 的结点，
    值分别为 7，4，以及 1
    注意，输入的 "root" 和 "target" 实际上是树上的结点。
    上面的输入仅仅是对这些对象进行了序列化描述。
提示：
    给定的树是非空的。
    树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
    目标结点 target 是树上的结点。
    0 <= K <= 1000.
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
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function(root, target, k) {
    const parent = new Map()
    const findParent = node => {
        if(node.left){
            parent.set(node.left.val, node)
            findParent(node.left)
        }
        if(node.right){
            parent.set(node.right.val, node)
            findParent(node.right)
        }
    }
    findParent(root)
    const res = []
    const findTarget = (node, p, depth, k) => {
        if(!node) return
        if(depth === k){
            res.push(node.val)
            return
        }
        if(node.left !== p){
            findTarget(node.left, node, depth + 1, k)
        }
        if(node.right !== p){
            findTarget(node.right, node, depth + 1, k)
        }
        if(parent.get(node.val) !== p){
            findTarget(parent.get(node.val), node, depth + 1, k)
        }
    }
    findTarget(target, null, 0, k)
    return res
};
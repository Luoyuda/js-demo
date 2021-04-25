/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 20:31:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 20:06:13
 * @FilePath: /js-demo/leetcode/常规题目/111.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
111. 二叉树的最小深度
    给定一个二叉树，找出其最小深度。
    最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
    说明：叶子节点是指没有子节点的节点。
示例 1：
    输入：root = [3,9,20,null,null,15,7]
    输出：2
示例 2：
    输入：root = [2,null,3,null,4,null,5,null,6]
    输出：5
提示：
    树中节点数的范围在 [0, 105] 内
    -1000 <= Node.val <= 1000
 */
// 计算从起点 start 到终点 target 的最近距离
let BFS = (start, target) => {
    let q = []; // 核心数据结构队列
    let visited = new Set(); // 避免走回头路
    
    q.push(start); // 将起点加入队列
    visited.add(start);
    let step = 0; // 记录扩散的步数

    while (q.length) {
        let sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (let i = 0; i < sz; i++) {
            let cur = q.shift();
            /* 划重点：这里判断是否到达终点 */
            if (cur == target)
                return step;
            /* 将 cur 的相邻节点加入队列 */
            for (const x of cur) {
                if (!visited.has(visited)) {
                    q.push(x);
                    visited.add(x);
                }
            }
        }
        /* 划重点：更新步数在这里 */
        step++;
    }
}
var minDepth = function(root) {
    if(!root) return 0
    let q = []; // 核心数据结构队列
    q.push(root); // 将起点加入队列
    let depth = 1; // 记录扩散的步数
    while (q.length) {
        let sz = q.length;
        /* 将当前队列中的所有节点向四周扩散 */
        for (let i = 0; i < sz; i++) {
            let cur = q.shift();
            /* 划重点：这里判断是否到达终点 */
            if (!cur.left && !cur.right){
                return depth;
            }
            if(cur.left) q.push(cur.left)
            if(cur.right) q.push(cur.right)
        }
        /* 划重点：更新步数在这里 */
        depth++;
    }
    return depth
};

var minDepth = function(root){
    if(!root) return 0
    let left = minDepth(root.left)
    let right = minDepth(root.right)
    if(!left || !right) return left + right + 1
    return Math.min(left, right) + 1
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)))
console.log(minDepth(root))
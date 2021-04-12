/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 21:32:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-09 09:10:50
 * @FilePath: /js-demo/leetcode/常规题目/559.js
 */

/**
 * @param {Node} root
 * @return {number}
559. N 叉树的最大深度
    给定一个 N 叉树，找到其最大深度。
    最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
    N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。
示例 1：
    输入：root = [1,null,3,2,4,null,5,6]
    输出：3
示例 2：
    输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    输出：5
提示：
    树的深度不会超过 1000 。
    树的节点数目位于 [0, 104] 之间。
 */
var maxDepth = function(root) {
    if(!root) return 0
    let q = [root]
    let depth = 0
    while (q.length){
        let len = q.length
        for (let i = 0; i < len; i++) {
            const node = q.shift();
            if(node.children && node.children.length){
                q.push(...node.children)
            }
        }
        depth++
    }
    return depth
};

function Node(val,children) {
    this.val = val;
    this.children = children;
};

let root = new Node(1,
    [
        new Node(3, [
            new Node(5),
            new Node(6),
        ]),
        new Node(2),
        new Node(4),
    ]
)

console.log(maxDepth(root))
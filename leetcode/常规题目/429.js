/*
 * @Author: xiaohuolong
 * @Date: 2021-04-11 12:57:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 16:15:02
 * @FilePath: /js-demo/leetcode/常规题目/429.js
 */
/**
 * @param {Node} root
 * @return {number[][]}
429. N 叉树的层序遍历
    给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
    树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
示例 1：
    输入：root = [1,null,3,2,4,null,5,6]
    输出：[[1],[3,2,4],[5,6]]
示例 2：
    输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
提示：
    树的高度不会超过 1000
    树的节点总数在 [0, 10^4] 之间
 */
var levelOrder = function(root) {
    if(!root) return []
    let res = []
    let q = [root]
    while(q.length){
        let len = q.length
        let result = []
        for (let i = 0; i < len; i++) {
            let node = q.shift()
            if(!node) continue
            if(node.children){
                for (let j = 0; j < node.children.length; j++) {
                    q.push(node.children[j])
                }
            }
            result.push(node.val)
        }
        res.push(result)
    }
    return res
};
function Node(val,children) {
    this.val = val;
    this.children = children;
};
let root = new Node(1, [
    new Node(2, [
        new Node(4, [
            new Node(9)
        ]),
        new Node(5, [
            new Node(10)
        ]),
        new Node(6, [
            new Node(11)
        ])
    ]),
    new Node(3, [
        new Node(7, [
            new Node(12)
        ])
    ]),
    new Node(4, [
        new Node(8, [
            new Node(13)
        ])
    ]),
])

console.log(levelOrder(root))

/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 10:51:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 10:55:51
 * @FilePath: /js-demo/leetcode/常规题目/117.js
 */
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if(!root) return root
    let q = [root]
    while(q.length){
        let len = q.length
        for (let i = 0; i < len; i++) {
            let node = q.shift()
            if(i < len - 1){
                node.next = q[0] || null
            }
            if(node.left) q.push(node.left)
            if(node.right) q.push(node.right)
        }
    }
    return root
};

function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};
var root = new Node(1, 
    new Node(2, 
        new Node(4),
        new Node(5)
    ), 
    new Node(3, 
        null, 
        new Node(7)
    )
)
console.log(connect(root))
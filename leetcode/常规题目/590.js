/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 23:19:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 23:29:20
 * @FilePath: /js-demo/leetcode/常规题目/590.js
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    if(!root) return []
    let stack = [root]
    let res = []
    while(stack.length){
        let node = stack.pop()
        if(node){
            res.push(node.val)
        }
        if(node.children && node.children.length){
            for (const n of node.children) {
                stack.push(n)
            }
        }
    }
    return res.reverse()
};

function Node(val, children) {
    this.val = val;
    this.children = children;
};

let root = new Node(1,[
    new Node(3, [
        new Node(5),
        new Node(6)
    ]),
    new Node(2),
    new Node(4)
])
console.log(...root.children)
console.log(...root.children[0].children)
console.log(postorder(root))
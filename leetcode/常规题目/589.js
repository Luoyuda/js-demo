/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 20:46:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 22:49:04
 * @FilePath: /js-demo/leetcode/常规题目/589.js
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    let stack = [root]
    let res = []
    while (stack.length){
        let node = stack.pop()
        res.push(node.val)
        // console.log(node.val)
        if(node.children && node.children.length) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i])
            }
        }
    }
    return res
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
console.log(preorder(root))
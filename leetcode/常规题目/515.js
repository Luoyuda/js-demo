/*
 * @Author: xiaohuolong
 * @Date: 2021-04-11 13:07:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-11 13:12:40
 * @FilePath: /js-demo/leetcode/常规题目/515.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
    if(!root) return []
    let res = []
    let q = [root]
    while(q.length){
        let len = q.length
        let max = -Infinity
        for (let i = 0; i < len; i++) {
            let r = q.shift()
            max = Math.max(r.val, max)
            if(r.left) q.push(r.left)
            if(r.right) q.push(r.right)
        }
        res.push(max)
    }
    return res
};

let root = new TreeNode(1,
    new TreeNode(3,
        new TreeNode(5),
        new TreeNode(3)
    ),
    new TreeNode(2,
        new TreeNode(5),
        new TreeNode(10)
    ),
)
console.log(largestValues(root))
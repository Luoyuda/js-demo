/*
 * @Author: xiaohuolong
 * @Date: 2021-04-26 16:53:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 00:13:49
 * @FilePath: /js-demo/leetcode/常规题目/199.js
 */
/**
199. 二叉树的右视图
    给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
示例:
    输入: [1,2,3,null,5,null,4]
    输出: [1, 3, 4]
解释:
   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if(!root) return []
    let q = [root]
    let res = []
    while(q.length){
        let len = q.length
        for(let i = 0; i < len; i++){
            let node = q.shift()
            if(i == len - 1){
                res.push(node.val)
            }
            if(node.left) q.push(node.left)
            if(node.right) q.push(node.right)
        }
    }
    return res
}
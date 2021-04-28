/*
 * @Author: xiaohuolong
 * @Date: 2021-04-26 16:27:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 16:28:30
 * @FilePath: /js-demo/leetcode/常规题目/1161.js
 */
/**
1161. 最大层内元素和
    给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
    请你找出层内元素之和 最大 的那几层（可能只有一层）的层号，并返回其中 最小 的那个。
示例 1：
    输入：root = [1,7,0,7,-8,null,null]
    输出：2
解释：
    第 1 层各元素之和为 1，
    第 2 层各元素之和为 7 + 0 = 7，
    第 3 层各元素之和为 7 + -8 = -1，
    所以我们返回第 2 层的层号，它的层内元素之和最大。
示例 2：
    输入：root = [989,null,10250,98693,-89388,null,null,null,-32127]
    输出：2
提示：
    树中的节点数介于 1 和 10^4 之间
    -10^5 <= node.val <= 10^5
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function(root) {
    let q = [root]
    let depth = 0
    let max = -Infinity
    let maxDepth = 0
    while(q.length){
        let length = q.length
        let sum = 0
        for(let i = 0; i < length; i++){
            let node = q.shift()
            sum += node.val
            if(node.left) q.push(node.left)
            if(node.right) q.push(node.right)
        }
        depth+=1
        if(max < sum){
            max = sum
            maxDepth = depth
        }
    }
    return maxDepth
};
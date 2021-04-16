/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 21:23:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 21:29:22
 * @FilePath: /js-demo/leetcode/常规题目/501.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
501. 二叉搜索树中的众数
    给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
假定 BST 有如下定义：
    结点左子树中所含结点的值小于等于当前结点的值
    结点右子树中所含结点的值大于等于当前结点的值
    左子树和右子树都是二叉搜索树
例如：
给定 BST [1,null,2,2],
   1
    \
     2
    /
   2
返回[2].
提示：如果众数超过1个，不需考虑输出顺序
进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
 */
var findMode = function(root) {
    let count = 0
    let maxCount = 0
    let base = 0
    let ans = []
    let update = num => {
        if(num != base){
            count = 1
            base = num
        }else{
            count++
        }
        // console.log(count, base)
        if(count == maxCount){
            ans.push(base)
        }else if(count > maxCount){
            maxCount = count
            ans = [base]
        }
    }
    let dfs = root => {
        if(!root) return
        dfs(root.left)
        update(root.val)
        dfs(root.right)
    }
    dfs(root)
    return ans
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root1 = new TreeNode(1,
    null,
    new TreeNode(2,
        new TreeNode(2),
    ),
)
console.log(findMode(root1))

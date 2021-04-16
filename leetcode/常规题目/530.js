/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 12:09:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 12:59:43
 * @FilePath: /js-demo/leetcode/常规题目/530.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
    let min = Infinity;
    let prev = null
    let dfs = root => {
        if(!root) return
        dfs(root.left)
        if(prev != null){
            min = Math.min(Math.abs(prev - root.val), min)
            prev = root.val
        }
        prev = root.val
        dfs(root.right)
    }
    dfs(root)
    return min
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(5, 
    new TreeNode(3, 
        new TreeNode(2, new TreeNode(1)), 
        new TreeNode(4)
    ), 
    new TreeNode(6,
        null, 
        new TreeNode(8,
            new TreeNode(7), 
            new TreeNode(9)) 
    )
)

console.log(getMinimumDifference(root))
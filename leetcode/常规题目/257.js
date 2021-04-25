/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 08:45:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 21:55:54
 * @FilePath: /js-demo/leetcode/常规题目/257.js
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    let res = []
    let dfs = (root, result) => {
        if(!root) return
        result.push(root.val)
        if(root.left) dfs(root.left, result.slice())
        if(root.right) dfs(root.right, result.slice())
        else if(!root.left && !root.right) {
            console.log(result)
            res.push(result.join('->'))
        }
    }
    dfs(root, [])
    return res
};

var binaryTreePaths = function(root) {
    let res = []
    let dfs = (root, result) => {
        if(!root) return
        result.push(root.val)
        if(!root.left && !root.right){
            res.push(result.join('->'))
        }else{
            dfs(root.left, result.slice())
            dfs(root.right, result.slice())
        }
    }
    dfs(root, [])
    return res
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(3, 
    new TreeNode(9, 
        // new TreeNode(0), 
        // new TreeNode(1)
    ), 
    new TreeNode(20,
        new TreeNode(15), 
        new TreeNode(7)
    ) 
)
console.log(binaryTreePaths(root))
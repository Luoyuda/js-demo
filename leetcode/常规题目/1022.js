/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 07:41:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 07:54:34
 * @FilePath: /js-demo/leetcode/常规题目/1022.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number}
1022. 从根到叶的二进制数之和
    给出一棵二叉树，其上每个结点的值都是 0 或 1 。
    每一条从根到叶的路径都代表一个从最高有效位开始的二进制数。
    例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13 。
    对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字。
    返回这些数字之和。题目数据保证答案是一个 32 位 整数。
示例 1：
    输入：root = [1,0,1,0,1,0,1]
    输出：22
    解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
示例 2：
    输入：root = [0]
    输出：0
示例 3：
    输入：root = [1]
    输出：1
示例 4：
    输入：root = [1,1]
    输出：3
提示：
    树中的结点数介于 1 和 1000 之间。
    Node.val 为 0 或 1 。
 */
var sumRootToLeaf = function(root) {
    let ans = 0
    let dfs = (root, str) => {
        if(!root) return
        let s =  str + root.val
        if(root.left) dfs(root.left, s)
        if(root.right) dfs(root.right, s)
        else if(!root.left && !root.right){
            ans += parseInt(s, 2)
        }
    }
    dfs(root, '')
    return ans
};

let root = new TreeNode(1, 
    new TreeNode(0, 
        new TreeNode(0), 
        new TreeNode(1)
    ), 
    new TreeNode(1,
        new TreeNode(0), 
        new TreeNode(1)
    ) 
)
console.log(sumRootToLeaf(root))
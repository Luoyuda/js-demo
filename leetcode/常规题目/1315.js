/*
 * @Author: xiaohuolong
 * @Date: 2021-04-25 15:16:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 16:20:02
 * @FilePath: /js-demo/leetcode/常规题目/1315.js
 */
/**
1315. 祖父节点值为偶数的节点和
    给你一棵二叉树，请你返回满足以下条件的所有节点的值之和：
    该节点的祖父节点的值为偶数。（一个节点的祖父节点是指该节点的父节点的父节点。）
    如果不存在祖父节点值为偶数的节点，那么返回 0 。
示例：
    输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
    输出：18
提示：
    树中节点的数目在 1 到 10^4 之间。
    每个节点的值在 1 到 100 之间。
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumEvenGrandparent = function(root) {
    if(!root) return 0
    let ans = 0
    let dfs = (root, parentVal, grandparentVal) => {
        if(!root) return null
        if(grandparentVal % 2 == 0){
            ans += root.val
        }
        dfs(root.left, root.val, parentVal)
        dfs(root.right, root.val, parentVal)
    }
    dfs(root, 1, 1)
    return ans
};

var root = new TreeNode(
    6,
    new TreeNode(7, 
        new TreeNode(2, 
            new TreeNode(9), 
        ),
        new TreeNode(7,
            new TreeNode(1), 
            new TreeNode(4)), 
    ),
    new TreeNode(8, 
        new TreeNode(1), 
        new TreeNode(3, 
            new TreeNode(5), 
        )
    ),
)
console.log(sumEvenGrandparent(root))
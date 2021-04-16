/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 07:24:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 07:41:20
 * @FilePath: /js-demo/leetcode/常规题目/783.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
783. 二叉搜索树节点最小距离
    给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
    注意：本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同
示例 1：
    输入：root = [4,2,6,1,3]
    输出：1
示例 2：
    输入：root = [1,0,48,null,null,12,49]
    输出：1
提示：
    树中节点数目在范围 [2, 100] 内
    0 <= Node.val <= 105
 */
var minDiffInBST = function(root) {
    if(!root) return root
    let min = Infinity
    let prev = null
    let dfs = (root) => {
        if(!root)return null
        dfs(root.left, root)
        if(prev != null){
            // console.log(prev.val, root.val)
            min = Math.min(Math.abs(root.val - prev.val), min)
        }
        prev = root
        dfs(root.right, root)
    }
    dfs(root)
    return min
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root1 = new TreeNode(4,
    new TreeNode(2, 
        new TreeNode(1),
        new TreeNode(3),
    ),
    new TreeNode(6)
)
let root2 = new TreeNode(1,
    new TreeNode(3),
    new TreeNode(48, 
        new TreeNode(12),
        new TreeNode(53),
    )
)
let root3 = new TreeNode(90,
    new TreeNode(69, 
        new TreeNode(49, null, new TreeNode(52)),
        new TreeNode(89),
    )
)

console.log(minDiffInBST(root1))
console.log(minDiffInBST(root2))
console.log(minDiffInBST(root3))
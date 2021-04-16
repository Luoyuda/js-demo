/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 08:54:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 09:00:08
 * @FilePath: /js-demo/leetcode/常规题目/872.JS
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
872. 叶子相似的树
    请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。
    举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。
    如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。
    如果给定的两个头结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。
示例 1：
    输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
    输出：true
示例 2：
    输入：root1 = [1], root2 = [1]
    输出：true
示例 3：
    输入：root1 = [1], root2 = [2]
    输出：false
示例 4：
    输入：root1 = [1,2], root2 = [2,2]
    输出：true
示例 5：
    输入：root1 = [1,2,3], root2 = [1,3,2]
    输出：false
提示：
    给定的两棵树可能会有 1 到 200 个结点。
    给定的两棵树上的值介于 0 到 200 之间。
 */
var leafSimilar = function(root1, root2) {
    let list1 = []
    let list2 = []
    dfs(root1, list1)
    dfs(root2, list2)
    if(list1.length != list2.length) return false
    for (let i = 0; i < list1.length; i++) {
        if(list1[i] != list2[i]) return false
    }
    return true
};
var dfs = (root, list) => {
    if(!root) return
    if(!root.left && !root.right) return list.push(root.val)
    dfs(root.left, list)
    dfs(root.right, list)
}

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
let root2 = new TreeNode(3, 
    new TreeNode(9, 
    ), 
    new TreeNode(22,
        new TreeNode(11), 
        new TreeNode(7)
    ) 
)
console.log(leafSimilar(root, root2))
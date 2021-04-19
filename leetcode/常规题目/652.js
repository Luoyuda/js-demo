/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 17:43:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 17:50:50
 * @FilePath: /js-demo/leetcode/常规题目/652.js
 */
/**
652. 寻找重复的子树
    给定一棵二叉树，返回所有重复的子树。对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。
    两棵树重复是指它们具有相同的结构以及相同的结点值。
示例 1：
        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
下面是两个重复的子树：
      2
     /
    4
和
    4
因此，你需要以列表的形式返回上述重复子树的根结点。
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    let res = []
    let map = new Map()
    let dfs = (root) => {
        if(!root) return '#'
        let left = dfs(root.left)
        let right = dfs(root.right)
        let str = `${left},${right},${root.val}`
        let count = map.get(str)
        if(count == 1) res.push(root)
        map.set(str, (count || 0) + 1)
        return str
    }
    dfs(root)
    return res
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root = new TreeNode(1,
    new TreeNode(2, 
        new TreeNode(4)
    ),
    new TreeNode(3,
        new TreeNode(2,
            new TreeNode(4)
        ),
        new TreeNode(4)
    )
)

console.log(findDuplicateSubtrees(root))
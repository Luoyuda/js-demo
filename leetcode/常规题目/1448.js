/*
 * @Author: xiaohuolong
 * @Date: 2021-04-25 17:38:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 17:44:38
 * @FilePath: /js-demo/leetcode/常规题目/1448.js
 */
/**
1448. 统计二叉树中好节点的数目
    给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。
    「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。
示例 1：
    输入：root = [3,1,4,3,null,1,5]
    输出：4
解释：图中蓝色节点为好节点。
    根节点 (3) 永远是个好节点。
    节点 4 -> (3,4) 是路径中的最大值。
    节点 5 -> (3,4,5) 是路径中的最大值。
    节点 3 -> (3,1,3) 是路径中的最大值。
示例 2：
    输入：root = [3,3,null,4,2]
    输出：3
    解释：节点 2 -> (3, 3, 2) 不是好节点，因为 "3" 比它大。
示例 3：
    输入：root = [1]
    输出：1
    解释：根节点是好节点。
提示：
    二叉树中节点数目范围是 [1, 10^5] 。
    每个节点权值的范围是 [-10^4, 10^4] 。
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
var goodNodes = function(root) {
    let ans = 0
    let dfs = (root, max) => {
        if(!root) return 
        if(root.val >= max){
            ans++
            max = root.val
        }
        dfs(root.left, max)
        dfs(root.right, max)
    }
    dfs(root, -Infinity)
    return ans
};

var root = new TreeNode(
    3,
    new TreeNode(1, 
        new TreeNode(3, 
        ),
    ),
    new TreeNode(4, 
        new TreeNode(1), 
        new TreeNode(5, 
        )
    ),
)

console.log(goodNodes(root))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 20:45:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 21:08:59
 * @FilePath: /js-demo/leetcode/常规题目/671.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
671. 二叉树中第二小的节点
    给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。
    如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。
    更正式地说，root.val = min(root.left.val, root.right.val) 总成立。
    给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。
示例 1：
    输入：root = [2,2,5,null,null,5,7]
    输出：5
    解释：最小的值是 2 ，第二小的值是 5 。
示例 2：
    输入：root = [2,2,2]
    输出：-1
    解释：最小的值是 2, 但是不存在第二小的值。
提示：
    树中节点数目在范围 [1, 25] 内
    1 <= Node.val <= 231 - 1
    对于树中每个节点 root.val == min(root.left.val, root.right.val)
 */
var findSecondMinimumValue = function(root) {
    if(!root) return -1
    return help(root, root.val)
};
var help = function(root, min){
    if(!root) return -1
    if(root.val > min) return root.val
    let left = help(root.left, min)
    let right = help(root.right, min)
    if(left == -1) return right
    if(right == -1) return left
    return Math.min(left, right)
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var root1 = new TreeNode(3, 
    new TreeNode(4,
        new TreeNode(1), 
        new TreeNode(2), 
    ),
    new TreeNode(5, ), 
)
var root1 = new TreeNode(2, 
    new TreeNode(2,
        new TreeNode(2), 
        new TreeNode(5), 
    ),
    new TreeNode(5, ), 
)

var root1 = new TreeNode(2, 
    new TreeNode(2,
        new TreeNode(2), 
        new TreeNode(2), 
    ),
    new TreeNode(2, ), 
)

var root1 = new TreeNode(2, 
    new TreeNode(2,
        new TreeNode(2), 
        new TreeNode(2), 
    ),
    new TreeNode(1, ), 
)
console.log(findSecondMinimumValue(root1))

/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 19:04:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 19:08:41
 * @FilePath: /js-demo/leetcode/常规题目/1379.js
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
1379. 找出克隆二叉树中的相同节点
    给你两棵二叉树，原始树 original 和克隆树 cloned，以及一个位于原始树 original 中的目标节点 target。
    其中，克隆树 cloned 是原始树 original 的一个 副本 。
    请找出在树 cloned 中，与 target 相同 的节点，并返回对该节点的引用。
注意：
    你 不能 对两棵二叉树，以及 target 节点进行更改。
    只能 返回对克隆树 cloned 中已有的节点的引用。
    进阶：如果树中允许出现值相同的节点，你将如何解答？
示例 1:
    输入: tree = [7,4,3,null,null,6,19], target = 3
    输出: 3
    解释: 上图画出了树 original 和 cloned。target 节点在树 original 中，用绿色标记。答案是树 cloned 中的黄颜色的节点（其他示例类似）。
示例 2:
    输入: tree = [7], target =  7
    输出: 7
示例 3:
    输入: tree = [8,null,6,null,5,null,4,null,3,null,2,null,1], target = 4
    输出: 4
示例 4:
    输入: tree = [1,2,3,4,5,6,7,8,9,10], target = 5
    输出: 5
示例 5:
    输入: tree = [1,2,null,3], target = 2
    输出: 2
提示：
    树中节点的数量范围为 [1, 10^4] 。
    同一棵树中，没有值相同的节点。
    target 节点是树 original 中的一个节点，并且不会是 null 。
 */
var getTargetCopy = function(original, cloned, target) {
    if(!original) return null
    if(original == target) return cloned
    return getTargetCopy(original.left, cloned.left, target) || getTargetCopy(original.right, cloned.right, target)
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right.left = new TreeNode(5)
let root2 = new TreeNode(1)
root2.left = new TreeNode(2)
root2.right = new TreeNode(3)
root2.left.right = new TreeNode(4)
root2.right.left = new TreeNode(5)

console.log(getTargetCopy(root, root2, root.left.right))
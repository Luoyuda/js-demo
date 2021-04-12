/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 08:49:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-08 08:58:48
 * @FilePath: /js-demo/leetcode/常规题目/222.js
 */
/**
 * @param {TreeNode} root
 * @return {number}
222. 完全二叉树的节点个数
    给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
    完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，
    其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
    若最底层为第 h 层，则该层包含 1~ 2h 个节点。
示例 1：
    输入：root = [1,2,3,4,5,6]
    输出：6
示例 2：
    输入：root = []
    输出：0
示例 3：
    输入：root = [1]
    输出：1
提示：
    树中节点的数目范围是[0, 5 * 104]
    0 <= Node.val <= 5 * 104
    题目数据保证输入的树是 完全二叉树
进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
 */
var countNodes = function(root) {
    if(!root) return 0;
    let left = countNodes(root.left)
    let right = countNodes(root.right)
    return left + right + 1
};
const exists = (root, level, k) => {
    let bits = 1 << (level - 1);
    let node = root;
    while (node !== null && bits > 0) {
        if (!(bits & k)) {
            node = node.left;
        } else {
            node = node.right;
        }
        bits >>= 1;
    }
    return node !== null;
}

var countNodes = function(root) {
    if (root === null) {
        return 0;
    }
    let level = 0;
    let node = root;
    while (node.left !== null) {
        level++;
        node = node.left;
    }
    let low = 1 << level, high = (1 << (level + 1)) - 1;
    console.log(low, high)
    while (low < high) {
        const mid = Math.floor((high - low + 1) / 2) + low;
        if (exists(root, level, mid)) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
let r5 = new TreeNode(5)
let r3 = new TreeNode(3)
let r6 = new TreeNode(6)
let r2 = new TreeNode(2)
let r4 = new TreeNode(4)
let r1 = new TreeNode(1)

r1.left = r2
r1.right = r3
r2.left = r4
r2.right = r5
r3.left = r6

console.log(countNodes(r1))
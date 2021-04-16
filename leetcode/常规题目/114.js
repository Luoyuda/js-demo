/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 22:19:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 22:37:25
 * @FilePath: /js-demo/leetcode/常规题目/114.js
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
114. 二叉树展开为链表
    给你二叉树的根结点 root ，请你将它展开为一个单链表：
    展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
    展开后的单链表应该与二叉树 先序遍历 顺序相同。
示例 1：
    输入：root = [1,2,5,3,4,null,6]
    输出：[1,null,2,null,3,null,4,null,5,null,6]
示例 2：
    输入：root = []
    输出：[]
示例 3：
    输入：root = [0]
    输出：[0]
提示：
    树中结点数在范围 [0, 2000] 内
    -100 <= Node.val <= 100
进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
 */
var flatten = function(root) {
    let curr = root
    while (curr){
        while (curr.left){
            const next = curr.left
            let pre = next
            while (pre.right){
                pre = pre.right
            }
            pre.right = curr.right
            curr.left = null
            curr.right = next
        }
        curr = curr.right
    }
    return root
};
var flatten = function(root) {
    let list = []
    preorderTraversal(root, list)
    let len = list.length
    for (let i = 1; i < len; i++) {
        let curr = list[i - 1]
        let next = list[i]
        curr.left = null
        curr.right = next
    }
    // return root
};

var preorderTraversal = function(root, list){
    if(!root) return
    list.push(root)
    preorderTraversal(root.left, list)
    preorderTraversal(root.right, list)
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
let root = new TreeNode(1, 
    new TreeNode(2, 
        new TreeNode(3), 
        new TreeNode(4)
    ), 
    new TreeNode(5,
        null, 
        new TreeNode(6) 
    )
)

console.log(flatten(root))
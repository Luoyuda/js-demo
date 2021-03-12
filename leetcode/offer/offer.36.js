/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 17:43:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 18:12:00
 * @FilePath: /js-demo/leetcode/offer.36.js
 */
/**
 * @param {Node} root
 * @return {Node}
    剑指 Offer 36. 二叉搜索树与双向链表
        输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。
        要求不能创建任何新的节点，只能调整树中节点指针的指向。
 */
var treeToDoublyList = function(root) {
    if(!root) return null
    let pre, head
    var dfs = (node) => {
        if(!node) return 
        dfs(node.left)
        if(pre) pre.right = node
        else head = node
        node.left = pre
        pre = node
        // console.log(node.val)
        // console.log(pre.val)
        dfs(node.right)
    }
    dfs(root)
    head.left = pre
    pre.right = head
    // console.log(head)
    return head
};
function Node(val,left,right) {
    this.val = val;
    this.left = left;
    this.right = right;
};
let node4 = new Node(4)
let node2 = new Node(2)
let node1 = new Node(1)
let node3 = new Node(3)
let node5 = new Node(5)
let root = node4
node4.left = node2
node4.right = node5
node2.left = node1
node2.right = node3
let root1 = treeToDoublyList(root)
console.log(root1)
// class Solution {
//     Node pre, head;
//     public Node treeToDoublyList(Node root) {
//         if(root == null) return null;
//         dfs(root);
//         head.left = pre;
//         pre.right = head;
//         return head;
//     }
//     void dfs(Node cur) {
//         if(cur == null) return;
//         dfs(cur.left);
//         if(pre != null) pre.right = cur;
//         else head = cur;
//         cur.left = pre;
//         pre = cur;
//         dfs(cur.right);
//     }
// }
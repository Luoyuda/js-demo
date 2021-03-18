/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 16:09:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 16:18:13
 * @FilePath: /js-demo/leetcode/常规题目/109.js
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {ListNode} head
 * @return {TreeNode}
109. 有序链表转换二叉搜索树
    给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。
    本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
示例:
    给定的有序链表： [-10, -3, 0, 5, 9],
    一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：
      0
     / \
   -3   9
   /   /
 -10  5
 */
var middleNode = function(left, right) {
    let fast = left
    let slow = left
    while (fast != right && fast.next != right) {
        fast = fast.next.next
        slow = slow.next
    }
    return slow
};
var buildTree = (left, right) => {
    if(left == right) return null
    let mid = middleNode(left, right)
    return new TreeNode(mid.val, buildTree(left, mid), buildTree(mid.next, right))
}
var sortedListToBST = function(head) {
    return buildTree(head, null)
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push(curr.val)
        curr = curr.next
    }
    console.log(res.join('>'))
}
let root1 = new ListNode(-10, new ListNode(-3, new ListNode(0, new ListNode(5, new ListNode(9)))))
printList(root1)
let root = sortedListToBST(root1)
console.log(root)
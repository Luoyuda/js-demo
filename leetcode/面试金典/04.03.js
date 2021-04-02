/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 20:52:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 21:10:28
 * @FilePath: /js-demo/leetcode/面试金典/04.03.js
 */
/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
面试题 04.03. 特定深度节点链表
    给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表
    （比如，若一棵树的深度为 D，则会创建出 D 个链表）。返回一个包含所有深度的链表的数组。
示例：
输入：[1,2,3,4,5,null,7,8]
        1
       /  \ 
      2    3
     / \    \ 
    4   5    7
   /
  8
输出：[[1],[2,3],[4,5,7],[8]]
 */
var listOfDepth = function(tree) {
    if(!tree) return []
    let queue = [tree]
    let res = []
    while(queue.length){
        let len = queue.length
        let nowLen = len
        let head = null
        while(len){
            let node = queue.shift()
            if(len == nowLen){
                head = new ListNode(node.val)
                res.push(head)
            }else{
                head.next = new ListNode(node.val)
                head = head.next
            }
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
    }
    return res
};
let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.right = new TreeNode(7)
root.left.left.left = new TreeNode(8)
let list = listOfDepth(root)
var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push(curr.val)
        curr = curr.next
    }
    console.log(res.join('>'))
}
list.map(item => printList(item))
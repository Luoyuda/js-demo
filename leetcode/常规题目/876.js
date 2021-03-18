/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 08:38:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 08:39:22
 * @FilePath: /js-demo/leetcode/常规题目/876.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let fast = head
    let slow = head
    while (fast && fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    return slow
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    while (curr){
        console.log(curr.val)
        curr = curr.next
    }
}
let root1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7, new ListNode(8))))))))
// printList(root1)
let root = middleNode(root1)
printList(root)

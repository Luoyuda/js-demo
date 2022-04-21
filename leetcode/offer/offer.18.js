/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 16:48:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 16:49:48
 * @FilePath: /js-demo/leetcode/offer.18.js
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
 * @param {number} val
 * @return {ListNode}
    剑指 Offer 18. 删除链表的节点
        给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
        返回删除后的链表的头节点。
        注意：此题对比原题有改动
    示例 1:
        输入: head = [4,5,1,9], val = 5
        输出: [4,1,9]
        解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
    示例 2:
        输入: head = [4,5,1,9], val = 1
        输出: [4,5,9]
        解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
    说明：
        题目保证链表中节点的值互不相同
        若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点
 */
var deleteNode = function (head, val) {
  const dummy = new ListNode(-1)
  dummy.next = head
  let cur = dummy.next
  let prev = dummy
  while (cur) {
    if (cur.val === val) {
      prev.next = cur.next
    }
    prev = cur
    cur = cur.next
  }
  return dummy.next
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)
l1.next.next.next.next.next = new ListNode(6)
l1.next.next.next.next.next.next = new ListNode(6)
let L1 = l1
while (L1) {
  console.log(L1.val)
  L1 = L1.next
}
let l3 = deleteNode(l1, 6)
while (l3) {
  console.log(l3.val)
  l3 = l3.next
}

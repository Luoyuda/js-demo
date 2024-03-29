/*
 * @Author: xiaohuolong
 * @Date: 2021-02-26 23:59:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-27 00:03:01
 * @FilePath: /js-demo/leetcode/offer.22.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
    剑指 Offer 22. 链表中倒数第k个节点
        输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
        例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
    示例：
        给定一个链表: 1->2->3->4->5, 和 k = 2.
        返回链表 4->5.
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  if (k <= 0 || !head) return null
  let fast = head
  let slow = head
  while (k--) {
    fast = fast.next
  }
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
let l1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
)
let p = l1
while (p) {
  console.log(p.val)
  p = p.next
}
console.log(getKthFromEnd(l1, 2))

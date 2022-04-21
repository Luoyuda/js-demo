/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 15:23:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 15:50:19
 * @FilePath: /js-demo/leetcode/92.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
    92. 反转链表 II
        反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
    说明:
        1 ≤ m ≤ n ≤ 链表长度。
    示例:
        输入: 1->2->3->4->5->NULL, m = 2, n = 4
        输出: 1->4->3->2->5->NULL
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
// 非递归
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const dummy = new ListNode()
  dummy.next = head
  let p = dummy
  let k = left - 1
  while (k--) p = p.next
  let front = p
  let pre = p.next
  let frontNode = pre
  let cur = pre.next
  k = right - left
  while (k--) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  front.next = pre
  frontNode.next = cur
  return dummy.next
}
let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)
let L1 = l1
while (L1) {
  console.log(L1.val)
  L1 = L1.next
}
let l3 = reverseBetween(l1, 2, 4)
while (l3) {
  console.log(l3.val)
  l3 = l3.next
}

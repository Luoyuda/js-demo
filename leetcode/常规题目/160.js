/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 07:29:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 07:41:55
 * @FilePath: /js-demo/leetcode/常规题目/160.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
    160. 相交链表
        编写一个程序，找到两个单链表相交的起始节点。
    示例 1：
        输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
        输出：Reference of the node with value = 8
        输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
    示例 2：
        输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
        输出：Reference of the node with value = 2
        输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
    示例 3：
        输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
        输出：null
        输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
        解释：这两个链表不相交，因此返回 null。
    注意：
        如果两个链表没有交点，返回 null.
        在返回结果后，两个链表仍须保持原有的结构。
        可假定整个链表结构中没有循环。
        程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 */
var getIntersectionNode = function (headA, headB) {
  let p1 = headA
  let p2 = headB
  while (p1 != p2) {
    p1 = p1 == null ? headB : p1.next
    p2 = p2 == null ? headA : p2.next
  }
  return p1
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
var printList = (head) => {
  let curr = head
  while (curr) {
    console.log(curr.val)
    curr = curr.next
  }
}
let root4 = new ListNode(4)
let root1 = new ListNode(1)
let root8 = new ListNode(8)
let root4_1 = new ListNode(4)
let root5 = new ListNode(5)

let root5_0 = new ListNode(5)
let root3 = new ListNode(3)
let root0 = new ListNode(0)
root4.next = root1
root1.next = root8
root8.next = root4_1
root4_1.next = root5

root5_0.next = root0
root0.next = root3
root3.next = root8
console.log(getIntersectionNode(root4, root5_0))

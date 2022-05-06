/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 13:13:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 13:24:45
 * @FilePath: /js-demo/leetcode/常规题目/143.js
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
 * @return {void} Do not return anything, modify head in-place instead.
    143. 重排链表
        给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
        将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
        你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
    示例 1:
        给定链表 1->2->3->4, 重新排列为 1->4->2->3.
    示例 2:
        给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
 */
var findHalf = function (head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}
var reverse = function (head) {
  let prev = null
  let curr = head
  while (curr) {
    let temp = curr.next
    curr.next = prev
    prev = curr
    curr = temp
  }
  return prev
}
var reorderList = function (head) {
  if (!head) return head
  let half = findHalf(head)
  let reverseHead = reverse(half.next)
  half.next = null
  let p1 = head
  let p2 = reverseHead
  // printList(p1)
  // printList(p2)
  while (p2) {
    let temp1 = p1.next
    let temp2 = p2.next
    p1.next = p2
    p2.next = temp1
    p2 = temp2
    p1 = temp1
  }
  // printList(head)
  return head
}
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let fast = head
  let slow = head
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let midHead = slow.next
  slow.next = null
  const s = []
  while (midHead) {
    s.push(midHead)
    const next = midHead.next
    midHead.next = null
    midHead = next
  }
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = s.pop() || null
    if (!cur.next) break
    cur.next.next = next
    cur = next
  }
  return head
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let fast = head
  let slow = head
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let p1 = head
  let p2 = reserve(slow.next)
  slow.next = null
  while (p2) {
    let n1 = p1.next
    let n2 = p2.next
    p1.next = p2
    p2.next = n1
    p1 = n1
    p2 = n2
  }
  return head
  function reserve(head) {
    let prev = null
    while (head) {
      const next = head.next
      head.next = prev
      prev = head
      head = next
    }
    return prev
  }
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
var printList = (head) => {
  let curr = head
  let res = []
  while (curr) {
    res.push(curr.val)
    curr = curr.next
  }
  console.log(res.join('>'))
}
let root1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
)
printList(root1)
let root = reorderList(root1)
printList(root)

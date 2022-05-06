/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 20:45:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 21:55:33
 * @FilePath: /js-demo/leetcode/常规题目/61.js
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
    61. 旋转链表
        给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
    示例 1:
        输入: 1->2->3->4->5->NULL, k = 2
        输出: 4->5->1->2->3->NULL
    解释:
        向右旋转 1 步: 5->1->2->3->4->NULL
        向右旋转 2 步: 4->5->1->2->3->NULL
    示例 2:
        输入: 0->1->2->NULL, k = 4
        输出: 2->0->1->NULL
    解释:
        向右旋转 1 步: 2->0->1->NULL
        向右旋转 2 步: 1->2->0->NULL
        向右旋转 3 步: 0->1->2->NULL
        向右旋转 4 步: 2->0->1->NULL
 */
var rotateRight = function (head, k) {
  if (!head) return null
  if (!head.next) return head
  let oldTail = head
  // 1. 遍历，找到链表尾部
  let n = 1
  while (oldTail.next) {
    oldTail = oldTail.next
    n++
  }
  if (k % n == 0) return head
  let newTail = head
  for (let i = 0; i < n - (k % n) - 1; i++) {
    newTail = newTail.next
  }
  let newHead = newTail.next
  oldTail.next = head
  newTail.next = null

  return newHead
}
var rotateRight = function (head, k) {
  if (!head) return null
  if (!head.next) return head
  let oldTail = head
  // 1. 遍历，找到链表尾部
  let n = 1
  while (oldTail.next) {
    oldTail = oldTail.next
    n++
  }
  if (k % n == 0) return head
  let newTail = head
  for (let i = 0; i < n - (k % n) - 1; i++) {
    newTail = newTail.next
  }
  let newHead = newTail.next
  oldTail.next = head
  newTail.next = null
  return newHead
}

var rotateRight = function (head, k) {
  if (!head) return head
  let n = 0
  let p = head
  while (p) {
    p = p.next
    n++
  }
  k %= n
  if (!k) return head
  let fast = head
  let slow = head
  while (k--) fast = fast.next
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  fast.next = head
  head = slow.next
  slow.next = null
  return head
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) return head
  let n = 0
  let p = head
  while (p) {
    p = p.next
    n++
  }
  k %= n
  if (!k) return head
  let fast = head
  let slow = head
  while (k--) fast = fast.next
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  fast.next = head
  head = slow.next
  slow.next = null
  return head
}
let root = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
)
let root2 = new ListNode(0, new ListNode(1, new ListNode(2)))
let root3 = new ListNode(1, new ListNode(2))
let rotateRoot = rotateRight(root, 2)
let rotateRoot2 = rotateRight(root2, 4)
let rotateRoot3 = rotateRight(root3, 1)

while (rotateRoot) {
  console.log(rotateRoot.val)
  rotateRoot = rotateRoot.next
}
while (rotateRoot2) {
  console.log(rotateRoot2.val)
  rotateRoot2 = rotateRoot2.next
}
while (rotateRoot3) {
  console.log(rotateRoot3.val)
  rotateRoot3 = rotateRoot3.next
}

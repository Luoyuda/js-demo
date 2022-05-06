/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 08:41:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 21:15:55
 * @FilePath: /js-demo/leetcode/常规题目/83.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
  83. 删除排序链表中的重复元素
    给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
  示例 1:
    输入: 1->1->2
    输出: 1->2
  示例 2:
    输入: 1->1->2->3->3
    输出: 1->2->3
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return null
  let prev = null
  let curr = head
  while (curr) {
    if (prev && prev.val == curr.val) {
      prev.next = curr.next
    } else {
      prev = curr
    }
    curr = curr.next
  }
  return head
}

var deleteDuplicates = function (head) {
  let cur = head
  while (cur) {
    while (cur.next && cur.next.val == cur.val) cur.next = cur.next.next
    cur = cur.next
  }
  return head
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
let root1 = new ListNode(
  1,
  new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(
        3,
        new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(4))))
      )
    )
  )
)
// printList(root1)
let root = deleteDuplicates(root1)
printList(root)

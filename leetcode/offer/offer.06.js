/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 18:13:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 18:25:26
 * @FilePath: /js-demo/leetcode/offer.06.js
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
 * @return {number[]}
剑指 Offer 06. 从尾到头打印链表
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
示例 1：
输入：head = [1,3,2]
输出：[2,3,1]
 */
function ListNode(val) {
  this.val = val
  this.next = null
}
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  const stack = []
  while (head) {
    stack.push(head.val)
    head = head.next
  }
  return stack.reverse()
}

/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  if (!head) return []
  const arr = reversePrint(head.next)
  arr.push(head.val)
  return arr
}
var root = new ListNode(1)
root.next = new ListNode(2)
root.next.next = new ListNode(3)
console.log(reversePrint(root))

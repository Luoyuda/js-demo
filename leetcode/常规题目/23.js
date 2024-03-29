/*
 * @Author: xiaohuolong
 * @Date: 2020-07-10 23:37:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-24 17:01:07
 * @FilePath: /js-demo/leetcode/常规题目/23.js
 */

const { Heap } = require('../../data-structures/Heap/Heap.js')

class MinHeap extends Heap {
  constructor(list, max) {
    super(list, max, 'min')
  }
  min(a = {}, b = {}) {
    return a.val < b.val
  }
}
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next = null) {
  this.val = val
  this.next = next
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const heap = new MinHeap([])
  for (let index = 0; index < lists.length; index++) {
    let curr = lists[index]
    while (curr != null) {
      heap.heapPush(curr)
      curr = curr.next
    }
  }
  let head = new ListNode('head')
  let curr = head
  // console.log(heap.heapList)
  while (heap.heapList.length) {
    curr.next = heap.heapPop()
    curr = curr.next
  }
  curr.next = null
  return head.next
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists.length) return null
  return toSortList(lists)
}

var toSortList = function (list) {
  if (list.length <= 1) return list[0]
  const mid = list.length >> 1
  return marge(mergeKLists(list.slice(0, mid)), mergeKLists(list.slice(mid)))
}

var marge = function (l1, l2) {
  if (!l1 && !l2) return null
  if (!l1 || !l2) return l1 || l2
  let curr = (head = new ListNode(null))
  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 || l2
  return head.next
}

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists.length) return null
  return mergeArr(lists)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeArr = function (lists) {
  if (lists.length == 1) return lists[0]
  let m = lists.length >> 1
  let left = mergeArr(lists.slice(0, m))
  let right = mergeArr(lists.slice(m))
  return merge(left, right)
}

var merge = function (l1, l2) {
  let head = new ListNode(-1)
  let curr = head
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
      curr = curr.next
    } else {
      curr.next = l2
      l2 = l2.next
      curr = curr.next
    }
  }
  while (l1) {
    curr.next = l1
    l1 = l1.next
    curr = curr.next
  }
  while (l2) {
    curr.next = l2
    l2 = l2.next
    curr = curr.next
  }
  return head.next
}

let curr = mergeKLists([
  new ListNode(1, new ListNode(4, new ListNode(5))),
  new ListNode(1, new ListNode(3, new ListNode(4))),
  new ListNode(2, new ListNode(6)),
])
while (curr) {
  console.log(curr.val)
  curr = curr.next
}

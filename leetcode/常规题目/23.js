/*
 * @Author: xiaohuolong
 * @Date: 2020-07-10 23:37:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-10 23:55:33
 * @FilePath: /js-demo/leetcode/23.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        return a.val < b.val
    }
}
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next=null) {
    this.val = val;
    this.next = next;
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    const heap = new MinHeap([])
    for (let index = 0; index < lists.length; index++) {
        let curr = lists[index];
        while(curr != null){
            heap.heapPush(curr)
            curr = curr.next
        }
    }
    let head = new ListNode('head')
    let curr = head
    // console.log(heap.heapList)
    while(heap.heapList.length){
        curr.next = heap.heapPop()
        curr = curr.next
    }
    curr.next = null
    return head.next
};
let curr = mergeKLists([
    new ListNode(1,new ListNode(4, new ListNode(5))),
    new ListNode(1,new ListNode(3, new ListNode(4))),
    new ListNode(2,new ListNode(6))
])
while(curr){
    console.log(curr.val)
    curr = curr.next
}
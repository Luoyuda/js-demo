/*
 * @Author: xiaohuolong
 * @Date: 2020-07-10 23:37:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-06 14:45:58
 * @FilePath: /js-demo/leetcode/常规题目/23.js
 */ 

const { Heap } = require('../../data-structures/Heap/Heap.js')

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
var mergeKLists = function(lists) {
    if(!lists.length) return null
    return mergeArr(lists)
};
var mergeArr = function(list) {
    if(list.length <= 1) return list[0]
    let index = list.length >> 1
    const left = mergeKLists(list.slice(0, index))
    const right = mergeKLists(list.slice(index))
    return merge(left, right)
}
var merge = function(l1, l2){
    if(!l1 && !l2) return null
    if(!l1) return l2
    if(!l2) return l1
    let curr = null
    let head = null
    while(l1 && l2){
        if(l1.val < l2.val){
            if(!head){
                curr = l1
                head = l1
            }else{
                curr.next = l1
                curr = curr.next
            }
            l1 = l1.next
        }else{
            if(!head){
                curr = l2
                head = l2
            }else{
                curr.next = l2
                curr = curr.next
            }
            l2 = l2.next
        }
    }
    curr.next = l1 ? l1 : l2
    return head
}
let curr = mergeKLists([
    new ListNode(1,new ListNode(4, new ListNode(5))),
    new ListNode(1,new ListNode(3, new ListNode(4))),
    new ListNode(2,new ListNode(6))
])
while(curr){
    console.log(curr.val)
    curr = curr.next
}
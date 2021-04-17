/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 23:35:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 09:01:15
 * @FilePath: /js-demo/leetcode/常规题目/21.js
 */ 
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(!l1) return l2
    if(!l2) return l1
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    }else{
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
};

var mergeTwoLists2 = function(l1, l2){
    const head = new ListNode(-1)
    let prev = head
    while(l1 != null && l2 != null){
        if(l1.val <= l2.val){
            prev.next = l1
            l1 = l1.next
        }else{
            prev.next = l2
            l2 = l2.next
        }
        prev = prev.next
    }
    prev.next = !l1 ? l2 : l1
    return head.next
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(null)
    let curr = head
    while(l1 && l2){
        if(l1.val < l2.val){
            curr.next = l1
            l1 = l1.next
        }else{
            curr.next = l2
            l2 = l2.next
        }
        curr = curr.next
    }
    curr.next = !l1 ? l2 : l1
    return head.next
};

let merge = mergeTwoLists2(
    new ListNode(1, new ListNode(2, new ListNode(3, null))),
    new ListNode(1, new ListNode(2, new ListNode(4, null)))
)

while(merge){
    console.log(merge.val)
    merge = merge.next
}
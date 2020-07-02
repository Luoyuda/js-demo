/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:41:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-29 11:41:41
 * @FilePath: /js-demo/leetcode/2.js
 */ 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let curr_l1 = l1
    let curr_l2 = l2
    let head = new ListNode('head')
    let curr = head
    let temp = 0
    while (curr_l1 || curr_l2){
        let val1 = curr_l1 ? curr_l1.val : 0
        let val2 = curr_l2 ? curr_l2.val : 0
        let sum = val1 + val2 + temp
        temp = parseInt(sum / 10)
        let node = new ListNode(sum % 10)
        curr.next = node
        curr = node
        curr_l1 = curr_l1 && curr_l1.next
        curr_l2 = curr_l2 && curr_l2.next
    }
    if(temp){
        let node = new ListNode(temp)
        curr.next = node
    }
    return head.next
};
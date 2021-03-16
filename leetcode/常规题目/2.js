/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:41:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 14:35:26
 * @FilePath: /js-demo/leetcode/2.js
 */ 
/**
    2. 两数相加
        给你两个 非空 的链表，表示两个非负的整数。
        它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
        请你将两个数相加，并以相同形式返回一个表示和的链表。
        你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
    示例 1：
        输入：l1 = [2,4,3], l2 = [5,6,4]
        输出：[7,0,8]
        解释：342 + 465 = 807.
    示例 2：
        输入：l1 = [0], l2 = [0]
        输出：[0]
    示例 3：
        输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
        输出：[8,9,9,9,0,0,0,1]
    提示：
        每个链表中的节点数在范围 [1, 100] 内
        0 <= Node.val <= 9
        题目数据保证列表表示的数字不含前导零
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
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

var addTwoNumbers = function(l1, l2){
    let L1 = l1
    let L2 = l2
    let head = new ListNode(null)
    let cut = 0
    let curr = head
    while(L1 || L2){
        let sum = (L1 && L1.val || 0) + (L2 && L2.val || 0) + cut
        cut = sum >= 10 ? 1 : 0
        curr.next = new ListNode(sum % 10)
        curr = curr.next
        L1 = L1 && L1.next
        L2 = L2 && L2.next
    }
    if(cut) curr.next = new ListNode(cut)
    return head.next
}

let l1 = new ListNode(8)
l1.next = new ListNode(4)
l1.next.next = new ListNode(5)
let l2 = new ListNode(4)
l2.next = new ListNode(6)
l2.next.next = new ListNode(5)
let l3 = addTwoNumbers(l1, l2)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
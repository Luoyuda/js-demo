/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 14:34:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 14:47:22
 * @FilePath: /js-demo/leetcode/offer.25.js
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
    剑指 Offer 25. 合并两个排序的链表
        输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
    示例1：
        输入：1->2->4, 1->3->4
        输出：1->1->2->3->4->4
    限制：
        0 <= 链表长度 <= 1000
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode()
    let cur = head
    let cur1 = l1
    let cur2 = l2
    while(cur1 && cur2){
        if(cur1.val < cur2.val){
            cur.next = cur1
            cur1 = cur1.next
        }else{
            cur.next = cur2
            cur2 = cur2.next
        }
        cur = cur.next
    }
    if(cur1) cur.next = cur1
    if(cur2) cur.next = cur2
    return head.next
};
let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
let l2 = new ListNode(1)
l2.next = new ListNode(3)
l2.next.next = new ListNode(4)

let l3 = mergeTwoLists(l1, l2)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
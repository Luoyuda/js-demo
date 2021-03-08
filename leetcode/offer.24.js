/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 14:21:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 14:30:34
 * @FilePath: /js-demo/leetcode/offer.24.js
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
    剑指 Offer 24. 反转链表
        定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
    示例:
        输入: 1->2->3->4->5->NULL
        输出: 5->4->3->2->1->NULL
    限制：
        0 <= 节点个数 <= 5000
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var reverseList = function(head) {
    let pre = null
    let cur = head
    while(cur){
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
};

let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)

let l3 = reverseList(l1)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
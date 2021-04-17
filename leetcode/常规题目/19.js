/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 17:00:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 08:48:20
 * @FilePath: /js-demo/leetcode/常规题目/19.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
    19. 删除链表的倒数第 N 个结点
        给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
        进阶：你能尝试使用一趟扫描实现吗？
    示例 1：
        输入：head = [1,2,3,4,5], n = 2
        输出：[1,2,3,5]
    示例 2：
        输入：head = [1], n = 1
        输出：[]
    示例 3：
        输入：head = [1,2], n = 1
        输出：[1]
    提示：
        链表中结点的数目为 sz
        1 <= sz <= 30
        0 <= Node.val <= 100
        1 <= n <= sz
 */
var removeNthFromEnd = function(head, n) {
    if(!head) return head
    let dummyHead = new ListNode(null, head)
    let fast = dummyHead
    let slow = dummyHead
    while(n--) fast = fast.next
    
    while(fast.next){
        fast = fast.next
        slow = slow.next
    }
    
    slow.next = slow.next.next
    return dummyHead.next
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)
l1.next.next.next.next.next = new ListNode(6)
let L1 = l1
while(L1){
    console.log(L1.val)
    L1 = L1.next
}
let l3 = removeNthFromEnd(l1, 3)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}

console.log(removeNthFromEnd(new ListNode(1), 1))
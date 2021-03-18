/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 07:47:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 08:20:45
 * @FilePath: /js-demo/leetcode/常规题目/328.JS
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
 * @return {ListNode}
328. 奇偶链表
    给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。
    请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
    请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
示例 1:
    输入: 1->2->3->4->5->NULL
    输出: 1->3->5->2->4->NULL
示例 2:
    输入: 2->1->3->5->6->4->7->NULL 
    输出: 2->3->6->7->1->5->4->NULL
说明:
    应当保持奇数节点和偶数节点的相对顺序。
    链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。
 */
var oddEvenList = function(head) {
    if(!head) return head
    let odd = head
    let even = head.next
    let evenHead = even
    while(even && even.next){
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    }
    odd.next = evenHead
    return head
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    while (curr){
        console.log(curr.val)
        curr = curr.next
    }
}
let root1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7, new ListNode(8))))))))
printList(root1)
let root = oddEvenList(root1)
printList(root)

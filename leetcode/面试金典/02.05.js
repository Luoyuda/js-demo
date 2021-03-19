/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 07:45:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 07:53:06
 * @FilePath: /js-demo/leetcode/面试金典/02.05.js
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
面试题 02.05. 链表求和
    给定两个用链表表示的整数，每个节点包含一个数位。
    这些数位是反向存放的，也就是个位排在链表首部。
    编写函数对这两个整数求和，并用链表形式返回结果。
示例：
    输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
    输出：2 -> 1 -> 9，即912
示例：
    输入：(6 -> 1 -> 7) + (2 -> 9 -> 5)，即617 + 295
    输出：9 -> 1 -> 2，即912
 */
var addTwoNumbers = function(l1, l2) {
    let head1 = l1
    let head2 = l2
    let head = new ListNode()
    let curr = head
    let carry = 0
    while (head1 || head2) {
        let a = head1 ? head1.val : 0
        let b = head2 ? head2.val : 0
        let sum = a + b + carry
        carry = 0
        if(sum >= 10) carry = 1
        sum %= 10
        curr.next = new ListNode(sum)
        curr = curr.next
        head1 = head1 ? head1.next : null
        head2 = head2 ? head2.next : null
    }
    if(carry) curr.next = new ListNode(carry)
    return head.next
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push(curr.val)
        curr = curr.next
    }
    console.log(res.join('>'))
}
// let root1 = new ListNode(7, new ListNode(1, new ListNode(6)))
// let root2 = new ListNode(5, new ListNode(9, new ListNode(2)))
let root1 = new ListNode(1, new ListNode(8))
let root2 = new ListNode(0)
printList(root1)
printList(root2)
let root = addTwoNumbers(root1, root2)
printList(root)
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 10:08:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 13:10:53
 * @FilePath: /js-demo/leetcode/常规题目/445.js
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
    445. 两数相加 II
        给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。
        它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
        你可以假设除了数字 0 之外，这两个数字都不会以零开头。
    进阶：
        如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
    示例：
        输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
        输出：7 -> 8 -> 0 -> 7
 */
var addTwoNumbers = function(l1, l2) {
    let stack1 = []
    let stack2 = []
    let curr1 = l1
    while(curr1){
        stack1.push(curr1)
        curr1 = curr1.next
    }
    let curr2 = l2
    while(curr2){
        stack2.push(curr2)
        curr2 = curr2.next
    }
    // console.log(stack1, stack2)
    let carry = 0
    let head = null
    while(stack1.length || stack2.length || carry != 0){
        let val1 = stack1.length ? stack1.pop().val : 0
        let val2 = stack2.length ? stack2.pop().val : 0
        let sum = (val1 + val2 + carry)
        carry = parseInt(sum / 10)
        sum %= 10
        let curr = new ListNode(sum)
        curr.next = head
        head = curr
        // console.log(sum, val1, val2)
    }
    return head
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
let root1 = new ListNode(7, new ListNode(2, new ListNode(4, new ListNode(3))))
let root2 = new ListNode(5, new ListNode(6, new ListNode(4)))
printList(root1)
printList(root2)
let root = addTwoNumbers(root1, root2)
printList(root)

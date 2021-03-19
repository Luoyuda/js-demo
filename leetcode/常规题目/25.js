/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 17:36:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 18:07:53
 * @FilePath: /js-demo/leetcode/常规题目/25.js
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
 * @param {number} k
 * @return {ListNode}
25. K 个一组翻转链表
    给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
    k 是一个正整数，它的值小于或等于链表的长度。
    如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
示例 1：
    输入：head = [1,2,3,4,5], k = 2
    输出：[2,1,4,3,5]
示例 2：
    输入：head = [1,2,3,4,5], k = 3
    输出：[3,2,1,4,5]
示例 3：
    输入：head = [1,2,3,4,5], k = 1
    输出：[1,2,3,4,5]
示例 4：
    输入：head = [1], k = 1
    输出：[1]
提示：
    列表中节点的数量在范围 sz 内
    1 <= sz <= 5000
    0 <= Node.val <= 1000
    1 <= k <= sz
 */
const myReverse = (head, tail) => {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const nex = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
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
let root = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))
printList(root)
let root1 = reverseKGroup(root, 2)
printList(root1)
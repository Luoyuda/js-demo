/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 14:07:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 15:58:31
 * @FilePath: /js-demo/leetcode/常规题目/82.js
 */
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 08:41:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 08:45:35
 * @FilePath: /js-demo/leetcode/常规题目/83.js
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
    82. 删除排序链表中的重复元素 II
        给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。
    示例 1:
        输入: 1->2->3->3->4->4->5
        输出: 1->2->5
    示例 2:
        输入: 1->1->1->2->3
        输出: 2->3
 */
var deleteDuplicates = function(head) {
    if(!head) return null
    let newHead = new ListNode()
    let p1 = head
    let p2 = newHead
    while (p1){
        let flag = false
        while (p1.next && p1.val == p1.next.val){
            p1 = p1.next
            flag = true
        }
        // console.log(p1.val, flag)
        if(flag){
            // 重复，已经走到下一个数
            p1 = p1.next
        }else{
            p2.next = new ListNode(p1.val)
            p2 = p2.next
            p1 = p1.next
        }
    }
    return newHead.next
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
let root1 = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(4))))))))
// printList(root1)
let root = deleteDuplicates(root1)
printList(root)

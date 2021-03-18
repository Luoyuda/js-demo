/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 08:49:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 08:53:50
 * @FilePath: /js-demo/leetcode/面试金典/02.01.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
    面试题 02.01. 移除重复节点
        编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
    示例1:
        输入：[1, 2, 3, 3, 2, 1]
        输出：[1, 2, 3]
    示例2:
        输入：[1, 1, 1, 1, 2]
        输出：[1, 2]
    提示：
        链表长度在[0, 20000]范围内。
        链表元素在[0, 20000]范围内。
 */
var removeDuplicateNodes = function(head) {
    let hash = {}
    let curr = head
    let prev = null
    while(curr) {
        if(hash[curr.val]){
            prev.next = curr.next
        }else{
            prev = curr
        }
        hash[curr.val] = true
        curr = curr.next
    }
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
let root1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(1, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(4))))))))
// printList(root1)
let root = removeDuplicateNodes(root1)
printList(root)

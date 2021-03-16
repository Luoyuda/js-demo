/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 15:53:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 16:02:15
 * @FilePath: /js-demo/leetcode/203.js
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
    203. 移除链表元素
        删除链表中等于给定值 val 的所有节点。
    示例:
        输入: 1->2->6->3->4->5->6, val = 6
        输出: 1->2->3->4->5
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var removeElements = function(head, val) {
    let p = new ListNode(null, head)
    let curr = p.next
    let pre = p
    while(curr){
        if(curr.val == val){
            pre.next = curr.next
            curr = pre.next
            // break
        }else{
            pre = curr
            curr = curr.next
        }
    }
    return p.next
};

var removeElements = function(head, val) {
    let p = new ListNode(null)
    let curr =head
    let front = p
    while(curr){
        if(curr.val != val){
            front.next = new ListNode(curr.val)
            front = front.next
        }
        curr = curr.next
    }
    return p.next
};

let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)
l1.next.next.next.next.next = new ListNode(6)
l1.next.next.next.next.next.next = new ListNode(6)
let L1 = l1
while(L1){
    console.log(L1.val)
    L1 = L1.next
}
let l3 = removeElements(l1, 6)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
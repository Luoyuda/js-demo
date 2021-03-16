/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 14:38:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 15:22:10
 * @FilePath: /js-demo/leetcode/206.js
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
    206. 反转链表
        反转一个单链表。
    示例:
        输入: 1->2->3->4->5->NULL
        输出: 5->4->3->2->1->NULL
    进阶:
        你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
// 非递归
var reverseList = function(head) {
    let cur = head
    let pre = null
    while(cur){
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
};
// 递归
var reverseList = function(head) {
    const reverse = (pre, cur) => {
        if(!cur) return pre
        let temp = cur.next
        cur.next = pre
        return reverse(cur, temp)
    }
    return reverse(null, head)
};

let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)

let l3 = reverseList(l1)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
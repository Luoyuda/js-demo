/*
 * @Author: xiaohuolong
 * @Date: 2020-07-17 18:42:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-17 20:22:22
 * @FilePath: /js-demo/leetcode/02.02.js
 */ 
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}
var kthToLast = function(head, k) {
    let pre = head
    let next = head
    let pos = k
    while(pos > 0) {
        next = next.next
        pos--
    }
    while (next){
        next = next.next
        pre = pre.next
    }
    return pre
};

console.log(kthToLast(new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))),2))
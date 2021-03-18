/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 18:20:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 18:41:10
 * @FilePath: /js-demo/leetcode/面试金典/02.06.js
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var findHalf = function(head){
    let fast = head
    let slow = head
    while (fast.next != null && fast.next.next != null){
        slow = slow.next
        fast = fast.next.next
    }
    return slow
}
var reverse = function(head){
    let prev = null
    let curr = head
    while (curr != null){
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
}
var isPalindrome = function(head) {
    if(!head) return true
    let half = findHalf(head)
    let p1 = head
    let reverseHead = reverse(half.next)
    let p2 = reverseHead
    let flag = true
    while (p2 && flag){
        if(p1.val != p2.val) flag = false
        p2 = p2.next
        p1 = p1.next
    }
    half.next = reverse(reverseHead)
    return flag
};
function ListNode(val) {
    this.val = val;
    this.next = null;
}
let root = new ListNode(1)
root.next = new ListNode(2)
root.next.next = new ListNode(1)
root.next.next.next = new ListNode(2)
root.next.next.next.next = new ListNode(1)
console.log(isPalindrome(root))
while (root){
    console.log(root.val)
    root = root.next
}
/*
 * @Author: xiaohuolong
 * @Date: 2021-02-26 23:39:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 09:09:03
 * @FilePath: /js-demo/leetcode/常规题目/234.js
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {boolean}
    234. 回文链表
        请判断一个链表是否为回文链表。
    示例 1:
        输入: 1->2
        输出: false
    示例 2:
        输入: 1->2->2->1
        输出: true
    进阶：
        你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
    找到前半部分链表的尾节点。
    反转后半部分链表。
    判断是否回文。
    恢复链表。
    返回结果。
 */
var findHalf = (head) => {
    let fast = head
    let slow = head
    while(fast.next !== null && fast.next.next !== null){
        fast = fast.next.next
        slow = slow.next
    }
    return slow
}
var reverse = (head) => {
    let pre = null
    let curr = head
    while(curr){
        let temp = curr.next
        curr.next = pre
        pre = curr
        curr = temp
    }
    return pre
}
var isPalindrome = function(head) {
    if(!head) return true
    let half = findHalf(head)
    let reverseHead = reverse(half.next)
    // console.log(reverseHead)
    // console.log(half)
    let p1 = head
    let p2 = reverseHead
    let flag = true
    while(flag && p2 != null){
        if(p1.val != p2.val) flag = false
        p1 = p1.next
        p2 = p2.next
    }
    half.next = reverse(reverseHead)
    return flag
}; 
var isPalindrome = function(head) {
    let half = findHalf(head)
    let reverseHead = reverse(half.next)
    let p1 = head
    let p2 = reverseHead
    let flag = true
    while (flag && p2) {
        if(p1.val != p2.val) flag = false
        p1 = p1.next
        p2 = p2.next
    }
    half.next = reverse(reverseHead)
    return flag
};
var reverse = head => {
    let prev = null
    let curr = head
    while (curr){
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
}
var findHalf = head => {
    let fast = head
    let slow = head
    while (fast.next && fast.next.next){
        fast = fast.next.next
        slow = slow.next
    }
    return slow
}
let l1 = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1,  new ListNode(1)))))
let p = l1
while(p){
    console.log(p.val)
    p = p.next
}
console.log(isPalindrome(l1))
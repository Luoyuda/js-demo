/*
 * @Author: xiaohuolong
 * @Date: 2021-03-11 10:12:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-11 10:38:56
 * @FilePath: /js-demo/leetcode/offer.52.js
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
    剑指 Offer 52. 两个链表的第一个公共节点
        输入两个链表，找出它们的第一个公共节点。
    示例 1：
        输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
        输出：Reference of the node with value = 8
        输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。
        从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
        在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
    示例 2：
        输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
        输出：Reference of the node with value = 2
        输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。
        从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
        在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
    示例 3：
        输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
        输出：null
        输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
        由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
        解释：这两个链表不相交，因此返回 null。
    注意：
        如果两个链表没有交点，返回 null.
        在返回结果后，两个链表仍须保持原有的结构。
        可假定整个链表结构中没有循环。
        程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 */
var getIntersectionNode = function(headA, headB) {
    let len1 = getListLength(headA)
    let len2 = getListLength(headB)
    let longHead = headA
    let shortHead = headB
    let diff = Math.abs(len1 - len2)
    if(len2 > len1){
        longHead = headB
        shortHead = headA
        diff = len2 - len1
    }
    for (let i = 0; i < diff; i++) {
        longHead = longHead.next
    }
    while(longHead){
        if(longHead == shortHead){
            return longHead
        }
        longHead = longHead.next
        shortHead = shortHead.next
    }
    return null
};
var getIntersectionNode = function(headA, headB) {
    let A = headA
    let B = headB;
    while (A != B) {
        A = A != null ? A.next : headB;
        B = B != null ? B.next : headA;
    }
    return A
}
let getListLength = (head) => {
    let len = 0
    let curr = head
    while(curr){
        len++
        curr = curr.next
    }
    return len
}

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let node4_1 = new ListNode(4)
let node1_1 = new ListNode(1)
let node8 = new ListNode(8)
let node4_2 = new ListNode(4)
let node5 = new ListNode(5)
node4_1.next = node1_1
node1_1.next = node8
node8.next = node4_2
node4_2.next = node5

let node5_1 = new ListNode(5)
let node0 = new ListNode(0)
let node1_2 = new ListNode(1)

node5_1.next = node0
node0.next = node1_2
node1_2.next = node8
// console.log(getIntersectionNode(node4_1, node5_1))
console.log(getIntersectionNode(node5_1, node4_1))
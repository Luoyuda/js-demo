/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 07:37:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 07:44:19
 * @FilePath: /js-demo/leetcode/面试金典/02.04.js
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
 * @param {number} x
 * @return {ListNode}
    面试题 02.04. 分割链表
        编写程序以 x 为基准分割链表，使得所有小于 x 的节点排在大于或等于 x 的节点之前。
        如果链表中包含 x，x 只需出现在小于 x 的元素之后(如下所示)。
        分割元素 x 只需处于“右半部分”即可，其不需要被置于左右两部分之间。
    示例:
        输入: head = 3->5->8->5->10->2->1, x = 5
        输出: 3->1->2->10->5->5->8
 */
var partition = function(head, x) {
    let large = new ListNode()
    let small = new ListNode()
    let largeHead = large
    let smallHead = small
    let cur = head
    while (cur){
        // console.log(cur.val, x)
        if(cur.val >= x){
            large.next = cur
            large = large.next
        }else{
            small.next = cur
            small = small.next
        }
        cur = cur.next
    }
    small.next = largeHead.next
    large.next = null
    return smallHead.next
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
let root = new ListNode(3, new ListNode(5, new ListNode(8, new ListNode(5,
    new ListNode(10, new ListNode(2, new ListNode(1, new ListNode(0))))))))
printList(root)
let root1 = partition(root, 5)
printList(root1)
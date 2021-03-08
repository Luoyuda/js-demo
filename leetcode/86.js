/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 10:31:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-27 10:56:35
 * @FilePath: /js-demo/leetcode/86.js
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
    86. 分隔链表
        给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，
        使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
    示例 1：
        输入：head = [1,4,3,2,5,2], x = 3
        输出：[1,2,2,4,3,5]
    示例 2：
        输入：head = [2,1], x = 2
        输出：[1,2]
    提示：
        链表中节点的数目在范围 [0, 200] 内
        -100 <= Node.val <= 100
        -200 <= x <= 200
 */
var partition = function(head, x) {
    if(!head) return head
    let small = new ListNode()
    let smallHead = small
    let large = new ListNode()
    let largeHead = large
    while(head){
        if(head.val >= x){
            large.next = head
            large = large.next
        }else{
            small.next = head
            small = small.next
        }
        head = head.next
    }
    large.next = null
    small.next = largeHead.next
    return smallHead.next
};

let l1 = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5, new ListNode(2))))))
let l2 = partition(l1, 3)
let cur = l2
while(cur){
    console.log(cur.val)
    cur = cur.next
}
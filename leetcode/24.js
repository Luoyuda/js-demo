/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 16:37:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 16:45:16
 * @FilePath: /js-demo/leetcode/24.js
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
    24. 两两交换链表中的节点
        给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
        你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
    示例 1：
        输入：head = [1,2,3,4]
        输出：[2,1,4,3]
    示例 2：
        输入：head = []
        输出：[]
    示例 3：
        输入：head = [1]
        输出：[1]
    提示：
        链表中节点的数目在范围 [0, 100] 内
        0 <= Node.val <= 100
    进阶：你能在不修改链表节点值的情况下解决这个问题吗?（也就是说，仅修改节点本身。）
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var swapPairs = function(head) {
    let P = new ListNode(null, head)
    let cur = P.next
    let pre = P
    while(cur){
        if(cur.next){
            let temp = cur.next.next
            pre.next = cur.next
            cur.next = temp
            pre.next.next = cur
            pre = cur
            cur = temp
        }else{
            cur = cur.next
            pre = cur
        }
    }
    return P.next
};

let l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(3)
l1.next.next.next = new ListNode(4)
l1.next.next.next.next = new ListNode(5)

let l3 = swapPairs(l1, 6)
while(l3){
    console.log(l3.val)
    l3 = l3.next
}
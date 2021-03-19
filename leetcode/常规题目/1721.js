/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 14:04:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 15:05:33
 * @FilePath: /js-demo/leetcode/常规题目/1721.js
 */
/**
1721. 交换链表中的节点
    给你链表的头节点 head 和一个整数 k 。
    交换 链表正数第 k 个节点和倒数第 k 个节点的值后，返回链表的头节点（链表 从 1 开始索引）。
示例 1：
    输入：head = [1,2,3,4,5], k = 2
    输出：[1,4,3,2,5]
示例 2：
    输入：head = [7,9,6,6,7,8,3,0,9,5], k = 5
    输出：[7,9,6,6,8,7,3,0,9,5]
示例 3：
    输入：head = [1], k = 1
    输出：[1]
示例 4：
    输入：head = [1,2], k = 1
    输出：[2,1]
示例 5：
    输入：head = [1,2,3], k = 2
    输出：[1,2,3]
提示：
    链表中节点的数目是 n
        1 <= k <= n <= 105
        0 <= Node.val <= 100
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function(head, k) {
    let cur = head
    let slow = null
    let fast = null
    while (--k){
        cur = cur.next
    }
    slow = cur
    fast = cur.next
    cur = head
    while (fast){
        cur = cur.next
        fast = fast.next
    }
    let temp = cur.val
    cur.val = slow.val
    slow.val = temp
    return head
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
let root = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))
printList(root)
let root1 = swapNodes(root, 2)
printList(root1)
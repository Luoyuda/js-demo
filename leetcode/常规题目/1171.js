/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 08:44:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 09:37:04
 * @FilePath: /js-demo/leetcode/常规题目/1171.js
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
 * @return {ListNode}
    1171. 从链表中删去总和值为零的连续节点
        给你一个链表的头节点 head，请你编写代码，反复删去链表中由总和值为 0 的连续节点组成的序列，
        直到不存在这样的序列为止。删除完毕后，请你返回最终结果链表的头节点。
    示例 1：
        输入：head = [1,2,-3,3,1]
        输出：[3,1]
        提示：答案 [1,2,1] 也是正确的。
    示例 2：
        输入：head = [1,2,3,-3,4]
        输出：[1,2,4]
    示例 3：
        输入：head = [1,2,3,-3,-2]
        输出：[1]
    提示：
        给你的链表中可能有 1 到 1000 个节点。
        对于链表中的每个节点，节点的值：-1000 <= node.val <= 1000.
 */
var removeZeroSumSublists = function(head) {
    let newHead = new ListNode()
    newHead.next = head
    let hash = {}
    let s = 0
    let cur = head
    hash[0] = newHead
    while (cur){
        s += cur.val
        if(hash[s]){
            // console.log(cur)
            // console.log(hash[s])
            let ss = s;
            let p = hash[s].next;
            while (p != cur) {
                ss += p.val;
                hash[ss] = null
                p = p.next;
            }
            hash[s].next = cur.next
        }else{
            hash[s] = cur
        }
        cur = cur.next
    }
    return newHead.next
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
// let root = new ListNode(1, new ListNode(2, new ListNode(-3, new ListNode(3, new ListNode(1)))))
let root = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(-3, new ListNode(4)))))
// let root = new ListNode(-1, new ListNode(1))
// let root = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(-3, new ListNode(-2)))))
printList(root)
let root1 = removeZeroSumSublists(root)
printList(root1)
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 16:36:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-20 23:37:31
 * @FilePath: /js-demo/leetcode/offer/offer.35.js
 */
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
    剑指 Offer 35. 复杂链表的复制
        请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，
        每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。
    示例 1：
        输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
        输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
    示例 2：
        输入：head = [[1,1],[2,1]]
        输出：[[1,1],[2,1]]
    示例 3：
        输入：head = [[3,null],[3,0],[3,null]]
        输出：[[3,null],[3,0],[3,null]]
    示例 4：
        输入：head = []
        输出：[]
        解释：给定的链表为空（空指针），因此返回 null。
    提示：
        -10000 <= Node.val <= 10000
        Node.random 为空（null）或指向链表中的节点。
        节点数目不超过 1000 。
 */
var copyRandomList = function(head) {
    if(!head) return null
    let curr = head
    while(curr){
        let next = curr.next
        curr.next = new Node(curr.val)
        curr.next.next = next
        curr = next
    }
    curr = head
    while(curr){
        let random = curr.random ? curr.random.next : null
        curr.next.random = random
        curr = curr.next.next
    }
    let res =  head.next
    let pre = head
    curr = head.next
    while(curr.next){
        pre.next = pre.next.next
        curr.next = curr.next.next
        pre = pre.next
        curr = curr.next
    }
    pre.next = null
    return res
};

function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};
let node7 = new Node(7)
let node13 = new Node(13)
let node11 = new Node(11)
let node10 = new Node(10)
let node1 = new Node(1)
node7.next = node13
node7.random = null
node13.next = node11
node13.random = node7
node11.next = node10
node11.random = node1
node10.next = node1
node10.random = node11
node1.next = null
node1.random = node7
let root = node7
let root1 = copyRandomList(root)
while(root1){
    console.log(root1.val == root.val)
    if(root.random){
        console.log(root1.random.val == root.random.val)
    }
    root1 = root1.next
    root = root.next
}
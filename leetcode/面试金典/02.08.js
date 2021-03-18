/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 16:27:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 17:00:38
 * @FilePath: /js-demo/leetcode/面试金典/02.08.js
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
    面试题 02.08. 环路检测
        给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。
        如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
        为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
        如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
    示例 1：
        输入：head = [3,2,0,-4], pos = 1
        输出：tail connects to node index 1
        解释：链表中有一个环，其尾部连接到第二个节点。
    示例 2：
        输入：head = [1,2], pos = 0
        输出：tail connects to node index 0
        解释：链表中有一个环，其尾部连接到第一个节点。
    示例 3：
        输入：head = [1], pos = -1
        输出：no cycle
        解释：链表中没有环。
 */
var detectCycle = function(head) {
    if(!head) return head
    let fast = head
    let slow = head
    while(fast){
        slow = slow.next;
        if(fast.next){
            fast = fast.next.next
        }else{
            return null
        }
        if(fast == slow){
            fast = head
            while(fast != slow){
                fast = fast.next
                slow = slow.next;
            }
            return fast
        }
    }
    return null
}

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
let root3 = new ListNode(3)
let root2 = new ListNode(2)
let root0 = new ListNode(0)
let root5 = new ListNode(5)
let root4 = new ListNode(-4)
root3.next = root2
root2.next = root0
root0.next = root4
root5.next = root4
root4.next = root0
// printList(root1)
let root = detectCycle(root3)
console.log(root)
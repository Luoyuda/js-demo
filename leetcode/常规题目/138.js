/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 10:34:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 13:47:47
 * @FilePath: /js-demo/leetcode/常规题目/138.js
 */
/**
 * @param {Node} head
 * @return {Node}
138. 复制带随机指针的链表
    给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。
    构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。
    例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，同样有 x.random --> y 。
    返回复制链表的头节点。
    用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
    val：一个表示 Node.val 的整数。
    random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
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
    0 <= n <= 1000
    -10000 <= Node.val <= 10000
    Node.random 为空（null）或指向链表中的节点。
 */
var copyRandomList = function(head) {
    // 1.先复制一份备份
    let cur = head
    while (cur){
        let temp = cur.next
        cur.next = new ListNode(cur.val, temp)
        cur = temp
    }
    // 2.处理复制的random指针指向
    cur = head
    while (cur && cur.next){
        // console.log(cur, cur.next)
        cur.next.random = cur.random ? cur.random.next : null
        cur = cur.next.next
    }
    // 3.分离出两个链表
    let copyHead = head.next
    let copy = copyHead
    cur = head
    while (cur){
        cur.next = cur.next ? cur.next.next : null
        copy.next = copy.next ? copy.next.next : null
        copy = copy.next
        cur = cur.next
    }
    return copyHead
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
    this.random = null
}
var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push([curr.val, curr.random ? curr.random.val : null])
        curr = curr.next
    }
    console.log(res.join('>'))
}
let root7 = new ListNode(7)
let root13 = new ListNode(13)
let root11 = new ListNode(11)
let root10 = new ListNode(10)
let root1 = new ListNode(1)
root7.next = root13
root7.random = null
root13.next = root11
root13.random = root7
root11.next = root10
root11.random = root1
root10.next = root1
root10.random = root13
root1.next = null
root1.random = root7
printList(root7)
let root = copyRandomList(root7)
printList(root)
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-18 08:11:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-18 08:25:20
 * @FilePath: /js-demo/leetcode/常规题目/725.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
    725. 分隔链表
        给定一个头结点为 root 的链表, 编写一个函数以将链表分隔为 k 个连续的部分。
        每部分的长度应该尽可能的相等: 任意两部分的长度差距不能超过 1，也就是说可能有些部分为 null。
        这k个部分应该按照在链表中出现的顺序进行输出，并且排在前面的部分的长度应该大于或等于后面的长度。
        返回一个符合上述规则的链表的列表。
    举例：
        1->2->3->4, k = 5 // 5 结果 [ [1], [2], [3], [4], null ]
    示例 1：
        输入: 
        root = [1, 2, 3], k = 5
        输出: [[1],[2],[3],[],[]]
        解释:
        输入输出各部分都应该是链表，而不是数组。
        例如, 输入的结点 root 的 val= 1, root.next.val = 2, \root.next.next.val = 3, 且 root.next.next.next = null。
        第一个输出 output[0] 是 output[0].val = 1, output[0].next = null。
        最后一个元素 output[4] 为 null, 它代表了最后一个部分为空链表。
    示例 2：
        输入: 
        root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3
        输出: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
        解释:
        输入被分成了几个连续的部分，并且每部分的长度相差不超过1.前面部分的长度大于等于后面部分的长度。
    提示:
        root 的长度范围： [0, 1000].
        输入的每个节点的大小范围：[0, 999].
        k 的取值范围： [1, 50].
 */
var splitListToParts = function(root, k) {
    let cur = root
    let n = 0
    while(cur) {
        cur = cur.next
        n++
    }
    let width = parseInt(n / k)
    let rem = parseInt(n % k)
    let res = []
    cur = root
    for (let i = 0; i < k; i++) {
        let head = cur
        for (let j = 0; j < width + (i < rem ? 1 : 0) - 1; j++) {
            if(cur) cur = cur.next
        }
        // console.log(cur)
        let prev
        if(cur){
            prev = cur
            cur = cur.next
            prev.next = null
        }
        res[i] = head
    }
    // console.log(n, width, rem)
    return res
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
let root = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7, new ListNode(8, new ListNode(9, new ListNode(10))))))))))
printList(root)
let root1 = splitListToParts(root, 3)
console.log(root1)
root1.map(item => printList(item))
// printList(root1)
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 23:36:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 23:52:00
 * @FilePath: /js-demo/leetcode/常规题目/1669.js
 */
/**
 * Definition for singly-linked list.
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
1669. 合并两个链表
    给你两个链表 list1 和 list2 ，它们包含的元素分别为 n 个和 m 个。
    请你将 list1 中第 a 个节点到第 b 个节点删除，并将list2 接在被删除节点的位置。
    请你返回结果链表的头指针。
示例 1：
    输入：list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
    输出：[0,1,2,1000000,1000001,1000002,5]
    解释：我们删除 list1 中第三和第四个节点，并将 list2 接在该位置。上图中蓝色的边和节点为答案链表。
示例 2：
    输入：list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
    输出：[0,1,1000000,1000001,1000002,1000003,1000004,6]
    解释：上图中蓝色的边和节点为答案链表。
提示：
    3 <= list1.length <= 104
    1 <= a <= b < list1.length - 1
    1 <= list2.length <= 104
 */
var mergeInBetween = function(list1, a, b, list2) {
    let i = 0
    let curr = list1
    let list2Tail = list2
    while (list2Tail.next){
        list2Tail = list2Tail.next
    }
    // console.log(list2Tail)
    while(curr){
        i++
        let temp = curr.next
        if(i == a){
            curr.next = list2
        }
        if(i == b){
            list2Tail.next = temp.next
        }
        curr = temp
    }
    return list1
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printList = (head) => {
    let curr = head;
    while (curr){
        console.log(curr.val)
        curr = curr.next
    }
}
let root1 = new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))))
let root2 = new ListNode(100000, new ListNode(100001, new ListNode(1000002)))
printList(root1)
printList(root2)
let root = mergeInBetween(root1, 1, 1, root2)
printList(root1)

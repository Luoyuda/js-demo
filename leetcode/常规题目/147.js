/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 15:05:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 15:58:44
 * @FilePath: /js-demo/leetcode/常规题目/147.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
    if(!head) return null
    const dummyHead = new ListNode(0)
    dummyHead.next = head
    let lastSorted = head
    let curr = head.next
    while(curr){
        if(lastSorted.val <= curr.val){
            lastSorted = lastSorted.next
        }else {
            let prev = dummyHead
            while(prev.next.val <= curr.val){
                prev = prev.next
            }
            lastSorted.next = curr.next
            curr.next = prev.next
            prev.next = curr
        }
        curr = lastSorted.next
    }
    return dummyHead.next
};
var insertSort = function(arr){
    let preIndex = 0
    let curr = 0
    let length = arr.length
    for (let i = 1; i < length; i++) {
        preIndex = i - 1
        curr = arr[i]
        while (preIndex >= 0 && arr[preIndex] > curr){
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = curr
    }
    return arr
}
console.log(insertSort([5,2,1,3,4]))

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
// let root = new ListNode(5, new ListNode(2, new ListNode(1, new ListNode(3, new ListNode(4)))))
let root = new ListNode(-1, new ListNode(5, new ListNode(3, new ListNode(4, new ListNode(0)))))
printList(root)
let root1 = insertionSortList(root)
printList(root1)
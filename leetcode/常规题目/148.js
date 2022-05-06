/*
 * @Author: xiaohuolong
 * @Date: 2021-03-16 23:50:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-21 08:14:12
 * @FilePath: /js-demo/leetcode/常规题目/148.js
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
    148. 排序链表
        给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
    进阶：
        你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
    示例 1：
        输入：head = [4,2,1,3]
        输出：[1,2,3,4]
    示例 2：
        输入：head = [-1,5,3,4,0]
        输出：[-1,0,3,4,5]
    示例 3：
        输入：head = []
        输出：[]
    提示：
        链表中节点的数目在范围 [0, 5 * 104] 内
        -105 <= Node.val <= 105
 */
var sortList = function(head) {
    return toSortList(head, null);
};
var merge = function(head1, head2){
    let head = new ListNode()
    let temp = head
    let temp1 = head1
    let temp2 = head2
    while (temp1 != null && temp2 != null){
        if(temp1.val <= temp2.val){
            temp.next = temp1
            temp1 = temp1.next
        }else{
            temp.next = temp2
            temp2 = temp2.next
        }
        temp = temp.next
    }
    if(temp1 != null){
        temp.next = temp1
    }else if(temp2 != null){
        temp.next = temp2
    }
    return head.next
}
var toSortList = function(head, tail) {
    if(!head) return head
    if(head.next == tail) {
        head.next = null
        return head
    }
    let fast = head
    let slow = head
    while(fast && fast !== tail) {
        slow = slow.next
        fast = fast.next
        if(fast && fast !== tail){
            fast = fast.next
        }
    }
    let mid = slow
    return merge(toSortList(head, mid), toSortList(mid, tail))
};

/**
 * O(1)空间解法
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    let dummy = new ListNode(-1)
    dummy.next = head
    let p = head
    let n = 0
    while(p){
        p = p.next
        n++
    
    for(let i = 1; i < n; i *= 2){
        let cur = dummy
        for(let j = 0; j + i < n; j += i * 2){
            let left = cur.next
            let right = cur.next
            for(let k = 0; k < i; k++) right = right.next
            let l = 0
            let r = 0
            while(l < i && r < i && right){
                if(left.val <= right.val){
                    cur.next = left
                    cur = left
                    left = left.next
                    l++
                }else{
                    cur.next = right
                    cur = right
                    right = right.next
                    r++
                }
            }
            while(l < i){
                cur.next = left
                cur = left
                left = left.next
                l++
            }
            while(r < i && right){
                cur.next = right
                cur = right
                right = right.next
                r++
            }
            cur.next = right
        }
    }
    return dummy.next
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  return toSortList(head, null)
};

/**
 * @param {ListNode} head
 * @param {ListNode} tail
 * @return {ListNode}
 */
var toSortList = function(head, tail) {
  if(!head) return head
  if(head.next === tail){
    head.next = null
    return head
  }
  const mid = findMidNode(head, tail)
  return marge(toSortList(head, mid), toSortList(mid, tail))
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function marge(l1, l2){
  const dummy = new ListNode(null)
  let cur = dummy
  while(l1 && l2){
    if(l1.val < l2.val){
      cur.next = l1
      l1 = l1.next
    }else{
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 || l2
  return dummy.next
}

/**
 * @param {ListNode} head
 * @param {ListNode} tail
 * @return {ListNode}
 */
var findMidNode = function(head, tail) {
  let fast = head
  let slow = head
  while(fast && fast !== tail) {
    slow = slow.next
    fast = fast.next
    if(fast && fast !== tail){
      fast = fast.next
    }
  }
  return slow
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
let root1 = new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1, new ListNode(0, new ListNode(5))))))
// printList(root1)
let root = toSortList(root1)
printList(root)
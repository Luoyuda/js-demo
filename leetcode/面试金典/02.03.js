/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 08:35:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-17 08:37:48
 * @FilePath: /js-demo/leetcode/面试金典/02.03.js
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
    面试题 02.03. 删除中间节点
        实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。
    示例：
        输入：单向链表a->b->c->d->e->f中的节点c
        结果：不返回任何数据，但该链表变为a->b->d->e->f
 */
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};

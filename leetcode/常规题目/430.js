/*
 * @Author: xiaohuolong
 * @Date: 2020-09-14 16:34:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-21 00:06:58
 * @FilePath: /js-demo/leetcode/常规题目/430.js
 */
/**
// Definition for a Node.
 */
function Node(val,prev,next,child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
};
/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    let copy = head
    while(copy){
        let next = copy.next
        while(copy.child){
            let node = flatten(copy.child)
            copy.child = null
            copy.next = node
            node.prev = copy
            let end = node
            while(end.next){
                end = end.next
            }
            end.next = next
            next && (next.prev = end)
        }
        copy = next
    }
    return head
};


var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(3)
var node35 = new Node(3.5)
var node4 = new Node(4)
var node5 = new Node(5)
node1.child = node3
node1.next = node2
node2.prev = node1
node3.child = node4
node3.next = node35
node4.next = node5
console.log(node1)
var fnode = flatten(node1)
while (fnode){
    console.log(fnode.val)
    fnode = fnode.next
}
console.log(fnode)
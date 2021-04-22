/*
 * @Author: xiaohuolong
 * @Date: 2021-03-17 17:05:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-20 07:34:18
 * @FilePath: /js-demo/leetcode/常规题目/707.js
 */
/**
707. 设计链表
    设计链表的实现。您可以选择使用单链表或双链表。
    单链表中的节点应该具有两个属性：val 和 next。
    val 是当前节点的值，next 是指向下一个节点的指针/引用。
    如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。
    假设链表中的所有节点都是 0-index 的。
在链表类中实现这些功能：
    get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
    addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
    addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
    addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
    deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
示例：
    MyLinkedList linkedList = new MyLinkedList();
    linkedList.addAtHead(1);
    linkedList.addAtTail(3);
    linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
    linkedList.get(1);            //返回2
    linkedList.deleteAtIndex(1);  //现在链表是1-> 3
    linkedList.get(1);            //返回3
提示：
    所有val值都在 [1, 1000] 之内。
    操作次数将在  [1, 1000] 之内。
    请不要使用内置的 LinkedList 库。
*/
var ListNode = function(val=null, next=null) {
    this.val = val
    this.next = next
}
var MyLinkedList = function() {
    this.head = new ListNode()
    this.length = 0
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    index = Number(index)
    if(isNaN(index) || index < 0 || index >= this.length) return -1
    let curr = this.head.next
    while (index-- && curr.next){
        curr = curr.next
    }
    return curr.val
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    return this.addAtIndex(0, val)
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    return this.addAtIndex(this.length, val)
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    index = Number(index)
    if(isNaN(index) || index > this.length) return null
    if(index < 0) index = 0
    let prev = this.head
    for (let i = 0; i < index; i++) {
        prev = prev.next
    }
    let node = new ListNode(val)
    node.next = prev.next
    prev.next = node
    this.length++
    return node
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    index = Number(index)
    if(this.length <= index || index < 0 || isNaN(index)) return
    let prev = this.head
    for (let i = 0; i < index; i++) {
        prev = prev.next
    }
    let curr = prev.next
    prev.next = prev.next.next
    this.length--
    return curr
};

var printList = (head) => {
    let curr = head;
    let res = []
    while (curr){
        res.push(curr.val)
        curr = curr.next
    }
    console.log(res.join('>'))
}
// let funcs = ["addAtHead","addAtHead","addAtHead","addAtIndex","deleteAtIndex","addAtHead","addAtTail","get","addAtHead","addAtIndex","addAtHead"]
// let params = [[7],[2],[1],[3,0],[2],[6],[4],[4],[4],[5,0],[6]]
// let funcs = ["addAtHead","deleteAtIndex","addAtHead","addAtHead","addAtHead","addAtHead","addAtHead","addAtTail","get","deleteAtIndex","deleteAtIndex"]
// let params = [[2],[1],[2],[7],[3],[2],[5],[5],[5],[6],[4]]
// let funcs = ["addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]
// let params = [[1],[3],[1,2],[1],[1],[1]]
// let funcs = ["addAtHead","get","addAtHead","addAtHead","deleteAtIndex","addAtHead","get","get","get","addAtHead","deleteAtIndex"]
// let params = [[4],[1],[1],[5],[3],[7],[3],[3],[3],[1],[4]]
// let funcs = ["addAtHead","addAtTail","addAtTail","get","get","addAtTail","addAtIndex","addAtHead","addAtHead","addAtTail","addAtTail","addAtTail","addAtTail","get","addAtHead","addAtHead","addAtIndex","addAtIndex","addAtHead","addAtTail","deleteAtIndex","addAtHead","addAtHead","addAtIndex","addAtTail","get","addAtIndex","addAtTail","addAtHead","addAtHead","addAtIndex","addAtTail","addAtHead","addAtHead","get","deleteAtIndex","addAtTail","addAtTail","addAtHead","addAtTail","get","deleteAtIndex","addAtTail","addAtHead","addAtTail","deleteAtIndex","addAtTail","deleteAtIndex","addAtIndex","deleteAtIndex","addAtTail","addAtHead","addAtIndex","addAtHead","addAtHead","get","addAtHead","get","addAtHead","deleteAtIndex","get","addAtHead","addAtTail","get","addAtHead","get","addAtTail","get","addAtTail","addAtHead","addAtIndex","addAtIndex","addAtHead","addAtHead","deleteAtIndex","get","addAtHead","addAtIndex","addAtTail","get","addAtIndex","get","addAtIndex","get","addAtIndex","addAtIndex","addAtHead","addAtHead","addAtTail","addAtIndex","get","addAtHead","addAtTail","addAtTail","addAtHead","get","addAtTail","addAtHead","addAtTail","get","addAtIndex"]
// let params = [[84],[2],[39],[3],[1],[42],[1,80],[14],[1],[53],[98],[19],[12],[2],[16],[33],[4,17],[6,8],[37],[43],[11],[80],[31],[13,23],[17],[4],[10,0],[21],[73],[22],[24,37],[14],[97],[8],[6],[17],[50],[28],[76],[79],[18],[30],[5],[9],[83],[3],[40],[26],[20,90],[30],[40],[56],[15,23],[51],[21],[26],[83],[30],[12],[8],[4],[20],[45],[10],[56],[18],[33],[2],[70],[57],[31,24],[16,92],[40],[23],[26],[1],[92],[3,78],[42],[18],[39,9],[13],[33,17],[51],[18,95],[18,33],[80],[21],[7],[17,46],[33],[60],[26],[4],[9],[45],[38],[95],[78],[54],[42,86]]
// 22>73>31>80>37>33>16>1>14>17>84>8>0>80>2>39>23>53>98>19>12>43>17>21
// [null,null,null,null,-1,2,null,null,null,null,null,null,null,null,84,null,null,null,null,null,null,null,null,null,null,null,16,null,null,null,null,null,null,null,null,37,null,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,19,null,17,null,null,56,null,null,31,null,17,null,12,null,null,null,null,null,null,null,40,null,null,null,37,null,76,null,70,null,null,null,null,null,null,80,null,null,null,null,43,null,null,null,83,null]
// [null,null,null,null,-1,2,null,null,null,null,null,null,null,null,84,null,null,null,null,null,null,null,null,null,null,null,16,null,null,null,null,null,null,null,null,37,null,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,19,null,17,null,null,56,null,null,31,null,17,null,12,null,null,null,null,null,null,null,40,null,null,null,37,null,76,null,42,null,null,null,null,null,null,80,null,null,null,null,43,null,null,null,40,null]
let funcs = ["addAtHead","deleteAtIndex","addAtHead","addAtHead","addAtHead","addAtHead","addAtHead","addAtTail","get","deleteAtIndex","deleteAtIndex"]
let params =[[2],[1],[2],[7],[3],[2],[5],[5],[5],[6],[4]]
const linkedList = new MyLinkedList();
for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    console.log('func ->', func)
    console.log('params ->', ...params[i])
    printList(linkedList.head.next)
    let result = linkedList[func](...params[i])
    console.log(result)
}
// printList(linkedList.head.next)
// // console.log(linkedList.get(52))
// linkedList.addAtHead(1)
// linkedList.addAtTail(3)
// console.log(linkedList)
// linkedList.addAtIndex(1,2)   //链表变为1-> 2-> 3
// printList(linkedList.head.next)
// console.log(linkedList.get(3))            //返回2
// linkedList.deleteAtIndex(1)  //现在链表是1-> 3
// printList(linkedList.head.next)
// console.log(linkedList.get(1))          //返回3
// printList(linkedList.head.next)
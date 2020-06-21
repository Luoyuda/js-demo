/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 09:58:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-22 00:21:40
 * @FilePath: /js-demo/data-structures/DoublyLinkList/DoublyLinkList.js
 */ 
class DoublyLinkList {
    constructor(...arg){
        this.head = null
        this.rear = null
    }
    node(data){
        return {
            data,
            next: null,
            prev: null
        }
    }
    // 指定位置插入
    add(el, data){
        // 查找到要插入的节点
        let curr = this.contains(el)
        // 如果不存在 返回 null
        if(!curr) throw null
        // 初始化一个节点 node
        let node = this.node(data)
        // 取出插入节点 curr 的 next
        let temp = curr.next
        // curr 的 next 指向新节点 node
        curr.next = node
        // node.prev 指向 前置节点
        node.prev = curr
        // node 的 next 指向 curr 原来的 next
        node.next = temp
        // 返回节点值
        return node.data
    }
    // 尾部插入
    append(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.rear){
            // 如果尾指针为空，则链表为空，直接令插入的节点作为头和尾
            this.head = node
            this.rear = node
            return node.data
        }
        // 取出尾节点
        let temp = this.rear
        // 节点的 temp.next 指向 node
        temp.next = node
        // node.prev 指向 前置节点 temp
        node.prev = temp
        // 尾节点指针 指向 node
        this.rear = node
        // 返回节点值
        return node.data
    }
    // 头插法
    prepend(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.head){
            // 如果头节点指针为空，则链表为空，直接令插入的节点作为头和尾
            this.head = node
            this.rear = node
            return node.data
        }
        // 取出头节点
        let temp = this.head 
        // 节点的 next 指向 temp
        node.next = temp
        // temp.prev 指向 前置节点 node
        temp.prev = node
        // 头节点指针 指向 node
        this.head = node
        // 返回节点值
        return node.data
    }
    // 删除方法
    remove(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 如果 删除值 等于头节点的值 直接删除头节点
        if(this.head.data === el) return this.removeHead()
        // 取出头节点 寻找 前置节点
        let curr = this.contains(el)
        // 如果找不到，返回null
        if(!curr) return null
        // 如果需删除的是尾节点
        if(curr == this.rear) return this.removeRear()
        // 取出删除节点的前置节点，后置节点
        let nextNode = curr.next
        let prevNode = curr.prev
        // 前置节点的 next 指向 后置节点
        prevNode.next = nextNode
        // 后置节点的 prev 指向 前置节点
        nextNode.prev = prevNode
        return curr.data
    }
    // 删除第一个节点
    removeHead(){
        if(!this.head) return null
        // 取出头节点
        let temp = this.head
        // 如果头节点不存在，返回 null
        if(!temp) return null
        // 如果头节点的 next 不存在 尾节点置为 null
        if(!temp.next) {
            this.rear = null
            this.head = null
            return temp.data
        }
        // 删除 prev 的指向
        temp.next.prev = null
        // 指定新的 头指针指向
        this.head = temp.next
        // 清空 temp.next 的指向
        temp.next = null
        return temp.data
    }
    // 删除第一个节点
    removeRear(){
        if(!this.rear) return null
        // 先取出 头节点
        let curr = this.rear.prev
        // 取出尾节点
        let rear = this.rear
        // 断开联系
        rear.prev = null
        // 把前置节点 curr 的 next 指向 null
        if(curr) curr.next = null
        // 把尾指针指向 前置节点 curr
        this.rear = curr
        return rear.data
    }
    // 搜索方法
    contains(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 先取出 头节点
        let curr = this.head
        while (curr){
            // 当 data = el 跳出循环
            if(curr.data === el) break
            // 如果不是 curr = curr.next 
            curr = curr.next
        }
        // 返回节点
        return curr
    }
    // 遍历方法
    traverse(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 先取出 头节点
        let curr = this.head
        while (curr){
            // 处理每一个值
            res.push(callback(curr.data))
            // 前进一步
            curr = curr.next
        }
        // 返回
        return res
    }
    // 反向遍历
    reverseTraversal(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 先取出 头节点
        let curr = this.rear
        while (curr){
            // 处理每一个值
            res.push(callback(curr.data))
            // 前进一步
            curr = curr.prev
        }
        // 返回
        return res
    }
    // 反转链表
    reverse() {
        // 如果没有头节点，空链表返回null
        if(!this.head) return null
        // 取出头节点
        let curr = this.head
        // 定义 next 节点
        let next = null
        // 定义 prev 节点
        let prev = null
        while(curr){
            // 1 2 3
            // 把 next 指向 curr.next
            next = curr.next 
            // 1. curr = 1 { 1, 2 } next = 2 { 2, 3 } prev = null 
            // 2. curr = { 2, 3 } next = { 3, null } prev = { 1,null }
            // 3. curr = { 3, null } next = null prev = { 2, 1 }
            // curr.next 指向 prev 节点
            curr.next = prev 
            // 指定前置节点
            if(prev) prev.prev = curr
            // 1. { 1, null }
            // 2. { 2, 1 } { 1, null }
            // 3. { 3, 2 } { 2, 1 } { 1, null }
            // prev 节点 指向 curr
            prev = curr 
            // 1. prev = { 1, null }
            // 2. prev = { 2, 1 }
            // 3. prev = { 3, 2 }
            // 当前节点指向 next
            curr = next 
            // 1. curr = { 2, 3 }
            // 2. curr = { 3, null }
            // 2. curr = null
        }
        // 把原来的尾指针指向原来的头指针
        this.rear = this.head // { 3, 2 } => { 1, null }
        // 头指针指向 prev 节点
        this.head = prev // { 1, null } => { 3, 2 }
        // 清楚头指针的 前置指针
        this.head.prev = null
        return this
    }
    // 取出中间节点
    findMid(){
        // 如果没有头节点，空链表返回null
        if(!this.head) return null
        // 设置 快指针 search 慢指针 mid  
        // search 步数为 mid 的两倍 
        let search = this.head
        let mid = this.head
        while(search.next){
            // 当 search.next == null 则说明到尾部 跳出循环
            if(search.next.next != null){
                // 如果 search.next.next 存在值，则继续行进
                search = search.next.next
                mid = mid.next
            }else{
                // 不存在则 快指针直接指向下一个节点
                search = search.next
            }
        }
        // 返回
        return mid
    }
    toArray() {
        if(!this.head) return []
        const nodes = [];
        let curr = this.head;
        while (curr) {
            nodes.push(curr.data);
            curr = curr.next;
        }
        return nodes;
    }
    toString(callback=(item)=>item) {
        return this.toArray().map(data => callback(data)).toString();
    }
}

module.exports = {
    DoublyLinkList
}
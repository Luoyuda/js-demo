/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 15:37:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-30 08:45:23
 * @FilePath: /js-demo/data-structures/Queue/Queue.js
 */ 
const { LinkList } = require('../LinkList/LinkList')
const { Stack } = require('../Stack/Stack')

// 链表实现队列
class Queue {
    constructor(){
        this.linkList = new LinkList()
    }
    isEmpty(){
        return !this.linkList.head
    }
    front(){
        return this.linkList.head && this.linkList.head.data || null
    }
    back(){
        return this.linkList.rear && this.linkList.rear.data || null
    }
    enqueue(data){
        return this.linkList.append(data)
    }
    dequeue(){
        return this.linkList.removeHead()
    }
    clear(){
        return this.linkList.clear()
    }
    toArray() {
        return this.linkList.toArray()
    }
    toString(callback=(item)=>item){
        return this.linkList.toString(callback)
    }
}

// 栈实现队列
class QueueStack {
    constructor() {
        this.s1 = new Stack() // 1,2,3
        this.s2 = new Stack() // 
        this.queueBack = null
    }
    isEmpty(){
        return this.s1.isEmpty() && this.s2.isEmpty()
    }
    front(){
        if(!this.s2.isEmpty()) return
        while(!this.s1.isEmpty()){
            this.s2.push(this.s1.pop())
        }
        return this.s2.peek()
    }
    back(){
        return this.queueBack
    }
    enqueue(data){
        let curr = this.s1.push(data)
        this.queueBack = this.s1.peek()
        return curr
    }
    dequeue(){
        this.front()
        let curr = this.s2.pop()
        if(curr == this.queueBack) this.queueBack = null
        return curr
    }
    clear(){
        this.s1.clear()
        this.s2.clear()
        this.queueBack = null
        return null
    }
    toArray() {
        this.front()
        return this.s2.toArray()
    }
    toString(callback=(item)=>item){
        this.front()
        return this.s2.toString(callback)
    }
}

module.exports = {
    Queue,
    QueueStack
}
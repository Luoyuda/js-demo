/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 15:37:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-22 00:31:50
 * @FilePath: /js-demo/data-structures/Queue/Queue.js
 */ 
const { LinkList } = require('../LinkList/LinkList')

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

module.exports = {
    Queue
}
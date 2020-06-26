/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 15:37:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-24 10:47:38
 * @FilePath: /js-demo/data-structures/Stack/Stack.js
 */ 
const { LinkList } = require('../LinkList/LinkList')

class StackLinked {
    constructor(){
        this.linkList = new LinkList()
        this.length = 0
        this.top = 0
    }
    isEmpty(){
        return !this.linkList.head
    }
    pop(){
        if(this.isEmpty()) return null
        let curr = this.linkList.removeHead()
        --this.length
        --this.top
        return curr
    }
    push(data){
        let curr = this.linkList.prepend(data)
        ++this.length
        ++this.top
        return curr
    }
    peek(){
        return this.linkList.head && this.linkList.head.data || null
    }
    clear(){
        return this.linkList.clear()
    }
    toString(callback=(item)=>item){
        return this.linkList.toString(callback)
    }
    toArray(){
        return this.linkList.toArray()
    }
}

class Stack {
    constructor(){
        this.list = new Array()
    }
    length(){
        return this.list.length
    }
    top(){
        return this.length() - 1
    }
    isEmpty(){
        return !this.list.length
    }
    pop(){
        if(this.isEmpty()) return null
        let curr = this.list.pop()
        return curr
    }
    push(data){
        let curr = this.list.push(data)
        return data
    }
    peek(){
        return this.top() >= 0 && this.list[this.top()] || null
    }
    clear(){
        return this.list = []
    }
    toString(callback=(item)=>item){
        return this.list.map(item => callback(item)).toString()
    }
    toArray(){
        return this.list
    }
}

module.exports = {
    StackLinked,
    Stack,
}
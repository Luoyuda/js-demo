/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 15:37:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-22 00:32:06
 * @FilePath: /js-demo/data-structures/Stack/Stack.js
 */ 
const { LinkList } = require('../LinkList/LinkList')

class Stack {
    constructor(){
        this.linkList = new LinkList()
        this.length = 0
    }
    isEmpty(){
        return !this.linkList.head
    }
    pop(){
        let curr = this.linkList.removeHead()
        if(!curr) return null
        --this.length
        return curr
    }
    push(data){
        let curr = this.linkList.prepend(data)
        if(!curr) return null
        ++this.length
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

module.exports = {
    Stack
}
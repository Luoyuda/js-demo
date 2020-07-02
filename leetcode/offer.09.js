/*
 * @Author: xiaohuolong
 * @Date: 2020-06-30 08:33:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-30 08:48:47
 * @FilePath: /js-demo/leetcode/offer.09.js
 */ 
var CQueue = function() {
    this.stack1 = []
    // this.stack2 = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value)
    return value
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    return this.stack1.length ? this.stack1.shift() : -1
    // if(this.stack1.length && !this.stack2.length){
    //     while(this.stack1.length){
    //         this.stack2.push(this.stack1.pop())
    //     }
    // }
    // console.log(this.stack2)
    // return this.stack2.length ? this.stack2.pop() : -1
};
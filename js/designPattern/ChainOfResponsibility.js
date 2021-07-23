/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 20:48:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 21:15:47
 * @FilePath: /DesignPatterns/ChainOfResponsibility.js
 */
const Chain = function(fn){
    this.fn = fn
    this.successor = null
}
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor
}
Chain.prototype.passRequest = function(){
    let ret = this.fn.apply(this, arguments)
    if(ret !== 'successor') return ret
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

const aFn = function(count){
    console.log(count)
    if(count < 70) return console.log('谢谢参与')
    return 'successor'
}

const bFn = function(count){
    if(count < 80) return console.log('得了三等奖')
    return 'successor'
}

const cFn = function(count){
    if(count < 90) return console.log('得了二等奖')
    return 'successor'
}

const dFn = function(count){
    if(count < 100) return console.log('得了一等奖')
    return 'successor'
}

const lottery = new Chain(aFn)
const lottery1 = new Chain(bFn)
const lottery2 = new Chain(cFn)
const lottery3 = new Chain(dFn)
lottery.setNextSuccessor(lottery1)
lottery1.setNextSuccessor(lottery2)
lottery2.setNextSuccessor(lottery3)
lottery.passRequest(19)
lottery.passRequest(70)
lottery.passRequest(80)
lottery.passRequest(90)
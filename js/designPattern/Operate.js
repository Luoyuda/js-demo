/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 23:49:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 00:10:37
 * @FilePath: /DesignPatterns/Operate.js
 */
const A = function(){
    return new A.fn.init()
}
A.fn = A.prototype = {
    constructor: A,
    init: function(){
        return this
    },
    length: 2,
    size(){
        return this.length
    },
}
A.fn.init.prototype = A.fn
A.extend = A.fn.extend = function(){
    let i = 1
    let len = arguments.length
    let target = arguments[0]
    if(i == len){
        target = this
        i--
    }
    for(; i < len; i++){
        for (const key in arguments[i]) {
            target[key] = arguments[i][key]
        }
    }
    return target
}
A.fn.extend({
    log(arg){
        console.log(`log -> ${arg}`)
        return this
    }
})
A.extend({
    log(arg){
        console.log(`log -> ${arg}`)
        return this
    }
})

const a = A()
console.log(A().size())
A.prototype.length = 1
console.log(A().size())
console.log(a.size())
A.log(1).log(2)
a.log(1).log(2)

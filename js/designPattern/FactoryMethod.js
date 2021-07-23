/*
 * @Author: xiaohuolong
 * @Date: 2020-08-12 21:59:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-12 23:37:24
 * @FilePath: /DesignPatterns/FactoryMethod.js
 */
const Factory = function (type, content) {
    if(this instanceof Factory){
        return new this[type](content)
    }else{
        return new Factory(type, content)
    }
}
Factory.prototype.A = function(content){
    this.content = content
    this.type = 'A'
}
Factory.prototype.B = function(content){
    this.content = content
    this.type = 'B'
}
Factory.prototype.C = function(content){
    this.content = content
    this.type = 'C'
}

const a = new Factory('A', 'test')
console.log(a)
const b = Factory('B', 'test')
console.log(b)
const c = Factory('C', 'test')
console.log(c)
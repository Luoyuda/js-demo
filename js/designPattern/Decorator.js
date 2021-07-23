/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 18:07:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 20:07:18
 * @FilePath: /DesignPatterns/Decorator.js
 */
const A = function(name) {
    this.name = name
}
A.prototype.getName = function() {
    return this.name
}

const fn = function(name) {
    return `Decorator this.name=${this.name} name=${name}`
}

const decorator = function(obj, fn) {
    const _fn = obj.getName.bind(obj) || function(){}.bind(obj)
    const Fn = function(){
        return fn.bind(this)(_fn())
    }
    obj.getName = Fn.bind(obj)
}

const a = new A('下雨')
const b = new A('夏雨')
console.log(a.getName())
decorator(a, fn)
console.log(a.getName())
console.log(b.getName())
/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 08:23:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-03 20:32:16
 * @FilePath: /js-demo/js/bind.js
 */
/*
创建一个新函数，使用第一个参数作为运行新函数的 this  其他参数作为新函数的入参
    1. 取出入参
    2. 新建一个函数 F() 作为参数返回值
    3. 创建一个 函数 f() f.prototype = this.prototype F.prototype = new f()
    4. 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    5. 函数调用的时候，新传入的参数跟之前提取的参数合并为一个数组
    6. self.apply( this instanceof F ? this : context, arg ) '是否 new 调用', this instanceof fBound"
*/
Function.prototype.newBind = function(){
    if(typeof this !== 'function') throw new Error('no function')
    var context = arguments[0] || window
    var fn = this
    var F = function(){}
    var args = []
    for(let i = 1; i < arguments.length; i++) args.push(arguments[i])
    var bind = function(){
        for(let i = 0; i < arguments.length; i++) args.push(arguments[i])
        context = this instanceof bind ? this : context
        return fn.apply(context, args)
    }
    F.prototype = this.prototype
    bind.prototype = new F()
    return bind
}

var value = 'window'
var foo = {
    value:'foo'
}
function bar(name,age){
    return {
        value: this.value,
        name: name,
        age: age
    }
}
function empty(){
    return {
        value: this.value
    }
}
var bindFoo = empty.newBind(foo,1,2,3,4,5,6) 
var bindFoo2 = bar.newBind(foo,'Curry')
var bindFoo3 = empty.bind(foo,1,2,3,4,5,6) 
var bindFoo4 = bar.bind(foo,'Curry')
console.log(bindFoo())
console.log(bindFoo2(30))
console.log(new bindFoo2(30))

console.log(bindFoo3())
console.log(bindFoo4(30))
console.log(new bindFoo4(30))

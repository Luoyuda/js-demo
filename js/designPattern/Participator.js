/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 23:30:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 23:38:27
 * @FilePath: /DesignPatterns/Participator.js
 */
function curry(fn){
    var slice = [].slice
    var args = slice.call(arguments, 1)
    return function(){
        var addArg = slice.call(arguments)
        var allArg = args.concat(addArg)
        return fn.apply(null, allArg)
    }
}
Function.prototype.unCurry = function(){
    var that = this
    return function(){
        return Function.prototype.call.apply(that, arguments)
    }
}

function add(a, b){
    return a + b
}

console.log(curry(add, 5)(1))
var toString = Object.prototype.toString.unCurry()
console.log(toString({}))
console.log(toString((function(){})))
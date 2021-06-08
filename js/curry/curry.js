/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 18:00:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-03 08:30:01
 * @FilePath: /js-demo/js/curry/curry.js
 */
function curryHelper(fn){
    var args = Array.prototype.splice.call(arguments, 1)
    return function(){
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)))
    }
}

function curry(fn, length){
    length = length || fn.length
    return function(){
        if(arguments.length < length){
            var args = [fn].concat(Array.prototype.slice.call(arguments))
            return curry(curryHelper.apply(this, args), length - arguments.length)
        }else{
            return fn.apply(this, arguments)
        }
    }
}

function curry(fn, args){
    let length = fn.length
    args = args || []
    return function(){
        var _args = args.slice()
        for (var i = 0; i < arguments.length; i++) _args.push(arguments[i])
        if(_args.length < length){
            return curry.call(this, fn, _args)
        }else{
            return fn.apply(this, _args)
        }
    }
}

function curry(fn, args) {
    var length = fn.length
    args = args || []
    return function(){
        var _args = args.slice().concat(Array.prototype.slice.call(arguments))
        if(_args.length < length){
            return curry.call(this, fn, _args)
        }else{
            return fn.apply(this, _args)
        }
    }
}

var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c") )// ["a", "b", "c"]
console.log(fn("a", "b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c")) // ["a", "b", "c"]

var person = [{name: 'kevin', age: 10}, {name: 'daisy', age: 10}]
//不过如果我们有 curry 函数：
var prop = curry(function (key, obj) {
    return obj[key]
});
var names = person.map(prop('name'))
var ages = person.map(prop('age'))
console.log(names)
console.log(ages)
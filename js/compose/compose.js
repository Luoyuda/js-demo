/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 15:39:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-04 11:26:32
 * @FilePath: /js-demo/js/compose/compose.js
 */
function compose(){
    var args = arguments
    var start = args.length
    return function(){
        var result = args[--start].apply(this, arguments)
        while(start--) result = args[start].call(this, result)
        return result
    }
}

function pipe(){
    var args = arguments
    var start = 0
    return function(){
        var result = args[start++].apply(this, arguments)
        while(start < args.length){
            result = args[start++].call(this, result)
        }
        return result
    }
}

function curry(fn, args){
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

// 非 pointfree，因为提到了数据：name
var greet = function(name) {
    return ('hello ' + name).toUpperCase();
}

// pointfree
// 先定义基本运算，这些可以封装起来复用
var toUpperCase = function(x) { return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x; };

var greet1 = compose(console.log, hello, toUpperCase);
var greet2 = pipe(toUpperCase, hello, console.log);
greet1('kevin');
greet2('kevin');

var data = {
    result: "SUCCESS",
    tasks: [
    {id: 104, complete: false,            priority: "high",
                dueDate: "2013-11-29",      username: "Scott",
                title: "Do something",      created: "9/22/2013"},
    {id: 105, complete: false,            priority: "medium",
                dueDate: "2013-11-22",      username: "Lena",
                title: "Do something else", created: "9/22/2013"},
    {id: 107, complete: true,             priority: "high",
                dueDate: "2013-11-22",      username: "Mike",
                title: "Fix the foo",       created: "9/22/2013"},
    {id: 108, complete: false,            priority: "low",
                dueDate: "2013-11-15",      username: "Punam",
                title: "Adjust the bar",    created: "9/25/2013"},
    {id: 110, complete: false,            priority: "medium",
                dueDate: "2013-11-15",      username: "Scott",
                title: "Rename everything", created: "10/2/2013"},
    {id: 112, complete: true,             priority: "high",
                dueDate: "2013-11-27",      username: "Lena",
                title: "Alter all quuxes",  created: "10/5/2013"}
    ]
};

var prop = curry(function(name, obj){
    return obj[name]
})

var propEq = curry(function(name, val, obj){
    return obj[name] === val
})

var filter = curry(function(fn, arr){
    return arr.filter(fn)
})

var pick = curry(function(args, obj){
    var result = {}
    for(let key of args){
        result[key] = obj[key]
    }
    return result
})

var map = curry(function(fn, arr){
    return arr.map(fn)
})

var sortBy = curry(function(fn, arr){
    return arr.sort(function(a, b){
        a = fn(a)
        b = fn(b)
        return a > b ? -1 : 1
    })
})

var getPipe = function(username){
    return pipe(
        prop('tasks'), 
        filter(propEq('username', username)), 
        filter(propEq('complete', false)), 
        sortBy(prop('dueDate')),
        map(pick(['username', 'title'])), 
        console.log
    )(data)
}
var getCompose = function(username){
    return compose(
        console.log,
        map(pick(['username', 'title'])), 
        sortBy(prop('dueDate')),
        filter(propEq('complete', false)), 
        filter(propEq('username', username)), 
        prop('tasks') 
    )(data)
}

getPipe('Scott')
getPipe('Lena')

getCompose('Scott')
getCompose('Lena')
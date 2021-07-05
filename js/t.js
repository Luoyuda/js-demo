/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 10:58:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-05 09:56:57
 * @FilePath: /js-demo/js/t.js
 */
function New(){
    var obj = new Object();
    var Constructor = Array.prototype.shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    var ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}
Function.prototype.newCall = function(){
    var context = arguments[0] || window
    context.fn = this
    var args = Array.prototype.slice.call(arguments, 1)
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}

Function.prototype.newApply = function(){
    var context = arguments[0] || window
    context.fn = this
    var args = arguments[1] || []
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}

Function.prototype.newBind = function(){
    var context = arguments[0] || window
    var fn = this
    var args = Array.prototype.slice.call(arguments, 1)
    var bind = function(){
        args.concat(Array.prototype.slice.call(arguments))
        context = this instanceof bind ? this : context
        return fn.apply(context, args)
    }
    var F = function(){}
    F.prototype = fn.prototype
    bind.prototype = new F()
    return bind
}
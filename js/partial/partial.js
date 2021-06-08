/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 17:37:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-03 18:13:09
 * @FilePath: /js-demo/js/partial/partial.js
 */
var _ = {}
function partial(){
    var fn = arguments[0]
    var args = Array.prototype.slice.call(arguments, 1)
    var bind = function(){
        var position = 0
        _args = args.slice(0)
        var len = _args.length
        for(var i = 0; i < len; i++){
            _args[i] = _args[i] === _ ? arguments[position++] : _args[i]
        }
        while(position < arguments.length) _args.push(arguments[position++])
        return fn.apply(this, _args)
    }
    inherit(fn, bind)
    return bind
}

function inherit(parent, child){
    var F = function(){}
    F.prototype = parent.prototype
    child.prototype = new F()
}

module.exports = {
    partial,
    _
}
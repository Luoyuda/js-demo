/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 10:48:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-01 23:57:46
 * @FilePath: /js-demo/js/unique/unique.js
 */
function unique(array, isSorted, iteratee, context){
    if(typeof isSorted !== 'boolean'){
        context = iteratee
        iteratee = isSorted
        isSorted = false
    }
    if(isSorted == true){
        iteratee = function(value){ return value}
    }else if(typeof iteratee !== 'function'){
        iteratee = function(value){
            value = value instanceof RegExp ? value.toString() : value
            var key = (typeof value) + JSON.stringify(value)
            if(this[key]) return false
            this[key] = true
            return true
        }
    }
    iteratee = iteratee.bind(context || {})
    var result = []
    var seen
    for(let i = 0; i < array.length; i++){
        var value = array[i]
        var computed = iteratee(value, i, array)
        if(isSorted){
            if(!i || seen !== computed) result.push(value)
            seen = value
        }else{
            if(computed) result.push(value)
        }
    }
    return result
}
module.exports = {
    unique
}
/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 20:23:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-03 21:16:59
 * @FilePath: /js-demo/js/memoize/memoize.js
 */
function memoize(func, helper){
    var memoize = function(key){
        var cache = memoize.cache
        var address = '' + (helper ? helper.apply(this, arguments) : key)
        if(!cache.hasOwnProperty(address)) cache[address] = func.apply(this, arguments)
        return cache[address]
    }
    memoize.cache = {}
    return memoize
}

module.exports = {
    memoize
}
/*
 * @Author: xiaohuolong
 * @Date: 2020-08-22 17:48:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-29 15:54:53
 * @FilePath: /DesignPatterns/SMD.js
 */
const F = {}
F.define = function(str, fn){
    let parts = str.split('.')
    let old = parent = this
    let i = len = 0
    if(parts[0] === 'F'){
        parts = parts.slice(1)
    }
    if(parts[0] === 'define' || parts[0] === 'module'){
        return
    }
    for (len=parts.length; i < len; i++) {
        if(typeof parent[parts[i]] === 'undefined'){
            parent[parts[i]] = {}
        }
        old = parent
        parent = parent[parts[i]]
    }
    if(fn){
        old[parts[--i]] = fn()
    }
    return this
}
F.define('a', function(){
    return {
        call(){
            console.log('hello')
            return this
        }
    }
})
F.module = function() {
    let args = [].slice.call(arguments)
    let fn = args.pop()
    let parts = args[0] && args[0] instanceof Array ? args[0] : args
    let modules = []
    let modIDs = ''
    let i = 0
    let iLen = parts.length
    let parent ,j ,jLen
    while(i < iLen) {
        if(typeof parts[i] === 'string') {
            parent = this
            modIDs = parts[i].replace(/^F\./, '').split('.')
            for (j = 0, jLen = modIDs.length; j < jLen; j++) {
                parent = parent[modIDs[j]] || false
            }
            modules.push(parent)
        }else{
            modules.push(parts[i])
        }
        i++
    }
    fn.apply(this, modules)
}
F.define('a.b', function(){
    return {
        call(){
            console.log('b - hello')
        }
    }
})

F.define('c', function(){
    return {
        call(){
            console.log('c - hello')
        }
    }
})
F.a.call().b.call()
F.module(['a', 'a.b', 'c'], function(a, b, c){
    a.call()
    b.call()
    c.call()
})
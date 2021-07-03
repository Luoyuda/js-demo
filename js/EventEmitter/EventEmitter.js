/*
 * @Author: xiaohuolong
 * @Date: 2021-07-02 18:23:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-02 18:37:29
 * @FilePath: /js-demo/js/EventEmitter/EventEmitter.js
 */
// es6
class Event{
    constructor(){
        this.cache = {}
        return this
    }
    on(type, event){
        if(!this.cache[type]) this.cache[type] = []
        if(this.cache[type].indexOf(event) == -1){
            this.cache[type].push(event)
        }
        return this
    }
    off(type, event){
        if(!this.cache[type]) return this
        this.cache[type] = this.cache[type].filter(e => e !== event)
        return this
    }
    once(type, event){
        let _event = function(){
            event.apply(this, arguments)
            this.off(type, _event)
        }
        this.on(type, _event)
        return this
    }
    emit(){
        let type = arguments[0]
        let args = Array.prototype.slice.call(arguments, 1)
        let list = this.cache[type] || []
        for (const event of list) {
            event.apply(this, args)
        }
        return this
    }
}
// es5
function EventEmitter(){
    this.caches = {}
}
EventEmitter.prototype.on = function(type, event){
    if(!this.caches[type]) this.caches[type] = []
    this.caches[type].push(event)
    return this
}
EventEmitter.prototype.off = function(type, event){
    if(!this.caches[type]) return
    this.caches[type] = this.caches[type].filter(item => item !== event)
    return this
}
EventEmitter.prototype.once = function(type, event){
    var _event = function(){
        event.apply(this, arguments)
        this.off(type, _event)
    }
    this.on(type, _event)
    return this
}
EventEmitter.prototype.emit = function(){
    var type = arguments[0]
    if(!this.caches[type]) return
    var args = Array.prototype.slice.call(arguments, 1)
    for(let event of this.caches[type]){
        event.apply(this, args)
    }
    return this
}
// 使用如下
var e = new EventEmitter();
e.on('log', console.log)
e.on('log', console.log)
e.emit('log', 1)
e.emit('log', 2)
e.off('log', console.log)
e.emit('log', 3)
e.once('log', console.log)
e.emit('log', 4)
e.emit('log', 5)
console.log('event')

var ev = new Event();
ev.on('log', console.log)
ev.on('log', console.log)
ev.emit('log', 1)
ev.emit('log', 2)
ev.off('log', console.log)
ev.emit('log', 3)
ev.once('log', console.log)
ev.emit('log', 4)
ev.emit('log', 5)
/*
 * @Author: xiaohuolong
 * @Date: 2020-08-22 16:44:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-22 17:38:03
 * @FilePath: /DesignPatterns/Waiter.js
 */
const Waiter = function(){
    let dfd = []
    let doneArr = []
    let failArr = []
    let slice = Array.prototype.slice
    let that = this
    let Promise = function(){
        this.resolved = false
        this.rejected = false
    }
    Promise.prototype.resolve = function(){
        this.resolved = true
        if(!dfd.length) return
        for (let i = dfd.length - 1; i >= 0; i--) {
            let fn = dfd[i];
            if(fn && !fn.resolved || fn.rejected){
                return
            }
            dfd.splice(i, 1)
        }
        _exec(doneArr)
    }
    Promise.prototype.reject = function(){
        this.rejected = true
        if(!dfd.length) return
        dfd.splice(0)
        _exec(failArr)
    }
    that.Deferred = function(){
        return new Promise()
    }
    function _exec(arr) {
        for (let i = 0; i < arr.length; i++) {
            const fn = arr[i];
            try {
                if(fn) fn()
            } catch (error) {
                
            }
        }
    }
    that.when = function(){
        dfd = slice.call(arguments)
        for (let i = dfd.length - 1; i >= 0; i--) {
            let fn = dfd[i];
            if(!fn || fn.resolved || fn.rejected || !(fn instanceof Promise)){
                dfd.splice(i, 1)
            }            
        }
        return that
    }
    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments))
        return that
    }
    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments))
        return that
    }
}

var waiter = new Waiter()
var first = (function(){
    var dfd = waiter.Deferred()
    setTimeout(() => {
        console.log('first end')
        dfd.resolve()
    }, 1000)
    return dfd
})()
var second = (function(){
    var dfd = waiter.Deferred()
    setTimeout(() => {
        console.log('second end')
        dfd.resolve()
    }, 2000)
    return dfd
})()
waiter.when(first, second).done(function(){
    console.log('success')
},function(){
    console.log('success again')
}).fail(function(){
    console.log('fail')
})
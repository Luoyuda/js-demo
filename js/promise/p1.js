// ES5
var PENDING = 'pending';
var REJECTED = 'rejected';
var FULFILLED = 'fulfilled';
function MyPromise(executor){
    this.status = PENDING
    this.value = null;
    this.reason = null;
    this.onFulfilled = []
    this.onRejected = []
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    try {
        executor(this.resolve, this.reject)
    } catch (error) {
        this.reject(error)
    }
}
MyPromise.prototype.resolve = function(value){
    if(this.status === PENDING){
        this.status = FULFILLED
        this.value = value
        while(this.onFulfilled.length){
            this.onFulfilled.shift()(this.value)
        }
    }
}
MyPromise.prototype.reject = function(reason){
    if(this.status === PENDING){
        this.status = REJECTED
        this.reason = reason
        while(this.onRejected.length){
            this.onRejected.shift()(this.reason)
        }
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected){
    var that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value){ return value }
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason){ throw reason }
    var promise1 = new MyPromise(function(resolve, reject){
        var fulfilled = function(){
            // 没有 queueMicrotask 可以用 setTimeout
            queueMicrotask(function(){
                try {
                    var x = onFulfilled(that.value)
                    resolvePromise(promise1, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        var rejected = function(){
            queueMicrotask(function(){
                try {
                    var x = onRejected(that.reason)
                    resolvePromise(promise1, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if(that.status === FULFILLED){
            fulfilled()
        }else if(that.status === REJECTED){
            rejected()
        }else{
            that.onFulfilled.push(fulfilled)
            that.onRejected.push(rejected)
        }
    })
    return promise1
}
MyPromise.prototype.catch = function(onRejected){
    this.then(null, onRejected)
}
// ES6
// class MyPromise {
//     status = PENDING
//     value = null
//     reason = null
//     onFulfilled = []
//     onRejected = []
//     constructor(executor){
//         try {
//             executor(this.resolve, this.reject)
//         } catch (error) {
//             this.reject(error)
//         }
//     }
//     resolve = value => {
//         if(this.status === PENDING){
//             this.status = FULFILLED
//             this.value = value
//             while(this.onFulfilled.length){
//                 this.onFulfilled.shift()(this.value)
//             }
//         }
//     }
//     reject = reason => {
//         if(this.status === PENDING){
//             this.status = REJECTED
//             this.reason = reason
//             while(this.onRejected.length){
//                 this.onRejected.shift()(this.reason)
//             }
//         }
//     }
//     then(onFulfilled, onRejected){
//         onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
//         onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
//         var promise1 = new MyPromise((resolve, reject) => {
//             var fulfilled = () => {
//                 queueMicrotask(() => {
//                     try {
//                         var x = onFulfilled(this.value)
//                         resolvePromise(promise1, x, resolve, reject)
//                     } catch (error) {
//                         reject(error)
//                     }
//                 })
//             }
//             var rejected = () => {
//                 queueMicrotask(() => {
//                     try {
//                         var x = onRejected(this.reason)
//                         resolvePromise(promise1, x, resolve, reject)
//                     } catch (error) {
//                         reject(error)
//                     }
//                 })
//             }
//             if(this.status === FULFILLED){
//                 fulfilled()
//             }else if(this.status === REJECTED){
//                 rejected()
//             }else{
//                 this.onFulfilled.push(fulfilled)
//                 this.onRejected.push(rejected)
//             }
//         })
//         return promise1
//     }
//     catch(onRejected){
//         this.then(null, onRejected)
//     }
// }

function resolvePromise(promise, x, resolve, reject){
    if(promise === x) return reject(new TypeError('promise'))
    if(typeof x === 'object' || typeof x === 'function'){
        if(x === null) return resolve(x)
        var then
        try {
            then = x.then
        } catch (error) {
            reject(error)
        }
        if(typeof then === 'function'){
            var caller = false
            try {
                then.call(x, y => {
                    if(caller) return
                    caller = true
                    resolvePromise(promise, y, resolve, reject)
                }, r => {
                    if(caller) return
                    caller = true
                    reject(r)
                })
            } catch (error) {
                if(caller) return
                caller = true
                reject(error)
            }
        }else{
            resolve(x)
        }
    }else{
        resolve(x)
    }
}


// 测试用
MyPromise.deferred = function(){
	var result = {}
	result.promise = new MyPromise(function(resolve, reject){
		result.resolve = resolve
		result.reject = reject
	})
	return result
}

module.exports = MyPromise
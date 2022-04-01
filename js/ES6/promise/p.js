const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'
class MyPromise {
    status = PENDING
    value = null
    reason = null
    onFulfilledCallbacks = []
    onRejectedCallbacks = []
    /**
     * 构造函数
     * @param {function} executor 
     */
    constructor(executor){
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    /**
     * @param {any} value 
     */
    resolve = value => {
        if(this.status === PENDING){
            this.status = FULFILLED
            this.value = value
            while(this.onFulfilledCallbacks.length){
                this.onFulfilledCallbacks.shift()(this.value)
            }
        }
    }
    /**
     * @param {any} reason 
     */
    reject = reason => {
        if(this.status === PENDING){
            this.status = REJECTED
            this.reason = reason
            while(this.onRejectedCallbacks.length){
                this.onRejectedCallbacks.shift()(this.reason)
            }
        }
    }
    /**
     * @param {any} onFulfilled 
     * @param {any} onRejected 
     */
    then(onFulfilled, onRejected){
        let realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        let realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise1 = new MyPromise((resolve, reject) => {
            const fulfilled = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        resolvePromise(promise1, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejected = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise1, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === FULFILLED){
                fulfilled()
            }else if(this.status === REJECTED){
                rejected()
            }else{
                this.onFulfilledCallbacks.push(fulfilled)
                this.onRejectedCallbacks.push(rejected)
            }
        })
        return promise1
    }
    /**
     * @param {any} onRejected 
     */
    catch(onRejected){
        this.then(null, onRejected)
    }
}
/**
 * 辅助函数
 * @param {MyPromise} promise 
 * @param {any} x 
 * @param {function} resolve 
 * @param {function} reject 
 */
function resolvePromise(promise, x, resolve, reject){
    if(promise === x) return reject(new TypeError('promise'))
    if(typeof x === 'object' || typeof x === 'function'){
        if(x == null) return resolve(x)
        let then
        try {
            then = x.then
        } catch (error) {
            reject(error)
        }
        if(typeof then === 'function'){
            let caller = false
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
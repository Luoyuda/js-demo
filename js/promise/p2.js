/*
 * @Author: xiaohuolong
 * @Date: 2021-07-03 20:47:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-05 17:09:43
 * @FilePath: /js-demo/js/promise/p2.js
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    status = PENDING
    value = null
    reason = null
    onFulfilled = []
    onRejected = []
    constructor(executor){
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    resolve = value => {
        if(this.status === PENDING){
            this.value = value
            this.status = FULFILLED
            while(this.onFulfilled.length){
                this.onFulfilled.shift()(this.value)
            }
        }
    }
    reject = reason => {
        if(this.status === PENDING){
            this.reason = reason
            this.status = REJECTED
            while (this.onRejected.length) {
                this.onRejected.shift()(this.reason)
            }
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
        let promise = new MyPromise((resolve, reject) => {
            let f = () => {
                queueMicrotask(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            let r = () => {
                queueMicrotask(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === FULFILLED){
                f()
            }else if(this.status === REJECTED){
                r()
            }else{
                this.onFulfilled.push(f)
                this.onRejected.push(r)
            }
        })
        return promise
    }
    catch(onRejected){
        return this.then(null, onRejected)
    }
}

function resolvePromise(promise, x, resolve, reject){
    if(promise === x) return reject(new TypeError('promise'))
    if(typeof x === 'object' || typeof x === 'function'){
        if(x === null) return resolve(x)
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
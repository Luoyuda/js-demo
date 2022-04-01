/*
 * @Author: xiaohuolong
 * @Date: 2021-05-27 21:18:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-29 09:45:23
 * @FilePath: /js-demo/js/promise/Promise.js
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
   status = PENDING
   value = null
   reason = null
   onFulfilledCallbacks = []
   onRejectedCallbacks = []
   constructor(executor){
      try {
         executor(this.resolve, this.reject)
      } catch (error) {
         this.reject(error)
      }
   }
   resolve = value => {
      if(this.status === PENDING){
         this.status = FULFILLED
         this.value = value
         while(this.onFulfilledCallbacks.length){
            this.onFulfilledCallbacks.shift()(this.value)
         }
      }
   }
   reject = reason => {
      if(this.status === PENDING){
         this.status = REJECTED
         this.reason = reason
         while(this.onRejectedCallbacks.length){
            this.onRejectedCallbacks.shift()(this.reason)
         }
      }
   }
   then(onFulfilled, onRejected){
      const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
      const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
      const promise1 = new MyPromise((resolve, reject) => {
         const fulfilledCallback = () => {
            queueMicrotask(() => {
               try {
                  let x = realOnFulfilled(this.value)
                  resolvePromise(promise1, x, resolve, reject)
               } catch (error) {
                  reject(error)
               }
            })
         }
         const rejectCallback = () => {
            queueMicrotask(() => {
               try {
                  let x = realOnRejected(this.reason)
                  resolvePromise(promise1, x, resolve, reject)
               } catch (error) {
                  reject(error)
               }
            })
         }
         if(this.status === FULFILLED){
            fulfilledCallback()
         }else if(this.status === REJECTED){
            rejectCallback()
         }else{
            this.onFulfilledCallbacks.push(fulfilledCallback)
            this.onRejectedCallbacks.push(rejectCallback)
         }
      })
      return promise1
   }
   catch(onRejected){
      this.then(null, onRejected)
   }
   finally(fn){
      return this.then(value => {
         return MyPromise.resolve(fn()).then(() => {
            return value
         })
      }, reason => {
         return MyPromise.resolve(fn()).then(() => {
            return reason
         })
      })
   }
   static resolve(p){
      if(p instanceof MyPromise){
         return p
      }
      return new MyPromise((resolve, reject) => {
         resolve(p)
      })
   }
   static reject(p){
      return new MyPromise((resolve, reject) => {
         reject(p)
      })
   }
   static all(promiseList){
      return new MyPromise((resolve, reject) => {
         let count = 0
         let length = promiseList.length
         let result = []
         if(length === 0) return resolve(result)
         for (let i = 0; i < length; i++) {
            MyPromise.resolve(promiseList[i]).then(value => {
               count++
               result[i] = value
               if(count === length) resolve(result)
            }, reason => {
               reject(reason)
            })
         }
      })
   }
   static race(promiseList){
      return new MyPromise((resolve, reject) => {
         let length = promiseList.length
         if(length === 0) return resolve()
         for (let i = 0; i < length; i++) {
            MyPromise.resolve(promiseList[i]).then(value => {
               return resolve(value)
            }, reason => {
               return reject(reason)
            })
         }
      })
   }
   static allSettled(promiseList){
      return MyPromise((resolve, reject) => {
         let length = promiseList.length
         let count = 0
         let result = []
         if(length === 0) return resolve(result)
         for (let i = 0; i < length; i++) {
            MyPromise.resolve(promiseList[i]).then(value => {
               count++
               result[i] = {
                  value,
                  status: FULFILLED
               }
               if(length == count) return resolve(result)
            }, reason => {
               count++
               result[i] = {
                  reason,
                  status: REJECTED
               }
               if(length == count) return resolve(result)
            })
         }
      })
   }
}

function resolvePromise(promise, x, resolve, reject){
   if(promise === x){
      return reject(new TypeError('The promise and the return value are the same'));
   }
   if(typeof x === 'object' || typeof x === 'function'){
      if(x === null) return resolve(x)
      let then
      try {
         then = x.then
      } catch (error) {
         reject(error)
      }
      if(typeof then === 'function'){
         let called = false
         try {
            then.call(x, y => {
               if(called) return
               called = true
               resolvePromise(promise, y, resolve, reject)
            }, r => {
               if(called) return
               called = true
               reject(r)
            })
         } catch (error) {
            if(called) return
            called = true
            reject(error)
         }
      }else{
         resolve(x)
      }
   }else{
      resolve(x)
   }
}

MyPromise.deferred = function () {
   var result = {};
   result.promise = new MyPromise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
   });
   return result;
}


module.exports = MyPromise



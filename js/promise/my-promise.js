// 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	// 状态: 初始状态为 pending
	status = PENDING
	// 值
	value = null
	// 原因
	reason = null
	// 执行 onFulfilled 的队列
	onFulfilledCallbacks = []
	// 执行 onRejected 的队列
	onRejectedCallbacks = []
	// 构造方法
	constructor(executor){
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}
	resolve = value => {
		// 判断是否状态处于等待状态
		if(this.status === PENDING){
			// 改变状态
			this.status = FULFILLED
			// 赋值
			this.value = value
			// 循环调用
			while(this.onFulfilledCallbacks.length){
				this.onFulfilledCallbacks.shift()(this.value)
			}
		}
	}
	reject = reason => {
		// 判断是否状态处于等待状态
		if(this.status === PENDING){
			// 更改状态
			this.status = REJECTED
			// 赋值原因
			this.reason = reason
			// 循环调用
			while(this.onRejectedCallbacks.length){
				this.onRejectedCallbacks.shift()(this.reason)
			}
		}
	}
	then(onFulfilled, onRejected){
		// 可选参数
		const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
		const promise1 = new MyPromise((resolve, reject) => {
			// 创建一个微任务执行完成的函数
			const fulfilledMicrotask = () => {
				queueMicrotask(() => {
					try{
						let x = realOnFulfilled(this.value)
						resolvePromise(promise1, x, resolve, reject)
					}catch (error) {
						reject(error)
					}
				})
			}
			// 创建一个微任务执行拒绝的函数
			const rejectMicrotask = () => {
				queueMicrotask(() => {
					try{
						let x = realOnRejected(this.reason)
						resolvePromise(promise1, x, resolve, reject)
					}catch (error) {
						reject(error)
					}
				})
			}
			// 状态确定后直接执行
			if(this.status == FULFILLED){
				fulfilledMicrotask()
			}else if(this.status == REJECTED){
				rejectMicrotask()
			}else{
				// 异步，加入队列
				this.onFulfilledCallbacks.push(fulfilledMicrotask)
				this.onRejectedCallbacks.push(rejectMicrotask)
			}
		})
		// then 返回一个新的 promise
		return promise1
	}
	// catch 方法
	catch (onRejected) {
		this.then(null, onRejected)
	}
	// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
	finally(fn) {
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
	// 有时需要将现有对象转为 Promise 对象，状态为 fulfilled
	static resolve(parameter){
		// 如果传入一个 promise 对象，直接返回
		if(parameter instanceof MyPromise){
			return parameter
		}
		return new MyPromise(resolve => {
			resolve(parameter)
		})
	}
	// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected
	static reject(reason){
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}
	// all 方法，全部成功的时候返回
	static all(promiseList){
		return new MyPromise((resolve, reject) => {
			let count = 0
			let length = promiseList.length
			let result = []
			if(length === 0) return resolve(result)
			for(let i = 0; i < length; i++){
				MyPromise.resolve(promiseList[i]).then(value => {
					count++
					results[i] = value
					// 全部成功
					if(count === length) resolve(result)
				}, reason => {
					// 一次失败
					reject(reason)
				})
			}
		})
	}
	// race 方法 只有一次成功就返回
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
	// 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，
	static allSettled(promiseList){
		return new MyPromise((resolve, reject) => {
			let count = 0
			let length = promiseList.length
			let result = []
			if(length === 0) return resolve(result)
			for (let i = 0; i < length; i++) {
				MyPromise.resolve(promiseList[i]).then(value => {
					count++;
					result[i] = {
						value,
						status: FULFILLED
					}
					if(count === length) resolve(result)
				}, reason => {
					count++;
					result[i] = {
						reason,
						status: REJECTED
					}
					if(count === length) resolve(result)
				})
			}
		})
	}
}

function resolvePromise(promise, x, resolve, reject){
	if(x === promise){
		// 循环调用，直接报错
		return reject(new TypeError('The promise and the return value are the same'));
	}
	if(typeof x === 'function' || typeof x === 'object'){
		// null 直接返回
		if(x === null) return resolve(x)

		let then
		try {
			then = x.then
		} catch (error) {
			// 不存在直接拒绝
			return reject(error)
		}
		// 如果对象上面存在 then 方法
		if(typeof then === 'function'){
			let called = false
			try {
				then.call(x, y => {
					// 执行多次忽略
					if(called) return
					called = true
					// 接着执行
					resolvePromise(promise, y, resolve, reject)
				}, r => {
					// 执行多次忽略
					if(called) return
					called = true
					reject(r)
				})
			} catch (error) {
				// 
				if(called) return
				called = true
				reject(error)
			}
		}else{
			// then 不是函数
			resolve(x)
		}
	}else{
		// 如果 x 不为对象或者函数，直接用 x 为参数执行 promise
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
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
	status = PENDING
	value = null
	reason = null
	onfulfilled = []
	onrejected = []
	constructor(executor){
		this.resolve = this.resolve.bind(this)
		this.reject = this.reject.bind(this)
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}
	resolve(value){
		if(this.status === PENDING){
			this.status = FULFILLED
			this.value = value
			while(this.onfulfilled.length) this.onfulfilled.shift()(this.value)
		}
	}
	reject(reason){
		if(this.status === PENDING){
			this.status = REJECTED
			this.reason = reason
			while(this.onrejected.length) this.onrejected.shift()(this.reason)
		}
	}
	catch(onRejected){
		return this.then(null, onRejected)
	}
	then(onfulfilled, onrejected){
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
		onrejected = typeof onrejected === 'function' ? onrejected : reason => { throw reason }
		const promise = new MyPromise((resolve, reject) => {
			const f  = () => {
				queueMicrotask(() => {
					try {
						const x = onfulfilled(this.value);
						resolvePromise(promise, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			const r  = () => {
				queueMicrotask(() => {
					try {
						const x = onrejected(this.reason);
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
				this.onfulfilled.push(f)
				this.onrejected.push(r)
			}
		})
		return promise
	}
}
function resolvePromise(promise, x, resolve, reject) {
	if(promise === x) return reject(new TypeError('promise'))
	if(x && (typeof x === 'object' || typeof x === 'function')){
		let then
		try {
			then = x.then
		} catch (error) {
			return reject(error)
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
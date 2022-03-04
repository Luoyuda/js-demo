const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise{
	status = PENDING
	value = null
	reason = null
	onFulfilled = []
	onRejected = []
	constructor(exec){
		try {
			exec(v => {
				resolvePromise(this, v)
			}, r => {
				rejectedPromise(this, r)
			})
		} catch (error) {
			rejectedPromise(this, error)
		}
	}
	then(onFulfilled, onRejected){
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
		onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
		const p1 = this
		const p2 = new MyPromise(() => {})
		const f = () => {
			queueMicrotask(() => {
				try {
					const x = onFulfilled(p1.value)
					resolvePromise(p2, x)
				} catch (error) {
					rejectedPromise(p2, error)
				}
			})
		}
		const r = () => {
			queueMicrotask(() => {
				try {
					const x = onRejected(p1.reason)
					resolvePromise(p2, x)
				} catch (error) {
					rejectedPromise(p2, error)
				}
			})
		}
		if(p1.status === FULFILLED){
			f()
		}else if(p1.status === REJECTED){
			r()
		}else{
			p1.onFulfilled.push(f)
			p1.onRejected.push(r)
		}
		return p2
	}
	catch(onRejected){
		return this.then(null, onRejected)
	}
}
function runCbs(cbs, x){
	cbs.forEach(cb => cb(x))
}
function fulfilledPromise(p, v){
	if(p.status !== PENDING) return
	p.status = FULFILLED
	p.value = v
	runCbs(p.onFulfilled, v)
}
function rejectedPromise(p, r){
	if(p.status !== PENDING) return
	p.status = REJECTED
	p.reason = r
	runCbs(p.onRejected, r)
}
function resolvePromise(p, x){
	if(p === x) return rejectedPromise(p, new TypeError(''))
	if(x instanceof MyPromise){
		if(x.status === FULFILLED){
			fulfilledPromise(p, x.value)
		}else if(x.status === REJECTED){
			rejectedPromise(p, x.reason)
		}else{
			x.then(() => {
				resolvePromise(p, x.value)
			}, () => {
				rejectedPromise(p, x.reason)
			})
		}
	}else if(x && (typeof x === 'object' || typeof x === 'function')){
		let then
		try {
			then = x.then
		} catch (error) {
			rejectedPromise(p, error)
		}
		if(typeof then === 'function'){
			let done = false
			try {
				then.call(x, y => {
					if(done) return
					done = true
					resolvePromise(p, y)
				}, r => {
					if(done) return
					done = true
					rejectedPromise(p, r)
				})
			} catch (error) {
				if(done) return
				done = true
				rejectedPromise(p, error)
			}
		}else{
			fulfilledPromise(p, x)
		}
	}else{
		fulfilledPromise(p, x)
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
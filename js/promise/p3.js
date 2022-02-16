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
		try {
			executor(value => {
        resolvePromise(this, value)
      }, reason => {
        rejectedPromise(this, reason)
      })
		} catch (error) {
      rejectedPromise(this, error)
		}
	}
	catch(onRejected){
		return this.then(null, onRejected)
	}
	then(onfulfilled, onrejected){
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
		onrejected = typeof onrejected === 'function' ? onrejected : reason => { throw reason }
		const promise1 = this
    const promise2 = new MyPromise(() => {})
    const f = () => {
      queueMicrotask(() => {
        try {
          const x = onfulfilled(promise1.value)
          resolvePromise(promise2, x)
        } catch (error) {
          rejectedPromise(promise2, error)
        }
      })
    } 
    const r = () => {
      queueMicrotask(() => {
        try {
          const x = onrejected(promise1.reason)
          resolvePromise(promise2, x)
        } catch (error) {
          rejectedPromise(promise2, error)
        }
      })
    }
    if(promise1.status === FULFILLED){
      f()
    }else if(promise1.status === REJECTED){
      r()
    }else {
      promise1.onfulfilled.push(f)
      promise1.onrejected.push(r)
    }
		return promise2
	}
  static resolve (p) {
    if(p instanceof MyPromise) return p
    return new MyPromise(res => {
      res(p)
    })
  }
}
function runCbs(cbs, value){
  cbs.forEach(cb => cb(value));
}
function fulfilledPromise(promise, value){
  if(promise.status !== PENDING) return
  promise.status = FULFILLED
  promise.value = value
  runCbs(promise.onfulfilled, value)
}
function rejectedPromise(promise, reason){
  if(promise.status !== PENDING) return
  promise.status = REJECTED
  promise.reason = reason
  runCbs(promise.onrejected, reason)
}
function resolvePromise(promise, x) {
  if(promise === x) return rejectedPromise(promise, new TypeError("same"))
	if(x instanceof MyPromise){
    if(x.status === FULFILLED){
      fulfilledPromise(promise, x.value)
    }else if (x.status === REJECTED){
      rejectedPromise(promise, x.reason)
    }else{
      x.then(() => {
        fulfilledPromise(promise, x.value)
      }, () => {
        rejectedPromise(promise, x.reason)
      })
    }
  }
  if(x && (typeof x === 'object' || typeof x === 'function')){
    let then
    try {
      then = x.then
    } catch (error) {
      rejectedPromise(promise, error)
    }
    if(typeof then === 'function'){
      let done = false
      try {
        then.call(x, y => {
          if(done) return 
          done = true
          resolvePromise(promise, y)
        }, r => {
          if(done) return 
          done = true
          rejectedPromise(promise, r)
        })
      } catch (error) {
        if(done) return 
        done = true
        rejectedPromise(promise, error)
      }
    }else{
      fulfilledPromise(promise, x)
    }
  }else{
    fulfilledPromise(promise, x)
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
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  status = PENDING
  reason = null
  value = null
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
      rejectedPromise(this, r)
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
    if(p1.status === PENDING){
      p1.onFulfilled.push(f)
      p1.onRejected.push(r)
    }else if(p1.status === REJECTED){
      r()
    }else if(p1.status === FULFILLED){
      f()
    }
    return p2
  }
  catch(onRejected){
    return this.then(null, onRejected)
  }
}
const runCbs = (cbs, value) => cbs.forEach(cb => cb(value))
const rejectedPromise = (p, reason) => {
  if(p.status !== PENDING) return 
  p.status = REJECTED
  p.reason = reason
  runCbs(p.onRejected, reason)
}
const fulfilledPromise = (p, value) => {
  if(p.status !== PENDING) return
  p.value = value
  p.status = FULFILLED
  runCbs(p.onFulfilled, value)
}
const resolvePromise = (p, x) => {
  if(p === x) return rejectedPromise(p, new TypeError('same'))
  if(x instanceof MyPromise){
    if(x.status === PENDING){
      x.then(v => resolvePromise(p, v), r => rejectedPromise(p, r))
    }else if(x.status === FULFILLED){
      fulfilledPromise(p, x.value)
    }else if(x.status === REJECTED){
      rejectedPromise(p, x.reason)
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
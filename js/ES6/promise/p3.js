const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  status = PENDING
  value = null
  reason = null
  onFulfilled = []
  onRejected = []
  constructor(executor) {
    try {
      executor(
        (value) => {
          resolvePromise(this, value)
        },
        (reason) => {
          rejectedPromise(this, reason)
        }
      )
    } catch (error) {
      rejectedPromise(this, error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled !== 'function' ? (val) => val : onFulfilled
    onRejected =
      typeof onRejected !== 'function'
        ? (reason) => {
            throw reason
          }
        : onRejected
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
    if (p1.status === PENDING) {
      p1.onFulfilled.push(f)
      p1.onRejected.push(r)
    } else if (p1.status === REJECTED) {
      r()
    } else if (p1.status === FULFILLED) {
      f()
    }
    return p2
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}
function runCbs(cbs, val) {
  cbs.forEach((cb) => cb(val))
}
function fulfilledPromise(p, val) {
  if (p.status !== PENDING) return
  p.status = FULFILLED
  p.value = val
  runCbs(p.onFulfilled, val)
}
function rejectedPromise(p, reason) {
  if (p.status !== PENDING) return
  p.status = REJECTED
  p.reason = reason
  runCbs(p.onRejected, reason)
}
function resolvePromise(p, x) {
  if (p === x) return rejectedPromise(p, new TypeError('same'))
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(
        (val) => {
          resolvePromise(p, val)
        },
        (reason) => {
          rejectedPromise(p, reason)
        }
      )
    } else if (x.status === FULFILLED) {
      fulfilledPromise(p, x.value)
    } else if (x.status === REJECTED) {
      rejectedPromise(p, x.reason)
    }
  } else if (x && (typeof x === 'object' || typeof x === 'function')) {
    let then
    try {
      then = x.then
    } catch (error) {
      rejectedPromise(p, error)
    }
    if (typeof then === 'function') {
      let done = false
      try {
        then.call(
          x,
          (y) => {
            if (done) return
            done = true
            resolvePromise(p, y)
          },
          (error) => {
            if (done) return
            done = true
            rejectedPromise(p, error)
          }
        )
      } catch (error) {
        if (done) return
        done = true
        rejectedPromise(p, error)
      }
    } else {
      fulfilledPromise(p, x)
    }
  } else {
    fulfilledPromise(p, x)
  }
}
// 测试用
MyPromise.deferred = function () {
  var result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise

// 如何快速写一个 Promise
var MyPromise = (function() {
  // 1. 三种状态
  var PENDING = 'pending';
  var FULFILLED = 'fulfilled';
  var REJECTED = 'rejected';
  /**
   * 2. `Promise constructor` 是一个函数，通过 `new` 操作符调用，接受一个立即执行的函数作为参数
   * @param {function} executor 
   * @returns Promise
   */
  function _Promise(executor){
    var p = this
    // 3. 初始化状态，成功，失败异步队列
    p.status = PENDING
    p.value = null
    p.reason = null
    p.onFulfilled = []
    p.onRejected = []
    try {
      // 4. 立即执行这个函数，并给这个函数传入两个入参(resolve, reject)用于改变 promise 状态
      executor(function(value){
        // 5. resolvePromise 通过此方法接着解决 promise
        resolvePromise(p, value)
      }, function(reason){
        rejectPromise(p, reason)
      })
    } catch (error) {
      rejectPromise(p, error)
    }
    // 返回一个 Promise 实例
    return p
  }
  /**
   * 6. then 方法接受两个回调方法，并返回一个新的 promise 对象
   * @param {function} onFulfilled 成功回调
   * @param {function} onRejected 失败回调
   * @returns promise
   */
  _Promise.prototype.then = function(onFulfilled, onRejected){
    // 7. 需要对回调方法进行兼容
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value){ return value }
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason){ throw reason }
    // 8. 当前的 `promise` 实例
    var p1 = this
    // 9. 返回一个新的 `promise` 实例
    var p2 = new MyPromise(function(){})
    // 10. 注册微任务事件
    function fulfilled(){
      // 注册一个微任务
      queueMicrotask(function(){
        try {
          var x = onFulfilled(p1.value)
          // 这里得注意要使用 p2
          resolvePromise(p2, x)
        } catch (error) {
          rejectPromise(p2, error)
        }
      })
    }
    function rejected(){
      queueMicrotask(function(){
        try {
          var x = onRejected(p1.reason)
          resolvePromise(p2, x)
        } catch (error) {
          rejectPromise(p2, error)
        }
      })
    }
    // 判断状态
    var status = p1.status
    if(status === PENDING){
      // 推入队列中
      p1.onFulfilled.push(fulfilled)
      p1.onRejected.push(rejected)
    }else if(status === FULFILLED){
      // 立即执行
      fulfilled()
    }else if(status === REJECTED){
      // 立即执行
      rejected()
    }
    // 返回一个新的 promise 实例
    return p2
  }
  /**
   * 15. 补一个 runCb 方法执行回调函数
   * @param {function[]} cbs 
   * @param {any} val 
   */
  function runCbs(cbs, val){
    cbs.forEach(function(cb){
      cb(val)
    })
  }
  // 11. 接着来写三个处理promise状态的函数
  /**
   * 16. 失败的 promise 处理方法
   * @param {promise} p promise 实例
   * @param {any} reason 失败原因
   * @returns 
   */
  function rejectPromise(p, reason){
    // 12. rejected 的时候得这么做呢？首先判断当前状态是否为 PENDING
    if(p.status !== PENDING) return
    // 13. 更改状态，保存 reason
    p.status = REJECTED
    p.reason = reason
    // 14. 依次执行 onRejected 中的回调方法
    runCbs(p.onRejected, p.reason)
  }
  /**
   * 17. 成功的 promise 处理方法
   * @param {promise} p promise 实例
   * @param {any} value 
   */
  function fulfillPromise(p, value){
    // 18. 同样的，判断状态，更改状态，保存值，执行函数
    if(p.status !== PENDING) return
    p.status = FULFILLED
    p.value = value
    runCbs(p.onFulfilled, p.value)
  }
  /**
   * promise resolve  程序，核心
   * @param {promise} p 需要被解决的 promise 实例
   * @param {any} x 
   */
  function resolvePromise(p, x){
    // 19. 禁止递归调用
    if(p === x) return rejectPromise(p, new TypeError('same'))
    // 20. 如果 x 是一个 promise 实例的情况
    if(x instanceof MyPromise){
      // 21. 如果 x 还是一个等待中的状态，往 then 增加回调处理
      if(x.status === PENDING){
        x.then(function(value){
          resolvePromise(p, value)
        }, function(reason){
          rejectPromise(p, reason)
        })
      }else if(x.status === FULFILLED){
        // 22. 如果是一个已成功的状态，直接使用成功的处理方法
        fulfillPromise(p, x.value)
      }else if(x.status === REJECTED){
        // 23. 如果是一个已失败的状态，直接使用失败的处理方法
        rejectPromise(p, x.reason)
      }
    }else if(x && (typeof x === 'function' || typeof x === 'object')){
      // 25. 这里是处理 thenable 的情况
      var then
      try {
        then = x.then
      } catch (error) {
        // 26. 报错则直接失败
        rejectPromise(p, error)
      }
      if(typeof then === 'function'){
        // 这里需要只调用一次
        var done = false
        try {
          // 调用 then
          then.call(x, function(y){
            if(done) return
            done = true
            // 接着解决
            resolvePromise(p, y)
          }, function(reason){
            if(done) return
            done = true
            rejectPromise(p, reason)
          })
        } catch (error) {
          if(done) return
          done = true
          rejectPromise(p, error)
        }
      }else{
        // 27. 如果不是一个函数,则直接成功
        fulfillPromise(p, x)
      }
    }else{
      // 24. 其他情况都算成功
      fulfillPromise(p, x)
    }
  }
  return _Promise
})();

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
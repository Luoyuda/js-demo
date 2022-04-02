(() => {
  /**
   * finally() 方法返回一个Promise。在promise结束时
   * 无论结果是fulfilled或者是rejected，都会执行指定的回调函数
   * @param {function} fn 
   * @returns promise
   */
  Promise.prototype.finally = function (fn) {
    return this.then(function (value) {
      return Promise.resolve(fn()).then(function () {
        return value
      })
    }, function (reason){
      return Promise.reject(fn()).then(function () {
        return reason
      })
    }) 
  }
  // ES6
  Promise.prototype.finally = function (fn) {
    return this.then(value => {
      return Promise.resolve(fn()).then(() => value)
    }, reason => {
      return Promise.reject(fn()).then(() => reason)
    })
  }
  var load = false
  new Promise(function (resolve, reject) {
    load = true
    setTimeout(function () {
      console.log('in pending: ' + load) // in pending: true
      if(Math.random() > 0.5){
        resolve()
      }else{
        reject()
      }
    }, 100)
  }).then(function(){
    console.log('in fulfilled: ' + load) // in fulfilled: true
  }).catch(function(){
    console.log('in rejected: ' + load) // in rejected: true
  }).finally(function () {
    load = false
    console.log('in finally: ' + load) // in finally: false
  })
});

(() => {
  /**
   * catch() 方法返回一个Promise，并且处理拒绝的情况。
   * @param {function} fn 
   * @returns promise
   */
  Promise.prototype.catch = function (fn) {
    return this.then(null, fn)
  }
  Promise.reject().catch(function(){
    console.log('in catch')
  })
});

(() => {
  /**
   * Promise.reject()方法返回一个带有拒绝原因的Promise对象。
   * @param {any} reason 
   */
  Promise.reject = function (reason) {
    return new Promise(function(resolve, reject){
      var fn = function () {
        reject(reason)
      }
      if(reason instanceof Promise){
        reason.then(fn, fn)
      }else {
        fn()
      }
    })
  }
  // ES6
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      const fn = () => reject(reason)
      reason instanceof Promise ? reason.then(fn, fn) : fn()
    })
  }
  Promise.reject(new Promise(res => {
    console.log('in promise') // in promise
    res(2)
  })).then(v => console.log('in then ' + v))
  .catch(v => console.log('in catch ', v)) // in catch  Promise { 2 }
});

(() => {
  /**
   * Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象
   * 如果这个值是一个 promise ，那么将返回这个 promise 
   * @param {any} reason 
   */
  Promise.resolve = function (value) {
    if(value instanceof Promise) return value
    return new Promise(function(resolve, reject){
      resolve(value)
    })
  }
  // ES6
  Promise.resolve = function (value) {
    return value instanceof Promise ? value :
      new Promise(resolve => resolve(value))
  }
  Promise.resolve(new Promise((res, rej) => {
    console.log('in promise') // in promise
    res(2)
  })).then(v => console.log('in then ' + v)) // in then 2
  .catch(v => console.log('in catch ', v))
  Promise.resolve(new Promise((res, rej) => {
    console.log('in promise') // in promise
    rej(2)
  })).then(v => console.log('in then ' + v))
  .catch(v => console.log('in catch ', v)) // in catch 2
});

(() => {
  /**
   * Promise.all() 方法接收一个 promise 的 iterable 类型的输入
   * 并且只返回一个Promise实例
   * resolve([value,...])
   * reject(firstReject)
   * @param {*} iterable 
   * @returns promise
   */
  Promise.all = function (iterable) {
    return new Promise(function(resolve, reject){
      var iteratee = iterable[Symbol.iterator]()
      var len = 0
      var i = 0
      var res = null
      var result = []
      while (true){
        res = iteratee.next()
        if(res.done) break
        !(function(j){
          len++
          var val = !(res.value instanceof Promise) ?  Promise.resolve(res.value) : res.value
          val.then(function(value){
            result[j] = value
            i++
            if(len === i && res.done) resolve(result)
          }, function(reason){
            reject(reason)
          })
        })(len)
      }
    })
  };
  // ES6
  Promise.all = function (iterable) {
    return new Promise((resolve, reject) => {
      const promiseList = [...iterable] // 转换可迭代对象为数组
      const result = []
      let j = 0
      let len = promiseList.length
      promiseList.forEach((val, i) => {
        val = !(val instanceof Promise) ? Promise.resolve(val) : val
        val.then(value => {
          result[i] = value
          j++
          if(len <= j) resolve(result)
        }, reason => reject(reason))
      })
    })
  };
  [
    new Map([[Promise.resolve(1), Promise.resolve(2)]]),
    new Set([Promise.resolve(1), Promise.resolve(2)]), 
    [Promise.resolve(1), Promise.resolve(2)],
    new Set([Promise.reject(1), Promise.resolve(2)]), 
    [Promise.reject(1), Promise.resolve(2)],
    [1, '1', true, false, null, undefined, {}, function(){}, Symbol(), Promise.resolve(2)]
  ].forEach(item => {
    Promise.all(item).then(v => {
      console.log(v)
    }).catch(r => {
      console.log('in catch ' + r)
    })
  })
});

(() => {
  /**
   * Promise.any() 方法接收一个 promise 的 iterable 类型的输入
   * 只要其中的一个 promise 成功，就返回那个已经成功的 promise 
   * resolve([value,...])
   * reject(firstReject)
   * @param {*} iterable 
   * @returns promise
   */
  Promise.any = function (iterable) {
    return new Promise(function(resolve, reject){
      var iteratee = iterable[Symbol.iterator]()
      var res = null
      var len = 0
      var i = 0
      while (true){
        res = iteratee.next()
        if(res.done) break
        len++
        var val = !(res.value instanceof Promise) ? Promise.resolve(res.value) : res.value
        val.then(function(value){
          i++
          resolve(value)
        }, function(reason){
          i++ 
          if(i >= len && res.done){
            reject(reason)
          }
        })
      }
    })
  };
  // ES6
  Promise.any = function (iterable) {
    return new Promise((resolve, reject) => {
      const promiseList = [...iterable]
      const len = promiseList.length
      let i = 0
      promiseList.forEach(val => {
        val = !(val instanceof Promise) ? Promise.resolve(val) : val
        val.then(value => {
          i++
          resolve(value)
        }, reason => {
          i++ 
          if(i >= len){
            reject(reason)
          }
        })
      })
    })
  };
  [
    new Map([[Promise.resolve(1), Promise.resolve(2)]]),
    new Set([Promise.resolve(1), Promise.resolve(2)]), 
    [Promise.resolve(1), Promise.resolve(2)],
    new Set([Promise.reject(1), Promise.resolve(2)]), 
    [Promise.reject(1), Promise.resolve(2)],
    [1, '1', true, false, null, undefined, {}, function(){}, Symbol(), Promise.resolve(2)]
  ].forEach(item => {
    Promise.any(item).then(v => {
      console.log(v)
    }).catch(r => {
      console.log('in catch ' + r)
    })
  })
});

(() => {
  /**
   * Promise.race(iterable) 方法返回一个 promise，
   * 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝
   * resolve([value,...])
   * reject(firstReject)
   * @param {*} iterable 
   * @returns promise
   */
  Promise.race = function (iterable) {
    return new Promise(function(resolve, reject){
      var iteratee = iterable[Symbol.iterator]()
      var res = null
      var done = false
      while (true){
        res = iteratee.next()
        if(res.done) break
        var val = !(res.value instanceof Promise) ? Promise.resolve(res.value) : res.value
        val.then(function(value){
          if(done) return
          done = true
          resolve(value)
        }, function(reason){
          if(done) return
          done = true
          reject(reason)
        })
      }
    })
  };
  Promise.race = function (iterable) {
    return new Promise(function(resolve, reject){
      const promiseList = [...iterable]
      let done = false
      promiseList.forEach(val => {
        val = !(val instanceof Promise) ? Promise.resolve(val) : val
        val.then(value => {
          if(done) return
          done = true
          resolve(value)
        }, reason => {
          if(done) return
          done = true
          reject(reason)
        })
      })
    })
  };
  [
    new Map([[Promise.resolve(1), Promise.resolve(2)]]),
    new Set([Promise.resolve(1), Promise.resolve(2)]), 
    [Promise.resolve(1), Promise.resolve(2)],
    new Set([Promise.reject(1), Promise.resolve(2)]), 
    [Promise.reject(1), Promise.resolve(2)],
    [1, '1', true, false, null, undefined, {}, function(){}, Symbol(), Promise.resolve(2)]
  ].forEach(item => {
    Promise.race(item).then(v => {
      console.log(v)
    }).catch(r => {
      console.log('in catch ' + r)
    })
  })
});

(() => {
  /**
   * Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise
   * 并带有一个对象数组，每个对象表示对应的promise结果
   * resolve([value,...])
   * @param {*} iterable 
   * @returns promise
   */
  Promise.allSettled = function (iterable) {
    return new Promise(function(resolve){
      var iteratee = iterable[Symbol.iterator]()
      var res = null
      var i = 0
      var len = 0
      var result = []
      var allSettled = function(){
        i++
        if(len <= i && res.done) resolve(result)
      }
      while (true){
        res = iteratee.next()
        if(res.done) break
        !(function(j){
          var val = !(res.value instanceof Promise) ? Promise.resolve(res.value) : res.value
          val.then(function(value){
            result[j] = {
              value: value,
              status: 'fulfilled'
            }
            allSettled()
          }, function(reason){
            result[j] = {
              reason: reason,
              status: 'rejected'
            }
            allSettled()
          })
        }(len))
        len += 1
      }
    })
  };
  Promise.allSettled = function (iterable) {
    return new Promise(resolve => {
      const promiseList = [...iterable]
      const result = []
      const len = promiseList.length
      let j = 0
      var allSettled = () => len <= ++j && resolve(result)
      promiseList.forEach((val, i) => {
        var val = !(val instanceof Promise) ? Promise.resolve(val) : val
        val.then(value => {
          result[i] = {
            value: value,
            status: 'fulfilled'
          }
          allSettled()
        }, reason => {
          result[i] = {
            reason: reason,
            status: 'rejected'
          }
          allSettled()
        })
      })
    })
  };
  [
    new Map([[Promise.resolve(1), Promise.resolve(2)]]),
    new Set([Promise.resolve(1), Promise.resolve(2)]), 
    [Promise.resolve(1), Promise.resolve(2)],
    new Set([Promise.reject(1), Promise.resolve(2)]), 
    [Promise.reject(1), Promise.resolve(2)],
    [1, '1', true, false, null, undefined, {}, function(){}, Symbol(), Promise.resolve(2)]
  ].forEach(item => {
    Promise.allSettled(item).then(v => {
      console.log(v)
    }).catch(r => {
      console.log('in catch ' + r)
    })
  })
});

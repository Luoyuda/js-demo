function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


compose([
  function (ctx, next) {
    console.log(`a ${ctx.a}`)
    ctx.a += 1
    next()
    console.log(`a-end ${ctx.a}`)
  },
  function (ctx, next) {
    console.log(`b ${ctx.a}`)
    ctx.a += 1
    next()
    console.log(`b-end ${ctx.a}`)
  }
])({a: 0}, (ctx) => {
  console.log(`last ${ctx.a}`)
})
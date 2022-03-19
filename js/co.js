function* genF(){
  const a = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('a');
    }, 100)
  })
  const b = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('b');
    }, 100)
  })
  const c = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('c');
    }, 100)
  }).catch((err) => {
    console.log(err);
  })
  console.log(a, b, c)
}

function co(genF){
  return new Promise((res, rej) => {
    const gen = genF()
    const step = nextF => {
      let next
      try {
        next = nextF()
      } catch (error) {
        rej(error)
      }
      if(next.done) return res(next.value)
      Promise.resolve(next.value).then(v => {
        step(() => gen.next(v))
      }, r => {
        step(() => gen.throw(r))
      })
    }
    return step(() => gen.next())
  })
}

co(genF)
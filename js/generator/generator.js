const fs = require('fs')
const Thunk = function(fn) {
  return function(...args) {
    return function(callback) {
      return fn.call(this, ...args, callback);
    }
  }
}

const readFileThunk = Thunk(fs.readFile)
function run(fn){
  const gen = fn()
  function next(err, data){
    var result = gen.next(data)
    if(result.done) return 
    result.value(next)
  }
  next()
}

function* g(){
  const s1 = yield readFileThunk('./js/generator/1.json')
  console.log(s1.toString())
  const s2 = yield readFileThunk('./js/generator/2.json')
  console.log(s2.toString())
  const s3 = yield readFileThunk('./js/generator/3.json')
  console.log(s3.toString())
}

run(g)
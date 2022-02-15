function deepCopy(obj) {
  if(!obj) return null
  let target = Array.isArray(obj) ? [] : {}
  for(let key in obj){
      if(typeof obj[key] === 'object' && obj[key] !== null){
          target[key] = deepCopy(obj[key])
      }else{
          target[key] = obj[key]
      }
  }
  return target
}

var obj = {
  a: 1,
  b: {
      c: [1, { e: 2 }],
      d: Symbol('d'),
      e(){

      }
  }
};

var clone = deepCopy(obj)
console.log(clone)
console.log(Object.assign({}, obj).b === obj.b) // true
console.log({...obj}.b === obj.b) // true
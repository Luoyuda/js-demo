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

function deepCopy(obj) {
  // Hash表 记录所有的对象引用关系
  let map = new WeakMap();
  function dp(obj) {
      let result = null;
      let keys = null,
          key = null,
          temp = null,
          existObj = null;
      
      existObj = map.get(obj);
      // 如果这个对象已被记录则直接返回
      if (existObj) {
          return existObj;
      }
      keys = Object.keys(obj);
      result = {};
      // 记录当前对象
      map.set(obj,result);
      for (let i = 0; i < keys.length; i++) {
          key = keys[i];
          temp = obj[key];
          // 如果字段的值也是一个对象则递归复制
          if (temp && typeof temp === 'object') {
              result[key] = dp(temp);
          } else {
              // 否则直接赋值给新对象
              result[key] = temp;
          }
      }
      return result;
  }
  return dp(obj);
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
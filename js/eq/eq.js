/**
 * 
 * @param {any} a 
 * @param {any} b 
 * @param {[]} aStack 
 * @param {[]} bStack 
 * @returns Boolean
 */
function eq(a, b, aStack, bStack) {
  // 处理 -0 和 +0 的情况和相同的基本类型的比较
  if(a === b) return a !== 0 || 1 / a === 1 / b
  // 处理 NaN
  if(a !== a) return b !== b
  // 处理 null 的情况
  if(a == null || b == null) return false
  // 过滤 a 或 b 中存在一个基本类型的情况
  var type = typeof a
  if(type !== 'function' && type !== 'object' && typeof b !== 'object') return false
  // 开始对象类型的比较
  return deepEqual(a, b, aStack, bStack)
}
/**
 * 
 * @param {any} a 
 * @param {any} b 
 * @param {[]} aStack 
 * @param {[]} bStack 
 * @returns Boolean
 */
function deepEqual(a, b, aStack, bStack) {
  var typeA = Object.prototype.toString.call(a)
  var typeB = Object.prototype.toString.call(b)
  // 类型都不一样，没法相爱
  if(typeA !== typeB) return false
  // 通过隐式类型转换处理为基本类型再比较
  switch(typeA) {
    // 处理 Number() new Number() 的情况
    case '[object Number]':
      // + new Number(1) === + new Number(1).valueOf()
      if(+a !== +a) return +b !== +b
      if(+a === +b) return 1 / a === 1 / b
    case '[object RegExp]':
    case '[object String]':
      // '' + new RegExp() === '' + new RegExp().toString()
      // '' + new String() === '' + new String().toString()
      return '' + a === '' + b
    case '[object Boolean]':
    case '[object Date]':
      return +a === +b
    case '[object Symbol]':
      return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b)
    break;
  }
  // 到这里还剩下三种类型，Array || Object || function
  var isArray = typeA === '[object Array]';
  if(!isArray) {
    // 这里过滤 function 类型
    if(typeof a !== 'object') return false
    // 这里需要判断对象类型是否是同一个构造器
    var aCtor = a.constructor
    var bCtor = b.constructor
    if(
      aCtor !== bCtor &&
      typeof aCtor !== 'function' &&
      aCtor instanceof aCtor &&
      typeof bCtor !== 'function' &&
      bCtor instanceof bCtor &&
      ('constructor' in a && 'constructor' in b)
    ){
      return false
    }
  }
  // 到这里已经是要么是数组，要么是同类型的实例对象
  aStack = aStack || []
  bStack = bStack || []
  // 优先处理循环引用的问题
  var len = aStack.length
  while (len--) {
    if(aStack[len] === a) return bStack[len] === b
  }
  // 不存在循环引用，将a b 分别入栈
  aStack.push(a)
  bStack.push(b)
  if(isArray){
    var len = a.length
    // 个数不同，不能恋爱
    if(len !== b.length) return false
    while(len--){
      // 详细对每一项进行比对
      if(!eq(a[len], b[len], aStack, bStack)) return false
    }
  }else{
    // 这里偷懒用 Object.keys
    var keys = Object.keys(a)
    var len = keys.length
    // 个数不同，不能恋爱
    if(len !== Object.keys(b).length) return false
    while(len--){
      // 详细对每一项进行比对
      if(!eq(a[keys[len]], b[keys[len]], aStack, bStack)) return false
    }
  }
  // 比对结束了，记得出栈！
  aStack.pop()
  bStack.pop()
  // 大功告成
  return true
}

module.exports = {
    eq
}
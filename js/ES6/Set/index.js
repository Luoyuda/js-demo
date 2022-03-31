var MySet = (function(){
  var symbolNaN = Symbol('NaN'); // 处理NaN
  function _encode(val){
    return val !== val ? symbolNaN : val;
  }
  function _decode(val){
    return val === symbolNaN ? NaN : val; 
  }
  // 创建迭代器对象
  function _createIterator(list, iterator){
    var next = 0
    var obj = {
      next: function(){
        return next < list.length ? { done: false, value: iterator(list[next++]) } : { done: true, value: undefined }
      }
    }
    obj[Symbol.iterator] = function() {
      return obj
    }
    return obj
  }
  // 迭代器遍历方法
  function _forOf(obj, cb){
    if(typeof obj[Symbol.iterator] !== 'function') throw new TypeError(obj + 'is not a iterable')
    if(typeof cb !== 'function') throw new TypeError('cb is not a function')
    var iterable = obj[Symbol.iterator]()
    var res
    while(true){
      res = iterable.next()
      if(res.done) break
      cb(res.value)
    }
  }
  // 构造函数
  function _Set(values){
    var self = this
    self._set = []
    Object.defineProperty(self, 'size', {
      enumerable: false,
      configurable: false,
      get(){
        return self._set.length
      }
    })
    _forOf(values, function(val){
      self.add(val)
    })
    return self
  }
  // 在Set对象尾部添加一个元素。返回该Set对象。
  _Set.prototype.add = function(val){
    if(!this.has(val)){
      // 插入时 encode，读取时 decode
      this._set.push(_encode(val))
    }
    return this
  }
  // 返回一个布尔值，表示该值在Set中存在与否
  _Set.prototype.has = function(val){
    return this._set.indexOf(_encode(val)) !== -1
  }
  // 移除Set中与这个值相等的元素，返回Set.prototype.has(value)
  // 在这个操作前会返回的值（即如果该元素存在，返回true，否则返回false）。
  // Set.prototype.has(value)在此后会返回false。
  _Set.prototype.delete = function(val){
    if(!this.has(val)) return false
    val = _encode(val)
    let i = this._set.indexOf(val)
    this._set.splice(i, 1)
    return true
  }
  // 移除Set对象内的所有元素。
  _Set.prototype.clear = function(){
    this._set = []
  }
  // 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组
  _Set.prototype.entries = function(){
    return _createIterator(this._set, function(val){ return [_decode(val), _decode(val)]})
  }
  // 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值
  _Set.prototype.values = function(){
    return _createIterator(this._set, function(val){ return _decode(val)})
  }
  // 按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数。
  _Set.prototype.forEach = function(fn, context) {
    for (var i = 0; i < this._set.length; i++) {
      var val = _decode(this._set[i])
      fn.call(context, val, val, this)
    }
  }
  // 声明为迭代器对象
  _Set.prototype[Symbol.iterator] = function(){
    return this.values();
  }

  return _Set
})();
let arr = [1,2,3,4,NaN,1,2,3,4,NaN]
let mySet = new MySet(arr)
let set = new Set(arr)
let myResult = []
let result = []
mySet.forEach((...args) => {
  myResult.push(args)
})
set.forEach((...args) => {
  result.push(args)
})
myResult.push([...mySet])
result.push([...set])
for (const val of set.entries()) {
  result.push(val)
}
for (const val of set.values()) {
  result.push(val)
}
for (const val of mySet.entries()) {
  myResult.push(val)
}
for (const val of mySet.values()) {
  myResult.push(val)
}
myResult.push(mySet.has(NaN))
myResult.push(mySet.delete(NaN))
myResult.push(mySet.has(NaN))
myResult.push(mySet.delete(NaN))
myResult.push(mySet)
result.push(set.has(NaN))
result.push(set.delete(NaN))
result.push(set.has(NaN))
result.push(set.delete(NaN))
result.push(set)

console.log(myResult)
console.log(result)
var MyMap = (function(){
  var symbolNaN = Symbol('NaN')
  function _encode(val){
    return val !== val ? symbolNaN : val
  }
  function _decode(val){
    return val === symbolNaN ? NaN : val
  }
  function _forOf(obj, cb){
    if(typeof obj[Symbol.iterator] !== 'function') throw new TypeError('Symbol.iterator is not a function')
    if(typeof cb !== 'function') throw new TypeError('cb is not a function')
    var iteratee = obj[Symbol.iterator]()
    var res
    while(true){
      res = iteratee.next()
      if(res.done) break
      cb(res.value)
    }
  }
  function _createIterator(list, iterator){
    var next = 0
    var obj = {
      next: function(){
        return next < list.length ? { done: false, value: iterator(list[next++]) } : { done: true, value: undefined }
      },
    }
    obj[Symbol.iterator] = function(){
      return obj
    }
    return obj
  }
  /**
   * 构造函数
   * @param {*} values 迭代器对象
   */
  function _Map(values){
    var self = this
    this._key = []
    this._value = []
    // size 是可访问属性，用于返回 一个Map 对象的成员数量
    Object.defineProperty(self, 'size', {
      enumerable: false,
      configurable: false,
      get(){
        return self._key.length
      }
    })
    _forOf(values, function(val){
      if(typeof val !== 'object') throw new TypeError('value must be an object')
      self.set(val[0], val[1])
    })
  }
  /**
   * 方法has() 返回一个bool值，用来表明map 中是否存在指定元素
   * @param {any} key 
   * @returns Boolean 如果指定元素存在于Map中，则返回true。其他情况返回false
   */
  _Map.prototype.has = function(key){
    return this._key.indexOf(_encode(key)) !== -1
  }
  /**
   * set() 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对
   * @param {any} key 
   * @param {any} val 
   * @returns Map 对象
   */
  _Map.prototype.set = function(key, val){
    key = _encode(key)
    var i = this._key.indexOf(key)
    if(i === -1) i = this.size
    this._key[i] = key
    this._value[i] = val
    return this
  }
  /**
   * get() 方法返回某个 Map 对象中的一个指定元素。
   * @param {any} key 
   * @returns value || undefined
   */
  _Map.prototype.get = function(key){
    key = _encode(key)
    var i = this._key.indexOf(key)
    if(i === -1) return undefined
    return this._value[i]
  }
  /**
   * delete() 方法用于移除 Map 对象中指定的元素
   * @param {any} key 
   * @returns Boolean 如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false
   */
  _Map.prototype.delete = function(key){
    key = _encode(key)
    var i = this._key.indexOf(key)
    if(i === -1) return false
    this._key.splice(i, 1)
    this._value.splice(i, 1)
    return true
  }
  /**
   * clear()方法会移除Map对象中的所有元素。
   */
  _Map.prototype.clear = function(){
    this._key = []
    this._value = []
  }
  /**
   * keys() 返回一个引用的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
   * @returns 一个新的 Map 可迭代对象
   */
  _Map.prototype.keys = function(){
    return _createIterator(this._key, function(key){ return _decode(key) })
  }
  /**
   * values() 方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。
   * @returns 一个新的 Map 可迭代对象
   */
  _Map.prototype.values = function(){
    return _createIterator(this._value, function(value){ return value })
  }
  /**
   * entries() 方法返回一个新的包含 [key, value] 对的 Iterator 对象
   * 返回的迭代器的迭代顺序与 Map 对象的插入顺序相同
   * @returns 一个新的 Map 迭代器对象
   */
  _Map.prototype.entries = function(){
    var res = []
    var len = this._key.length
    var i = 0
    while(i < len){
      res[i] = [_decode(this._key[i]), this._value[i++]]
    }
    return _createIterator(res, function(entry){ return entry })
  }
  /**
   * forEach() 方法按照插入顺序依次对 Map 中每个键/值对执行一次给定的函数
   * @param {function} fn 
   * @param {any} context 
   */
  _Map.prototype.forEach = function(fn, context){
    var i = 0
    var len = this._key.length
    while(i < len){
      fn.call(context, _decode(this._key[i]), this._value[i++], this)
    }
  }
  _Map.prototype[Symbol.iterator] = function(){
    return this.entries()
  }
  return _Map
})();

const m1 = new MyMap([[1,2]])
console.log(m1.has(1))
console.log(m1.set(1, 3))
console.log(m1.set(NaN, 4))
console.log(m1.get(NaN))
console.log(m1.set(NaN, 5))
console.log(m1.get(NaN))
console.log([...m1.keys()])
console.log([...m1.values()])
console.log([...m1.entries()])
console.log([...m1])
m1.forEach(console.log)
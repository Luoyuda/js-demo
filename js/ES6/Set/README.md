---
title: Set 模拟实现（ES6）
tags: 
 - Set
 - JavaScript
 - ES6
categories:
 - 技术
comments: true
date: 2022-03-31 19:23
---

**`Set`** 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用，值的集合

## 实现

先把程序骨架写好

```js
var MySet = (function(){
  var symbolNaN = Symbol('NaN');
  function _encode(val){}
  function _decode(val){}
  function _createIterator(list, iterator){}
  function _Set(values){ }
  _Set.prototype.has = function(val){}
  _Set.prototype.delete = function(val){}
  _Set.prototype.clear = function(){}
  _Set.prototype.entries = function(){}
  _Set.prototype.values = function(){}
  _Set.prototype.forEach = function(fn, context) {}
  _Set.prototype[Symbol.iterator] = function(){}
  return _Set
})();
```

### 构造函数

构造函数接受一个迭代器对象，并将其顺序插入到集合中

```js
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
```

### add 

先判断是否存在，然后往里面写入，这里需要注意的一点是 `NaN` 的情况

> `NaN != NaN` 这是什么大坑 通过 `_encode` 和 `_decode` 方法进行处理

```js
var symbolNaN = Symbol('NaN'); // 处理NaN
function _encode(val){
  return val !== val ? symbolNaN : val;
}
function _decode(val){
  return val === symbolNaN ? NaN : val; 
}
// 在Set对象尾部添加一个元素。返回该Set对象。
_Set.prototype.add = function(val){
  if(!this.has(val)){
    // 插入时 encode，读取时 decode
    this._set.push(_encode(val))
  }
  return this
}
```

### has 

```js
// 返回一个布尔值，表示该值在Set中存在与否
_Set.prototype.has = function(val){
  return this._set.indexOf(_encode(val)) !== -1
}
```

### delete 

```js
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
```

### clear

```js
// 移除Set对象内的所有元素。
_Set.prototype.clear = function(){
  this._set = []
}
```

### entries & values

这两个方法是返回迭代器对象

>**迭代器**是一个对象，它定义一个序列，并在终止时可能返回一个返回值。 更具体地说，迭代器是通过使用 `next()` 方法实现 [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) 的任何一个对象，该方法返回具有两个属性的对象： `value`，这是序列中的 next 值；和 `done` ，如果已经迭代到序列中的最后一个值，则它为 `true` 。如果 `value` 和 `done` 一起存在，则它是迭代器的返回值

简单带你说就是通过 next() 方法去访问下一个值，直到 done 为 true 停止

```js
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
```

有了这个生成迭代器方法，我们就可以根据规范去编写

```js
// 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组
_Set.prototype.entries = function(){
  return _createIterator(this._set, function(val){ return [_decode(val), _decode(val)]})
}
// 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值
_Set.prototype.values = function(){
  return _createIterator(this._set, function(val){ return _decode(val)})
}
```

注意 `Set` 对象也是一个迭代器对象

```js
// 声明为迭代器对象
_Set.prototype[Symbol.iterator] = function(){
  return this.values();
}
```

### forEach

```js
// 按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数。
_Set.prototype.forEach = function(fn, context) {
  for (var i = 0; i < this._set.length; i++) {
    var val = _decode(this._set[i])
    fn.call(context, val, val, this)
  }
}
```

## 大功告成，简单写一个测试试试看

```js
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
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a429b1929c14876b196fcbb4fcab9ab~tplv-k3u1fbpfcp-watermark.image?)

完全一致!

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/ES6/Set)
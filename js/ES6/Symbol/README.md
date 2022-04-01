---
title: Symbol 不完全模拟实现（ES6）
tags: 
 - Symbol
 - JavaScript
 - ES6
categories:
 - 技术
comments: true
date: 2022-04-01 13:00
---

`symbol` 是 `ES6` 中新增的基本类型，通过 `Symbol()` 函数返回 `symbol` 类型的值，值是唯一的。`Symbol`类似于内建对象类，无法作为构造器使用！

## 实现

先一组目标

```js
const types = [1, '1', false, true, undefined, null, NaN, {}, [], function(){}]
const createSymbols = (fn, test) => {
  return test.map(item => fn(item)).reduce((prev, item) => {
    prev[item] = String(item)
    return prev
  }, {})
}
const tests = [...types, ...types]

console.log(createSymbols(Symbol, tests))
/*
{
  [Symbol(1)]: 'Symbol(1)',
  [Symbol(1)]: 'Symbol(1)',
  [Symbol(false)]: 'Symbol(false)',
  [Symbol(true)]: 'Symbol(true)',
  [Symbol()]: 'Symbol()',
  [Symbol(null)]: 'Symbol(null)',
  [Symbol(NaN)]: 'Symbol(NaN)',
  [Symbol([object Object])]: 'Symbol([object Object])',
  [Symbol()]: 'Symbol()',
  [Symbol(function(){})]: 'Symbol(function(){})',
  [Symbol(1)]: 'Symbol(1)',
  [Symbol(1)]: 'Symbol(1)',
  [Symbol(false)]: 'Symbol(false)',
  [Symbol(true)]: 'Symbol(true)',
  [Symbol()]: 'Symbol()',
  [Symbol(null)]: 'Symbol(null)',
  [Symbol(NaN)]: 'Symbol(NaN)',
  [Symbol([object Object])]: 'Symbol([object Object])',
  [Symbol()]: 'Symbol()',
  [Symbol(function(){})]: 'Symbol(function(){})'
}
*/
```

唯一值可以通过引用类型实现，通过 `toString` 方法控制输出

```js
var MySymbol = (function(){
  // 只要引用不同就不会比较相等
  function _Symbol(description){
    // 不能被new调用
    if(this instanceof _Symbol) throw new TypeError('Symbol is not a constructor')
    var desc = description === undefined ? '' : String(description)
    var symbol = Object.create({
      toString: function(){
        return 'Symbol (' + this._description + ')'
      }
    })
    Object.defineProperties(symbol, {
      '_description': {
        value: desc,
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }
  return _Symbol
})();
```

理想很丰富，现实很骨感，确实没法用字符串去规避掉作为键值的重复

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2a809b3a52e494dbbfafae4254ff0ea~tplv-k3u1fbpfcp-watermark.image?)

只能加个 `id` 维持一下生活了

```js
var MySymbol = (function(){
  var generateString = (function(){
    var id = 0
    return function(desc){
      return 'Symbol(' + (id++) + ') (' + desc + ')'
    }
  })();
  function generateId(val){
    return 'Symbol (' + this._description + ')'
  }
  // 只要引用不同就不会比较相等
  function _Symbol(description){
    // 不能被new调用
    if(this instanceof _Symbol) throw new TypeError('Symbol is not a constructor')
    var desc = description === undefined ? '' : String(description)
    var symbol = Object.create({
      toString: function(){
        return this._name
      }
    })
    Object.defineProperties(symbol, {
      '_description': {
        value: desc,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '_name': {
        value: generateString(desc),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }
  return _Symbol
})();
```

抛开 `id` 不谈，假装我们已经实现了（doge）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16504f37d18e4bf7b7776314423fd584~tplv-k3u1fbpfcp-watermark.image?)

接着得看下 `for` 和 `keyFor` 该如何实现

### Symbol.for()

根据给定的键 `key`，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中

`Symbol()` 不同的是，用 `Symbol.for()` 方法创建的的 symbol 会被放入一个全局 symbol 注册表中！

```js
var symbolTable = {}
_Symbol.for = function(description){
  return symbolTable[description] ? symbolTable[description] : 
  symbolTable[description] = _Symbol(description)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c55c5ae85a9349be9bbf687111f705bf~tplv-k3u1fbpfcp-watermark.image?)


### Symbol.keyFor()

获取全局 `symbol` 注册表中与某个 `symbol` 关联的键，通过 `Symbol.For` 注册的值哦！

```js
_Symbol.keyFor = function(symbol){
  for (var key in symbolTable) {
    if(symbolTable[key] === symbol) return key
  }
  return undefined
}
```

### 这样就好了吗？

现实很骨感啊

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/def1f1edf2574198abad52aceface8fb~tplv-k3u1fbpfcp-watermark.image?)

因为对象键值存储会进行 `String()` 的类型转换，为了尽可能接近，我们只好用双数组的方法了

```js
var _symbolKey = []
var _symbolValue = []
_Symbol.for = function(description){
  var i = 0
  var len = _symbolKey.length
  while (i < len) {
    if(_symbolKey[i] === description) return _symbolValue[i]
    i++
  }
  _symbolKey.push(description)
  _symbolValue.push(_Symbol(description))
  return _symbolValue[i]
}
_Symbol.keyFor = function(symbol){
  var i = 0
  var len = _symbolValue.length
  while (i < len) {
    if(symbol === _symbolValue[i]) return _symbolKey[i]
    i++
  }
  return undefined
}
```

```js
// 测试用例
types.map(item => ({ item, symbol: MySymbol.for(item) })).forEach(({ item, symbol }) => {
  let sym = MySymbol.keyFor(symbol)
  if(!(sym === item)){
    if(sym !== sym) return
    console.log('no pass')
    console.log(item, sym, String(symbol))
  }
})
```

搞定，完成（并不完全模拟）

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/ES6/Symbol)
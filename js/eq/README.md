---
title: 如何实现一个全等函数（JavaScript）
tags: 
 - JavaScript
 - 全等
categories:
 - 技术
comments: true
date: 2022-04-04 15:00
---
## 如何才算相等

参（chao）考（xi）`underscore` 的实现


## 测试用例

虽然函数还没完成，但是得先把饼画出去，不然怎么招商引资？

```js
const { eq } = require('./eq.js')
const runTests = (tests, message) => {
  describe(message, function() {
    tests.forEach(([args, res], i) => {
      let argMsg = ''
      try {
        argMsg = args.toString()
      } catch (error) {
        
      }
      test(`${i}-${argMsg}`, () => {
        expect(eq(...args)).toEqual(res)
      });
    })
  })
}
const Tests = [
  {
    tests: [
      [[0, 0], true],
      [[0, -0], false],
      [[1, 1], true],
      [[-1, 1], false],
      [[-1, -1], true],
      [[1, new Number(1)], true],
      [[-1, new Number(-1)], true],
      [[NaN, NaN], true],
      [[NaN, 1], false],
      [['1', 1], false],
      [[true, 1], false],
      [[false, 1], false],
      [[null, 1], false],
      [[{}, 1], false],
      [[[], 1], false],
      [[function(){}, 1], false],
      [[undefined, 1], false],
      [[new String(1), 1], false],
      [[new Boolean(1), 1], false],
      [[new String('1'), 1], false],
      [[new Boolean(true), 1], false],
    ],
    message: 'number'
  },
  {
    tests: [
      [['', ''], true],
      [['1', ''], false],
      [['1', '1'], true],
      [[true, ''], false],
      [[false, ''], false],
      [[-1, '-1'], false],
      [[1, '1'], false],
      [[NaN, 'NaN'], false],
      [[new String('NaN'), 'NaN'], true],
      [[{}, ''], false],
      [[[], ''], false],
      [[function(){}, ''], false],
      [[null, ''], false],
      [[undefined, ''], false],
      [[new Boolean('1'), '1'], false],
      [[new Boolean(true), '1'], false],
    ],
    message: 'string'
  },
  {
    tests: [
      [[/a/, /a/], true],
      [[/a/ig, /a/], false],
      [[/a/, new RegExp('a')], true],
      [[/a/i, new RegExp('a', 'i')], true],
      [[/a/ig, new RegExp('a', 'ig')], true],
    ],
    message: 'RegExp'
  },
  {
    tests: [
      [[new Boolean(true), new Boolean(true)], true],
      [[new Boolean(false), new Boolean(true)], false],
      [[true, true], true],
      [[true, false], false],
      [[true, new Boolean(true)], true],
      [[false, new Boolean(false)], true],
      [[true, new Boolean(false)], false],
      [[undefined, new Boolean(false)], false],
      [[null, new Boolean(false)], false],
      [[[], new Boolean(false)], false],
      [[{}, new Boolean(false)], false],
      [[function(){}, new Boolean(false)], false],
      [[new String('false'), new Boolean(false)], false],
      [[new Number('false'), new Boolean(false)], false],
    ],
    message: 'boolean'
  },
  {
    tests: [
      [[undefined, null], false],
      [[undefined, undefined], true],
      [[null, null], true],
      [[new Boolean(null), null], false],
      [[new String(null), null], false],
      [[new Number(null), null], false],
      [[new Boolean(undefined), undefined], false],
      [[new String(undefined), undefined], false],
      [[new Number(undefined), undefined], false],
      [[[], undefined], false],
      [[{}, undefined], false],
      [[function(){}, undefined], false],
      [[0, undefined], false],
      [['', undefined], false],
      [['0', undefined], false],
      [[0, null], false],
      [['', null], false],
      [['0', null], false],
      [[NaN, null], false],
      [[NaN, undefined], false],
    ],
    message: 'undefined null'
  },
  {
    tests: (function() {
      var s1 = Symbol.for(1)
      var s2 = Symbol.for(1);
      return [
        [[Symbol(1), Symbol(1)], false],
        [[Symbol('1'), Symbol('1')], false],
        [[Symbol('1'), Symbol(1)], false],
        [[s1, s2], true],
      ]
    })(),
    message: 'Symbol'
  },
  {
    tests: (function() {
      var f1 = function(){}
      var f2 = () => {};
      return [
        [[f1, function(){}], false],
        [[f2, () => {}], false],
        [[f1, f1], true],
        [[f2, f2], true],
        [[f2, f1], false],
      ]
    })(),
    message: 'function'
  },
  {
    tests: [
      [[new Date(), new Date()], true],
      [[new Date(), new Date(1)], false],
    ],
    message: 'date'
  },
  {
    tests: (function() {
      function A(a){
        this.a = a
      }
      function B(a){
        this.a = a
      }
      var a = new A(1)
      var b = new A(1)
      var d = new A(2)
      var c = new B(2)
      var e = {
        a: 1,
        e
      }
      var f = {
        a: 1,
        f
      }
      var g = {
        a: 1,
        f
      }
      return [
        [[a, b], true],
        [[a, c], false],
        [[a, d], false],
        [[{}, []], false],
        [[{}, {}], true],
        [[{a: 1}, {a: 1}], true],
        [[{a: 2}, {a: 1}], false],
        [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, }}], true],
        [[[{a: 1, b: {c : 1, d: 2}}], [{a: 1, b: {c : 1, d: 2, }}]], true],
        [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, e:1 }}], false],
        [[e, f], true],
        [[e, g], true],
        [[[1,2,3], [1,2,3]], true],
      ]
    })(),
    message: 'object'
  }
]

Tests.forEach(({tests, message}) => runTests(tests, message))
```


## 开始写 eq 函数

```js
function eq(a, b){
  
}

module.exports = {
    eq
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3406af1ccbcc4108a916332bac379c9e~tplv-k3u1fbpfcp-watermark.image?)

### 基本类型比较部分

```js
function eq(a, b){
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
  return deepEqual(a, b)
}
```

这里主要着重处理了 `-0` 和 `NaN` 的情况

### -0 & 0

这个显然是不相等的，但是在JavaScript中是相等的

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e126fbc0b16e48d58eed010f102221fc~tplv-k3u1fbpfcp-watermark.image?)

真的要研究为什么会有 `-0` 是因为底层存储使用的是带符号位的二进制存储 `number` 类型，`-0` 则是符号位为 `10` 的情况，`+0` 则为 `00`，符号位为 `0`

### 对象类型该如何比较？

```js
function deepEqual(a, b) {
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
  }
}
```

此时已经通过 `number` 的测试用例辣

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d55009830e134e3c8e2b2598ec9fb365~tplv-k3u1fbpfcp-watermark.image?)

接着处理 `new String()` 和 `new RegExp()` 这种情况

```js
function deepEqual(a, b) {
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
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1597b9b94d134168a571eaebafcb1bf2~tplv-k3u1fbpfcp-watermark.image?)

以同样的思路处理 `new Boolean()` 和 `new Date()` 的情况

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17e2a670f002440696d703b947a099e9~tplv-k3u1fbpfcp-watermark.image?)

顺手处理下 `Symbol` 类型

```js
function deepEqual(a, b) {
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
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/426c6165c3f042ad9ee57dd230e33556~tplv-k3u1fbpfcp-watermark.image?)

处理 `function`

```js
...
  // 到这里还剩下三种类型，Array || Object || function
  var isArray = typeA === '[object Array]';
  if(!isArray) {
    // 这里过滤 function 类型
    if(typeof a !== 'object') return false
  }
...
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/211d6a9d80a345e3969e9a2cb741f298~tplv-k3u1fbpfcp-watermark.image?)

```js
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
```

接下去该怎么对数组/对象的每一项进行比较呢？显然得考虑深度问题，所以得引入递归

```js
function eq(a, b, aStack, bStack) {
  ...
  return deepEqual(a, b, aStack, bStack)
}

function deepEqual(a, b, aStack, bStack) {
  ...
  // 到这里已经是要么是数组，要么是同类型的实例对象
  aStack = aStack || []
  bStack = bStack || []
}
```

通过递归每一项去比对，通过栈来管理深度问题

```js
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
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4b0993f6e284cb6a0e40b929d77f985~tplv-k3u1fbpfcp-watermark.image?)

## 完整代码

```js
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
```

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/eq)



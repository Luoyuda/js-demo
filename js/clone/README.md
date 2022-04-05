---
title: 深浅拷贝实现（JavaScript）
tags: 
 - JavaScript
 - 深拷贝
 - 浅拷贝
categories:
 - 技术
comments: true
date: 2022-04-05 14:00
---

# 数据类型

在了解深、浅拷贝之前，得先了解 `JavaScript` 中的数据类型和存储方式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15d0afc7d764954a40f70881f1e21fb~tplv-k3u1fbpfcp-watermark.image?)

* 基本类型：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`
    * 存储在栈内存中
    * 大小固定、体积轻量、相对简单
    * 赋值操作会直接生成一个新的值（深拷贝）
    
* 引用类型：`object`、`array`、`function`等
    * 栈存储该对象的引用地址，实际数据存放在堆内存
    * 大小不定、占用空间较大、比较复杂
    * 赋值操作会直接将指针指向该实体的引用地址（处于节省内存考虑，属于浅拷贝）

# 深浅拷贝定义

>浅拷贝：复制某个对象的指针地址，而不是复制对象本身，新旧对象依然共享一块内存

>深拷贝：创造一个一模一样的对象，新对象与原对象不共享内存，修改新对象不影响到原对象

# 浅拷贝

## Array

### slice()

```js
function cloneArrayBySlice(list){
  return list.slice()
}
var arr = [1, 2, { name: 'xy' }]
var arrClone = cloneArrayBySlice(arr)
arr[0] = 2
arrClone[0] = 3
arrClone[2].name = 'change' // 引用类型是浅拷贝地址
console.log(arr, arrClone) // [ 2, 2, { name: 'change' } ] [ 3, 2, { name: 'change' } ]
```

### concat

```js
function cloneArrayByConcat(list){
  return [].concat(list)
}
```

### spread

```js
function cloneArrayBySpread(list){
  return [...list]
}
```

# Object

## assign

值得注意的是 `assign` 接受第一个入参为 `target` 后续的参数为混入到 `target` 上，所以也算一种浅拷贝吧（勉强）

```js
function assign(obj){
  return Object.assign(obj)
}
```


# 深拷贝

## assign

为什么这里还能出现在这个？

> `Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象

```js
var a = { a: 1 }
var b = Object.assign({}, a) // 此时是将 a 混入到 {} 对象上，所以 a != b
```

当然它只要超过值是引用类型还是执行浅拷贝

```js
var a = { a: 1, b: { b : 2 } }
var b = Object.assign({}, a)
a.b === b.b
```

## JSON.parse

这个方法的原理是将对象序列化成字符串，再解析 `json` 字符串解析为对象

```js
function clone(obj){
  return JSON.parse(JSON.stringify(obj))
}
```

缺点

* 忽略 `symbol` `undefined` `function` 类型
* 不支持循环引用对象的拷贝

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d89327d55304e658162ebf1c104aef7~tplv-k3u1fbpfcp-watermark.image?)

## MessageChannel

Channel Messaging API的 `MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个`MessagePort` 属性发送数据

```js
var { port1, port2 } = new MessageChannel()
port1.onmessage = e => console.log(e.data)
port2.postMessage('hello from port2') // hello from port2
```

```js
function clone(obj){
  return new Promise((res, rej) => {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = e => res(e.data)
    port2.postMessage(obj)
  })
}
```

缺点

* 异步取值
* 不支持 `function` 和 `symbol` 类型

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5cce0e33e10404a9d17f88cb945ffbc~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49270fa5681e459d8a2881c955bd2e84~tplv-k3u1fbpfcp-watermark.image?)

## 递归遍历

使用递归去创建对象，再赋值，可以处理大部分场景

```js
function clone(obj) {
  if(!obj) return null
  var target = Array.isArray(obj) ? [] : {}
  for(var key in obj){
    if(typeof obj[key] === 'object'){
      target[key] = clone(obj[key])
    }else{
      target[key] = obj[key]
    }
  }
  return target
}
```

缺点

* 不支持循环引用

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98299d06d2174522a25e1b4fbafae5b9~tplv-k3u1fbpfcp-watermark.image?)

## 处理循环引用的解决方案

使用 `WeakMap` 数据结构存储循环引用的映射关系

```js
function clone(obj){
  var map = new WeakMap()
  function _clone(obj){
    var val = map.get(obj)
    if(val) return val
    var target = obj instanceof Array ? [] : {}
    map.set(obj, target)
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const el = obj[key];
        if(el && typeof el === 'object') {
          target[key] = _clone(el)
        }else{
          target[key] = el
        }
      }
    }
    return target
  }
  return _clone(obj)
}
```

### 测试用例

```js
const { clone } = require('./clone.js')
const runTests = (tests, message) => {
  describe(message, function() {
    tests.forEach(([args, res], i) => {
      test(`${i}`, () => {
        expect(clone(args)).toEqual(args)
      });
    })
  })
}
const Tests = [
  {
    tests: [
      [
        (function () {
          var a = { 
            a: 1, 
            b: '1', 
            c: true, 
            d: false, 
            e: null, 
            f: undefined, 
            g: function(){},
            h: Symbol('b'),
            i: [
              1, '1', true, false, null, undefined, function(){}, 
              { 
                a: 1, 
                b: '1', 
                c: true, 
                d: false, 
                e: null, 
                f: undefined, 
                g: function(){},
                h: Symbol('b'),
              },
              [1, '1', true, false, null, undefined, function(){}]
            ],
            j: { 
              a: 1, 
              b: '1', 
              c: true, 
              d: false, 
              e: null, 
              f: undefined, 
              g: function(){},
              h: Symbol('b'),
              i: [
                1, '1', true, false, null, undefined, function(){}, 
                { 
                  a: 1, 
                  b: '1', 
                  c: true, 
                  d: false, 
                  e: null, 
                  f: undefined, 
                  g: function(){},
                  h: Symbol('b'),
                }
              ]
            },
          }
          return {
            ...a,
            a
          }
        })()
      ],
    ],
    message: 'number'
  }
]

Tests.forEach(({tests, message}) => runTests(tests, message))
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83b27267515a4fbd8b4d4ac7d27ec7be~tplv-k3u1fbpfcp-watermark.image?)

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/clone)
---
title: 飘忽不定的 this 与 call / apply / bind / new （JavaScript）
tags: 
 - JavaScript
 - this
 - call / apply
 - bind
 - new
categories:
 - 技术
comments: true
date: 2022-04-05 14:00
---
# `this`

`JavaScript` 作为一个语言，有着一堆怪异的表现，最耀眼的那颗星必是 `this` 关键字

## 为什么会出现 `this`

```js
var a = {
    b: function(){
        console.log(this.d)
    },
    d: 1
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d409dd5b2f0d42da9830d5f41578327c~tplv-k3u1fbpfcp-watermark.image?)

根据我们对于基本数据类型与引用数据类型的理解，这里的 `value` 储存的实际上是什么？

它实际上应该是一个存储在 `栈内存` 中的 `内存地址`，指向 `堆内存` 中的 `函数主体`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c143997b0973473a9836a1a65de25728~tplv-k3u1fbpfcp-watermark.image?)

这时候如果有一个新的对象

```js
var c = {
    b: a.b,
    d: 2
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd97a1c7a1b43958c20678f4f90ee30~tplv-k3u1fbpfcp-watermark.image?)

那问题来了，函数允许在不同的上下文中执行

我要打印对象上的 `d`，需要有一个可以指代执行环境的关键字，这时候 `this` 就产生了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddcab29da5fe4482b2cecda2e580e9bd~tplv-k3u1fbpfcp-watermark.image?)

所以 `this` 本质上是获取内部执行环境`(context)`的一种机制，所以 `this` 的值是函数内部执行环境初始化时才决定，且不能进行更改

## 如何确定 `this` 的值

`this` 指向调用该函数的对象，储存着调用该函数对象的值。也就是说，搞清由谁调用了这个函数，就能准确的找到 `this` 指向哪个对象

```js
// 接上
a.b() // a对象上调用了b
c.b() // c对象上调用了c
var e = c.b // 这里实际上是使用一个 e 变量存储了 b 函数的引用地址！
e() // 这里是谁调用了 b ？
```

## `this` 的指向规则

### 默认绑定 `(b() / (b = b)() / (b || b)() / (b, b)() ...)`

默认绑定是指函数作为独立函数调用时，`this` 指向全局对象 `window` (严格模式下是 `undefined`)

```js
var c = 'window'
var a = {
  b:function(){
    console.log(this.c)
  },
  c: 'a'
}
var d = a.b;
d();
// 赋值时导致隐形丢失
((a.b, a.b))();
((a.b = a.b))(); 
((a.b || a.b))();
((a.b && a.b))();
setTimeout(a.b);
setInterval(a.b, 1000);
```
		
		
	new绑定
		new 来调用 foo() 时，我们会构造一个新对象并把它绑定到 foo() 调用中的 this 上

### 隐式绑定 `(a.b)`

函数的调用是在某个对象上触发的，即调用位置上存在上下文对象，`a.b()`，绑定 `a`

```js
var c = 'window'
var a = {
  b:function(){
    console.log(this.c)
  },
  c: 'a',
  d: {
    b:function(){
      console.log(this.c)
    },
    c: 'd'
  }
}

a.b() // a
a.d.b() // d 就近
```

### 显示绑定 `(call / apply / bind)`

通过 `call` , `apply` , `bind` 的方式，显式的指定 `this` 所指向的对象

```js
var c = 'window'

function b(){
  console.log(this.c)
}
var a = {
  c: 'a'
}
var d = {
  c: 'd'
}
var e = {
  c: 'e'
}

b() // window
b.call(a) // a
b.apply(d) // d
b.bind(e)() // e
```

#### `call / apply` 模拟实现


使用一个指定的 `this` 值调用某个函数
  1. 将函数设为对象属性
  2. 执行函数
  3. 删除该对象属性
```js
Function.prototype.newCall = function(){
  if(typeof this !== 'function') throw new Error('no function')
  var context = arguments[0] || window
  context.fn = this
  var args = []
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
```
 
```js
Function.prototype.newApply = function(){
  if(typeof this !== 'function') throw new Error('no function')
  var context = arguments[0] || window
  context.fn = this
  var args = arguments[1] || []
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
```

#### `bind` 模拟实现


创建一个新函数，使用第一个参数作为运行新函数的 this  其他参数作为新函数的入参
  1. 取出入参
  2. 新建一个函数 `F()` 作为参数返回值
  3. 创建一个 函数 `f() f.prototype = this.prototype F.prototype = new f()`
  4. 修改返回函数的 `prototype` 为绑定函数的 `prototype`，实例就可以继承绑定函数的原型中的值
  5. 函数调用的时候，新传入的参数跟之前提取的参数合并为一个数组
  6. `self.apply( this instanceof F ? this : context, arg )` '是否 new 调用', `this instanceof fBound"`
```js
Function.prototype.newBind = function(){
  if(typeof this !== 'function') throw new Error('no function')
  var context = arguments[0] || window
  var fn = this
  var F = function(){}
  var args = []
  for(let i = 1; i < arguments.length; i++) args.push(arguments[i])
  var bind = function(){
    for(let i = 0; i < arguments.length; i++) args.push(arguments[i])
    context = this instanceof bind ? this : context
    return fn.apply(context, args)
  }
  F.prototype = this.prototype
  bind.prototype = new F()
  bind.prototype.constructor = bind
  return bind
}
```

### `new` 操作符绑定 `(new b())`

`new` 来调用 `b()` 时，会构造一个新对象并把它绑定到 `foo()` 调用中的 `this` 上

```js
function b(a){
  this.a = a
}

console.log(new b(1).a) // 1
```

#### `new` 模拟实现

创建一个用户定义的对象类型实例
1. 先从 `Object.prototype` 克隆一个对象 `obj`
2. `Construtor` 是外部传入的构造器
3. `obj.__proto__ = Construtor.prototype`
4. `ret = Construtor.apply(O, arguments)` 借用构造器给 `obj` 设置属性
5. `ret || obj` 总是返回一个对象

```js
function New(){
  var obj = new Object();
  var Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let ret =Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
```

### 绑定优先级

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

### 按规则判断 `this` 指向

1. 是否 `new` 调用
2. 是否 `call`、`apply`、`bind` 显性绑定
3. 是否是当作某个对象方法调用
4. 其余的都是用默认绑定

### 箭头函数的 `this`

```js
var a = () => {
  console.log(this)
}

var b = {
  c: () => {
    console.log(this)
  },
  d(){
    return () => {
      console.log(this)
    }
  }
}
```

`babel` 编译后，指向就浅而易见了

```js
"use strict";

var _this = void 0;

var a = function a() {
  console.log(_this);
};

var b = {
  c: function c() {
    console.log(_this);
  },
  d: function d() {
    var _this2 = this;

    return function () {
      console.log(_this2);
    };
  }
};
```


[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/this)

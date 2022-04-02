---
title: JavaScript 原型链与继承
tags: 
 - 原型链
 - JavaScript
 - 继承
categories:
 - 技术
comments: true
date: 2022-04-02 13:00
---
# 继承

## 原型链

`prototype` 是函数上的一个属性

`__proto__` 是对象实例上的属性，指向其构造函数的 `prototype` 属性

原型层层往上形成了原型链，需要注意的是

```js
Object.__proto__ === Function.prototype
Function.__proto__ === Function.prototype
(function (){}).__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

// 箭头函数
(() => {}).__proto__ === Function.prototype
(() => {}).prototype === undefined
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d6c39c878d345829b2380b466cff269~tplv-k3u1fbpfcp-watermark.image?)

### ES6 class 相关的原型链相关知识

```js
class A {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true

class B extends A{}

let a = new A()
let b = new B()

B.__proto__ === A
B.prototype.__proto__ === A.prototype

b.__proto__ === B.prototype
b.__proto__.__proto__ === A.prototype
b.__proto__.__proto__ === a.__proto__

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

```

## 原型链继承

通过原型链实现继承

* 缺点
  * 引用类型的属性绘本所有实例共享
  * 创建 `Child` 实例无法向 `Parent` 传参
* 原型链
  * `child.__proto__ -> Child.prototype -> new Parent()`
  * `Child.prototype.constructor -> Parent`

```js
function Parent(){

}
Parent.prototype.sayName = function(){
    console.log(this.name)
}
function Child(name){
    this.name = name
}
Child.prototype = new Parent()

const child = new Child('child')

child.sayName() // child
console.log(child) // Parent { name: 'child' }
console.log(child instanceof Parent) // true
console.log(child instanceof Child) // true
console.log(child.__proto__ === Child.prototype) // true
console.log(Child.prototype.constructor === Parent) // true

```

![原型链继承](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5549975948546de98f5328b39b4df06~tplv-k3u1fbpfcp-watermark.image?)

## 借用构造函数继承

在子类中调用父类的构造函数绑定在子类的 `this` 上

* 优点
  * 避免了引用类型被共享的问题
  * `Child` 可以向 `Parent` 传参
* 缺点
  * 每次创建实例都会创建一遍父类方法
* 原型链
  * `child.__proto__ -> Child.prototype`
  * `Child.prototype.constructor -> Child`

```js
function Parent2(name){
    this.name = name
    this.sayName = function(){
        console.log(this.name)
    }
}
function Child2(name){
    Parent2.call(this, name)
}

var child2 = new Child2('child')

child2.sayName() // child
console.log(child2) // Child2 { name: 'child' }
console.log(child2 instanceof Parent2) // true
console.log(child2 instanceof Child2) // true
console.log(child2.__proto__ === Child2.prototype) // true
console.log(Child2.prototype.constructor === Child2) // true
```

![借用构造函数继承](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a75f474b87d64315a6c46e4587349a01~tplv-k3u1fbpfcp-watermark.image?)

## 组合继承

在子类中调用父类掉构造函数绑定到子类的 `this` 上，把子类的原型等于父类的实例

* 优点
  * 避免引用被共享
  * 不需要重复创建方法
* 缺点
  * 需要多 `new` 一次
* 原型链
  * `child.__proto__ -> Child.prototype`
  * `Child.prototype.constructor -> Child`

```js
function Parent3(name){
    this.name = name
}
Parent3.prototype.sayName = function(){
    console.log(this.name)
}
function Child3(name){
    Parent3.call(this, name)
}
Child3.prototype = new Parent()
Child3.prototype.constructor = Child3

const child3 = new Child3('child3')

child3.sayName() // child3
console.log(child3) // Child3 { name: 'child3' }
console.log(child3 instanceof Parent2) // false
console.log(child3 instanceof Child3) // true
console.log(child3.__proto__ === Child3.prototype) // true
console.log(Child3.prototype.constructor === Child3) // true
```

![组合继承](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a9dd6c2f979449b8a5b4253aff461e0~tplv-k3u1fbpfcp-watermark.image?)

## 原型式继承

将传入的对象作为创建的对象的原型

* 缺点
  * 引用类型被共享
* 原型链
  * `child.__proto__ -> F.prototype -> o`

```js
const P = {
    name: 'P',
    sayName(){
        console.log(this.name)
    }
}
function CreateObj(o){
    function F(){}
    F.prototype = o
    return new F()
}
const child4 = CreateObj(P)

child4.sayName() // P
console.log(child4) // {}
console.log(child4 instanceof Object) // true
console.log(child4.__proto__ === P) // true
```


![原型式继承](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba304926c668430e98ea34a5241de34b~tplv-k3u1fbpfcp-watermark.image?)


## 寄生式继承

创建一个封装继承过程的函数，用来增强对象，然后返回对象

* 缺点
  * 重复创建方法
  * 引用类型共享
* 原型链
  * `child.__proto__ -> o`

```js
const P = {
    name: 'P',
    sayName(){
        console.log(this.name)
    }
}
function CreateObj1(o, name){
    var clone = Object.create(o)
    clone.name = name
    return clone
}

const child5 = CreateObj1(P, 'child5')
child5.sayName() // P
console.log(child5) // {}
console.log(child5 instanceof Object) // true
console.log(child5.__proto__ === P) // true

```

![寄生式继承](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c85db6e2bd5b4f0482cd1037d8fa458a~tplv-k3u1fbpfcp-watermark.image?)

## 寄生组合式继承

* 优点
  * 只调用一次父类构造函数
  * 避免在 `Parent.prototype` 创建不必要多余的属性
  * 原型链保持不变，能正常使用 `instanceof` 和 `isPrototypeOf`
* 原型链
  * `child.__proto__ -> Child.prototype`
  * `Child.prototype.constructor -> Child`

```js
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

function inherit(child, parent){
    const prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}

function Parent6(name){
    this.name = name
}
Parent6.prototype.sayName = function(){
    console.log(this.name)
}

function Child6(name){
    // 增强子类实例
    Parent6.call(this, name)
}
// 绑定原型
inherit(Child6, Parent6)

const child6 = new Child6('child6')

child6.sayName() // child6
console.log(child6) // Child6 { name: 'child6' }
console.log(child6 instanceof Child6) // true
console.log(child6 instanceof Parent6) // true
console.log(child6.__proto__ === Child6.prototype) // true
console.log(Child6.prototype.constructor === Child6) // true
```

![寄生组合式继承](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54b177fc76fc4b348572bfcc53e8514e~tplv-k3u1fbpfcp-watermark.image?)

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/inherit)
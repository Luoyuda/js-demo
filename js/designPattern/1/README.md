---
title: 设计模式 - 笔记 - 创造型设计模式 （JavaScript实现）
tags: 
 - 创造型设计模式
 - JavaScript
categories:
 - 设计模式
comments: true
date: 2022-04-02 13:00
---
# 创造型设计模式

关注怎样创建对象？降低系统的耦合度，使用者不需要关注对象的创建细节，对象的创建由相关的工厂来完成，关注于将对象的创建与使用分离

## 简单工厂模式
	
由一个工厂对象决定创建某一种产品对象类的实例。主要是用来创建同一类对象。通过创建一个新对象包装增强属性后返回对象，主要用来创建同一类对象

* 优点
    * 类包含了所有实现细节
    * 只需要关心参数
* 缺点
    * 种类单一
    * 增加类个数，会增加复杂度和理解难度
    * 扩展困难
    
```js
const PopFactory = function(type, content) {
  const o = new Object()
  // 共用部分
  o.content = content
  o.show = function(){
    console.log(`content: ${this.content}`)
  }
  // 差异部分
  switch(type){
  case 'alert':
    o.hide = function(){
    console.log('alert-hide')
  }
  break;
  case 'prompt':
    o.hide = function(){
    console.log('prompt-hide')
  }
  break;
  case 'confirm':
    o.hide = function(){
    console.log('confirm-hide')
  }
  break;
  }
  // 返回工厂对象
  return o
}
const alert = PopFactory('alert', 'alert-content')
const prompt = PopFactory('prompt', 'prompt-content')
const confirm = PopFactory('confirm', 'confirm-content')

alert.show()
prompt.show()
confirm.show()
alert.hide()
prompt.hide()
confirm.hide()
```

## 工厂方法模式
	
通过对产品类的抽象，使其可以创建多类产品的实例,创建属于同一类，但是又有些许差异性的情况

* 优点
    * 只需要知道具体工厂的名称就可得到所要的产品
    * 无须知道产品的具体创建过程
    * 灵活性增强
    * 典型的解耦框架。高层模块只需要知道产品的抽象类，无须关心其他实现类，满足迪米特法则、依赖倒置原则和里氏替换原则
* 缺点
    * 个数过多，增加复杂度
    * 增加抽象性和理解难度
    * 抽象产品只能生产一种产品

```js
const Factory = function (type, content) {
  if(this instanceof Factory){
    return new this[type](content)
  }else{
    return new Factory(type, content)
  }
}
Factory.prototype.A = function(content){
  this.content = content
  this.type = 'A'
}
Factory.prototype.B = function(content){
  this.content = content
  this.type = 'B'
}
Factory.prototype.C = function(content){
  this.content = content
  this.type = 'C'
}

const a = new Factory('A', 'test')
const b = Factory('B', 'test')
const c = Factory('C', 'test')
```

## 抽象工厂模式
	
通过抽象，使其业务用于对产品类簇的创建，而不负责创建某一类产品，显性的去定义一些功能，而不做具体实现，子类继承后子类负责实现，用于制定类的结构

* 优点
    * 可以在类的内部对产品族中相关联的多等级产品共同管理，而不必专门引入多个新的类来进行管理
    * 当需要产品族时，抽象工厂可以保证客户端始终只使用同一个产品的产品组
    * 抽象工厂增强了程序的可扩展性，当增加一个新的产品族时，不需要修改原代码，满足开闭原则
* 缺点
    * 当产品族中需要增加一个新的产品时，所有的工厂类都需要进行修改。增加了系统的抽象性和理解难度

## 建造者模式
	
将一个复杂对象的构建层与其表示层分离，同样的构建过程采取不一样的表示，关注实例的创造过程，一般用于创建符合对象

* 优点
    * 封装性好，构建和表示分离
    * 扩展性好，各个具体的建造者相互独立，有利于系统的解耦
    * 客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险
* 缺点
    * 产品的组成部分必须相同，这限制了其使用范围
    * 如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大

```js
const VehicleFactory = function(subType, superType) {
  if(typeof VehicleFactory[superType] === 'function'){
    // 继承父类 比如 BWM 继承 Car YUTONG 继承 Bus
    function F() {}
    F.prototype = new VehicleFactory[superType]()
    subType.prototype = new F()
    subType.prototype.constructor = subType
  }else{
    throw new Error('未创建抽象类')
  }
}
VehicleFactory.Car = function(){
  this.type = 'Car'
}
VehicleFactory.Car.prototype.getPrice = function(){
  throw new Error('抽象方法不可调用')
}
VehicleFactory.Car.prototype.getSpeed = function(){
  throw new Error('抽象方法不可调用')
}

VehicleFactory.Bus = function(){
  this.type = 'Bus'
}
VehicleFactory.Bus.prototype.getPrice = function(){
  throw new Error('抽象方法不可调用')
}
VehicleFactory.Bus.prototype.getSpeed = function(){
  throw new Error('抽象方法不可调用')
}

const BMW = function(price, speed){
  this.price = price
  this.speed = speed
}
VehicleFactory(BMW, 'Car')
  BMW.prototype.getPrice = function(){
  return this.type + ' price ' + this.price
}
BMW.prototype.getSpeed = function(){
  return this.type + ' speed ' + this.speed
}
```


```js
const Human = function (params) {
  this.skill = params.skill || '无'
  this.hobby = params.hobby || '无'
}
Human.prototype.getSkill = function() {
  return this.skill
}
Human.prototype.getHobby = function() {
  return this.hobby
}

const Name = function(name) {
  this.wholeName = name
}

const Work = function(work) {
  switch (work) {
    case 'code':
      this.work = '搬砖师'
      this.workDescription = '996警告'
      break;
    case 'ui':
      this.work = 'P图师'
      this.workDescription = '想要五彩斑斓的黑'
      break;
    default:
      this.work = '无业游民'
      this.workDescription = '干一天玩三天'
      break;
  }
}

Work.prototype.changeWork = function(work) {
  this.work = work
}
Work.prototype.changeWorkDescription = function(workDescription) {
  this.workDescription = workDescription
}

const Person = function(name, work, skill, hobby){
  const _person = new Human(skill, hobby)
  _person.name = new Name(name)
  _person.work = new Work(work)
  return _person
}
```

## 原型模式
	
用原型实例指向创建对象的类，使用创建新对象的类共享对象的属性及方法，可以让多个对象分享同一个原型对象上的属性方法

```js
const Person = function(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getName = function() {
  return this.name
}
Person.prototype.getAge = function() {
  return this.age
}

const Woman = function(name, age) {
  Person.call(this, name, age)
}
Woman.prototype = new Person()
Woman.prototype.constructor = Woman
Woman.prototype.getAge = function() {
  return `女人的年龄是秘密`
}
const Man = function(name, age) {
  Person.call(this, name, age)
}
Man.prototype = new Person()
Man.prototype.constructor = Man

const woman = new Woman('小红', 24)
const man = new Man('李白', 24)
```

## 单例模式
	
只允许实例化一个对象类，通过不同的命名空间来组织区分各个模块

* 优点
    * 内存里只有一个实例，减少了内存的开销
    * 可以避免对资源的多重占用
    * 设置全局访问点，可以优化和共享资源的访问
* 缺点
    * 单例模式一般没有接口，扩展困难。如果要扩展，则除了修改原来的代码，没有第二种途径，违背开闭原则
    * 在并发测试中，单例模式不利于代码调试。在调试过程中，如果单例中的代码没有执行完，也不能模拟生成一个新的对象
    * 单例模式的功能代码通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则

```js
const LazySingle = (function (){
  let _instance = null
  function _Single(){
    // 静态变量
    const STATIC_COUNT = 2
    // 单例对象
    return {
      getStaticCount: function (){
        return `静态变量 STATIC_COUNT = ${STATIC_COUNT}`
      },
      publicCount: 3, // 公共变量
    }
  }
  return function (){
    // 惰性返回
    if(!_instance){
      _instance = _Single()
    }
    return _instance
  }
})()
```

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/designPattern/1)

![创造型设计模式.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f08297cb98846e7862a921184079a0b~tplv-k3u1fbpfcp-watermark.image?)

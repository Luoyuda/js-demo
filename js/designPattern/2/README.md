---
title: 设计模式 - 笔记 - 结构型设计模式 （JavaScript实现）
tags: 
 - 结构型设计模式
 - JavaScript
categories:
 - 设计模式
comments: true
date: 2022-04-02 13:00
---

# 创造型设计模式

关注于代码结构的优化，以降低系统耦合

## 外观模式
	
为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口访问子接口，简化使用，通过对接口方法的封装，提供给上层代码使用

* 优点
    * 降低了子系统与客户端之间的耦合度，使得子系统的变化不会影响调用它的客户类
    * 对客户屏蔽了子系统组件，减少了客户处理的对象数目，并使得子系统使用起来更加容易
    * 降低了大型软件系统中的编译依赖性，简化了系统在不同平台之间的移植过程，编译一个子系统不会影响其他的子系统，也不会影响外观对象
* 缺点
    * 不能很好地限制客户使用子系统类，很容易带来未知风险
    * 增加新的子系统可能需要修改外观类或客户端的源代码，违背了“开闭原则”

```js
const Facade = function () {
  // 模拟一个存在差异性的对象
  const obj = {
    value: Math.random() * 2 > 1 ? 0 : 1,
    otherValue: Math.random() * 2 > 1 ? 0 : 1
  }
  return {
    getValue: function(){
      return obj.value || obj.otherValue
    },
    getObj: function(){
      return obj
    }
  }
}
```

## 适配器模式
	
将一个类的接口转换成另一个接口，以满足用户需求，使类中接口不兼容问题得到解决

* 优点
    * 复用了现存的类，程序员不需要修改原有代码而重用现有的适配者类
    * 将目标类和适配者类解耦，解决了目标类和适配者类接口不一致的问题
* 缺点
    * 适配器编写过程需要结合业务场景全面考虑，可能会增加系统的复杂性
    * 增加代码阅读难度，降低代码可读性，过多使用适配器会使系统代码变得凌乱

```js
const extend = function(_default, options) {
  for (const key in _default) {
    if (_default.hasOwnProperty(key)) {
      const element = _default[key];
      options[key] = options[key] || element
    }
  }
  return options
}

// 数据适配器
const adapter = function(arr=[]) {
  return {
    name: arr[0],
    age: arr[1],
  }
}
```

## 代理模式
	
通过一个中介代理两个对象的传递

* 优点
    * 客户端与目标间起到一个中介作用和保护目标对象的作用
    * 代理对象可以扩展目标对象的功能
    * 将客户端与目标对象分离，降低了系统的耦合度，增加可扩展性
* 缺点
    * 会造成系统设计中类的数量增加
    * 增加一个代理对象，会造成请求处理速度变慢
    * 增加了系统的复杂度

```js
const Girl = function(name){
  this.name = name
}

const Boy = function(name){
  this.name = name
  this.sendGift = function(gift, girl){
    console.log(`${this.name} 送 ${gift} 给 ${girl.name}`)
  }
}

const ProxySend = function(boy, girl) {
  this.sendGift = function(gift){
    boy.sendGift(gift, girl)
  }
}
```
## 装饰者模式
	
在不改变对象的基础上，对其进行包装扩展，对原有对象进行一个扩展，是一种良性的扩展

* 优点
    * 装饰器是继承的有力补充，比继承灵活，在不改变原有对象的情况下，动态的给一个对象扩展功能，即插即用
    * 通过使用不用装饰类及这些装饰类的排列组合，可以实现不同效果
    * 装饰器模式完全遵守开闭原则
* 缺点
    * 饰器模式会增加许多子类，过度使用会增加程序得复杂性
                        
```js
const Person = function() {}
Person.prototype.getName = function(a, b, c) {
  console.log('Person-getName',a, b, c)
}
const log = function(a, b, c) {
  console.log('Decorator-',a, b, c)
}
const decorator = function(A, name, fn) {
  var f = A.prototype[name]
  var bind = function(){
    fn.apply(this, arguments)
    return f.apply(this, arguments)
  }
  A.prototype[name] = bind
}
decorator(Person, 'getName', log)
```

## 桥接模式
	
在系统沿着多个维度变化的同时，不增加其复杂度并达到解耦

* 优点
    * 抽象与实现分离，扩展能力强
    * 符合开闭原则
    * 符合合成复用原则
    * 实现细节对客户透明
* 缺点
    * 聚合关系建立在抽象层，要求开发者针对抽象化进行设计与编程，能正确地识别出系统中两个独立变化的维度，增加了系统的理解与设计难度

```js
const Speed = function(x, y){
  this.x = x
  this.y = y
}
Speed.prototype.run = function(x, y){
  console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
  this.x = x
  this.y = y
}
// 颜色单元
const Color = function(color){
  this.color = color
}
Color.prototype.draw = function(){
  console.log(`绘制${this.color}`)
}
// 变形单元
const Shape = function(shape){
  this.shape = shape
}
Shape.prototype.change = function(){
  console.log(`变形 ${this.shape}`)
}
// 说话单元
const Speak = function(){
  
}
Speak.prototype.say = function(word){
  console.log(`${word}`)
}
// 球类
const Ball = function(c, x=0, y=0){
  this.speed = new Speed(x, y)
  this.color = new Color(c)
}
// 精灵类
const Sprite = function(c, x, y, s){
  this.shape = new Shape(s)
  this.speed = new Speed(x, y)
  this.color = new Color(c)
}
// 人类
const Person = function(x, y){
  this.speed = new Speed(x, y)
  this.speak = new Speak()
}
```

## 组合模式
	
部分-整体模式，将对象组合成树形结构以表示部分整体的层次结构

* 优点
    * 组合模式使得客户端代码可以一致地处理单个对象和组合对象，无须关心自己处理的是单个对象，还是组合对象，这简化了客户端代码
    * 更容易在组合体内加入新的对象，客户端不会因为加入了新的对象而更改源代码，满足“开闭原则”
* 缺点
    * 设计复杂，需要花更多时间理清类之间的层次关系
    * 不容易限制容器中的构件
    * 不容易用继承的方法来增加构件的新功能
```js

const El = function(type, content='', children = []) {
  this.type = type
  this.content = content
  this.children = children
}
El.prototype.render = function(){
  return `<${this.type}>
${this.content}
${this.children.reduce((p, i) => p + i.render(), '')}
</${this.type}>`
}
const News = function(){
  this.children = []
  this.element = null
}
News.prototype.init = function(){
  throw new Error('抽象方法')
}
News.prototype.add = function(){
  throw new Error('抽象方法')
}
News.prototype.getElement = function(){
  throw new Error('抽象方法')
}

const inherit = function(child, parent) {
  function F() {}
  F.prototype = new parent()
  child.constructor = child
  child.prototype = new F()
}

const Container = function(id, parent){
  News.call(this)
  this.id = id
  this.parent = parent
  this.init()
}
inherit(Container, News)
Container.prototype.init = function(){
  this.element = new El('ul')
  this.element.id = this.id
  return this
}
Container.prototype.add = function(child){
  this.element.children.push(child)
  return this
}
Container.prototype.getElement = function(){
  return this.element.render()
}

const Item = function(id, parent){
  News.call(this)
  this.id = id
  this.parent = parent
  this.init()
}
inherit(Item, News)
Item.prototype.init = function(){
  this.element = new El('li')
  this.element.id = this.id
  return this
}
Item.prototype.add = function(child){
  this.element.children.push(child)
  return this
}
Item.prototype.getElement = function(){
  return this.element.render()
}

const Group = function(id, parent){
  News.call(this)
  this.id = id
  this.parent = parent
  this.init()
}
inherit(Group, News)
Group.prototype.init = function(){
  this.element = new El('div')
  this.element.id = this.id
  return this
}
Group.prototype.add = function(child){
  this.element.children.push(child)
  return this
}
Group.prototype.getElement = function(){
  return this.element.render()
}

const ImageNews = function(url, href){
  News.call(this)
  this.url = url
  this.href = href
  this.init()
}
inherit(ImageNews, News)
ImageNews.prototype.init = function(){
  this.element = new El('a', this.href)
  this.element.children.push(new El('img', this.url))
  return this
}
ImageNews.prototype.add = function(child){
  this.element.children.push(child)
  return this
}
ImageNews.prototype.getElement = function(){
  return this.element.render()
}

const TextNews = function(content, href){
  News.call(this)
  this.content = content
  this.href = href
  this.init()
}
inherit(TextNews, News)
TextNews.prototype.init = function(){
  this.element = new El('a', this.href)
  this.element.children.push(new El('span', this.content))
  return this
}
TextNews.prototype.add = function(child){
  this.element.children.push(child)
  return this
}
TextNews.prototype.getElement = function(){
  return this.element.render()
}
```
## 享元模式
	
运用共享技术有效支持大量的细粒度的对象，避免对象间拥有相同内容造成多余开销

* 优点
    * 相同对象只要保存一份，这降低了系统中对象的数量，从而降低了系统中细粒度对象给内存带来的压力
* 缺点
    * 为了使对象可以共享，需要将一些不能共享的状态外部化，这将增加程序的复杂性
    * 读取享元模式的外部状态会使得运行时间稍微变长

```js

// 运动单元
const speed = {
  run: function(x, y){
    console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
    this.x = x
    this.y = y
  }
}
// 颜色单元
const color = {
  draw: function(){
    console.log(`绘制${this.color}`)
  }
}
// 变形单元
const shape = {
  change: function(){
    console.log(`变形 ${this.shape}`)
  }
}
// 说话单元
const speak = {
  say: function(word){
    console.log(`${word}`)
  }
}
// 球类
const Ball = function(c, x=0, y=0){
  this.x = x
  this.y = y
  this.color = c
}
Ball.prototype = {
  ...color,
  ...speed,
}

// 精灵类
const Sprite = function(c, x, y, s){
  this.x = x
  this.y = y
  this.color = c
  this.shape = s
}
Sprite.prototype = {
  ...color,
  ...speed,
  ...shape
}

// 人类
const Person = function(x, y){
  this.x = x
  this.y = y
}
Person.prototype = {
  ...speak,
  ...speed,
}
```


[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/designPattern/2)

![结构型设计模式.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f37e8bf3e30347ce937df3fba121507a~tplv-k3u1fbpfcp-watermark.image?)





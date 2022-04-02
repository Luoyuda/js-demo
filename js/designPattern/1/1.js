/*
 * @Author: xiaohuolong
 * @Date: 2021-07-06 15:22:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-06 15:54:47
 * @FilePath: /js-demo/js/designPattern/1.js
 */
// 创建型设计模式
// 简单工厂模式
// 由一个工厂对象决定创建某一种产品对象类的实例。主要是用来创建同一类对象。
// 通过创建一个新对象包装增强属性后返回对象
(() => {
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
});
// 工厂方法模式
// 通过对产品类的抽象，使其可以创建多类产品的实例
(() => {
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
console.log(a)
const b = Factory('B', 'test')
console.log(b)
const c = Factory('C', 'test')
console.log(c)
});

// 抽象工厂模式
// 通过对类的工厂抽象，使其业务用于对产品类簇的创建，而不负责创建某一类产品，显性的去定义一些功能，而不做具体实现，子类继承后子类负责实现。
// 它制定了一个类的结构，子类继承其结构，实现其方法
(() => {
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
  const YUTONG = function(price, speed){
    this.price = price
    this.speed = speed
  }
  VehicleFactory(YUTONG, 'Bus')
  YUTONG.prototype.getPrice = function(){
    return this.type + ' price ' + this.price
  }
  YUTONG.prototype.getSpeed = function(){
    return this.type + ' speed ' + this.speed
  }

  const b1 = new BMW(1,2)
  console.log(b1.getPrice())
  console.log(b1.getSpeed())

  const b2 = new YUTONG(1,2)
  console.log(b2.getPrice())
  console.log(b2.getSpeed())
});

// 建造者模式
// 将一个复杂对象的构建层盒表示层互相分离，同样的构建过程可采用不同的表示
(() => {
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

  const person = Person('陈夏雨', 'code', '搬砖', '')

  console.log(person)
  console.log(person.getHobby())
  console.log(person.getSkill())
  console.log(person.name)
  console.log(person.work)
  person.work.changeWork('ui')
  person.work.changeWorkDescription('放大的同时缩小一点')
  console.log(person.work)
});

// 原型模式
// 用原型指向创建对象的类，使用于创建新对象的类共享原型对象上的属性以及方法
(() => {
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

  console.log(woman)
  console.log(man)
  console.log(woman.getName())
  console.log(woman.getAge())
  console.log(man.getName())
  console.log(man.getAge())
});

// 单例模式
// 只允许实例化一次的对象类，可以使用多个单例，并可以实现命名空间管理代码

(() => {
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

const s1 = LazySingle()
const s2 = LazySingle()
console.log(s1 === s2)
console.log(s1.getPublicCount())
console.log(s1.publicCount = 2)
console.log(s2.getPublicCount())
console.log(s1.getStaticCount())
});
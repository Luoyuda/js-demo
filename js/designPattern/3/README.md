---
title: 设计模式 - 笔记 - 行为型设计模式 （JavaScript实现）
tags: 
 - 行为型设计模式
 - JavaScript
categories:
 - 设计模式
comments: true
date: 2022-04-02 13:00
---

# 行为型设计模式

关注于模块间的沟通

## 模板方法模式
	
父类定义一组操作算法骨架，而将实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤

* 优点
    * 它封装了不变部分，扩展可变部分。它把认为是不变部分的算法封装到父类中实现，而把可变部分算法由子类继承实现，便于子类继续扩展
    * 它在父类中提取了公共的部分代码，便于代码复用
    * 部分方法是由子类实现的，因此子类可以通过扩展方式增加相应的功能，符合开闭原则
* 缺点
    * 对每个不同的实现都需要定义一个子类，这会导致类的个数增加，系统更加庞大，设计也更加抽象，间接地增加了系统实现的复杂度
    * 父类中的抽象方法由子类实现，子类执行的结果会影响父类的结果，这导致一种反向的控制结构，它提高了代码阅读的难度
    * 由于继承关系自身的缺点，如果父类添加新的抽象方法，则所有子类都要改一遍
    
```js
const TemplateCar = function(data = {}){
  this.type = data.type || ''
  this.wheelCount = data.wheelCount || 2
  this.mirrorCount = data.mirrorCount || 2
  this.color = data.color || '白色'
  this.beforeRun = data.beforeRun || this.beforeRun
  this.afterRun = data.afterRun || this.afterRun
}
TemplateCar.prototype.makeWheel = function(count){
  console.log(`正在做出${count}个轮子`)
}
TemplateCar.prototype.makeMirror = function(count){
  console.log(`正在做出${count}个后视镜`)
}
TemplateCar.prototype.makeCarBody = function(color){
  console.log(`正在做出${color}车身`)
}
TemplateCar.prototype.beforeRun = function(){
  console.log(`逮虾户，油门启动`)
}
TemplateCar.prototype.afterRun = function(){
  console.log(`逮虾户，猛踩刹车`)
}
TemplateCar.prototype.run = function(){
  this.beforeRun()
  console.log(`我一路向北，离开有你的地方`)
  this.afterRun()
}
TemplateCar.prototype.init = function(){
  this.makeWheel(this.wheelCount)
  this.makeMirror(this.mirrorCount)
  this.makeCarBody(this.color)
}

const Motorcycle = function(data = {}){
  data.type = 'motorcycle'
  TemplateCar.call(this, data)
  this.init()
}
Motorcycle.prototype = new TemplateCar()

const Car = function(data = {}){
  data.type = 'car'
  data.mirrorCount = 2
  data.wheelCount = 4
  TemplateCar.call(this, data)
  this.init()
}
Car.prototype = new TemplateCar()
Car.prototype.init = function(){
  this.makeWheel(this.wheelCount)
  this.makeMirror(this.mirrorCount)
  this.makeCarBody(this.color)
  console.log(`小汽车组装完毕`)
}

const ToyotaCar = function(data={}){
  this.logo = 'Toyota'
  Car.call(this, data)
}
ToyotaCar.prototype = new Car()

```
## 策略模式
	
将定义的一组算法封装起来，使其相互之间可以替换，封装的算法具有一定的独立性，不会随着客户端变化而变化

* 优点
    * 多重条件语句不易维护，而使用策略模式可以避免使用多重条件语句
    * 提供了一系列的可供重用的算法族，恰当使用继承可以把算法族的公共代码转移到父类里面，从而避免重复的代码
    * 提供相同行为的不同实现，客户可以根据不同时间或空间要求选择不同的
    * 提供了对开闭原则的完美支持，可以在不修改原代码的情况下，灵活增加新算法
    * 把算法的使用放到环境类中，而算法的实现移到具体策略类中，实现了二者的分离
* 缺点
    * 必须理解所有策略算法的区别，以便适时选择恰当的算法
    * 造成很多的策略类，增加维护难度

```js
const Strategy = (function(){
  const _strategy = {
    a(arg){
      console.log(`a -> ${arg}`)
    }
  }
  return {
    check(type, ...args){
      if(!_strategy[type]) return this
      return _strategy[type](...args)
    },
    add(type, fn){
      _strategy[type] = fn
      return this
    }
  }
})()
```

## 职责链模式
	
解决请求点发送者与请求点接受者的耦合，通过链上多个对象分解请求流程，实现请求在多个对象中传递，直到最后一个对象完成处理的请求

* 优点
    * 降低了对象之间的耦合度
    * 增强了系统的可扩展性。可以根据需要增加新的请求处理类，满足开闭原则
    * 增强了给对象指派职责的灵活性
    * 简化了对象之间的连接
    * 只需要处理自己该处理的工作，不该处理的传递给下一个对象完成，明确各类的责任范围，符合类的单一职责原则
* 缺点
    * 不能保证每个请求一定被处理
    * 请求的处理可能涉及多个处理对象，系统性能将受影响
    * 可能会造成循环调用

```js
const Chain = function(fn){
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function(successor){
  return this.successor = successor
}
Chain.prototype.passRequest = function(){
  let ret = this.fn.apply(this, arguments)
  if(ret !== 'successor') return ret
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}
```

## 命令模式
	
将请求与实现解耦并封装成独立对象，从而使得不同的请求对客户端实现参数化

* 优点
    * 通过引入中间件（抽象接口）降低系统的耦合度
    * 扩展性良好，增加或删除命令非常方便。采用命令模式增加与删除命令不会影响其他类，且满足“开闭原则”
    * 与组合模式结合实现宏命令
    * 与备忘录模式结合，实现命令的撤销与恢复
    * 与装饰器模式结合，增加额外功能
* 缺点
    * 可能产生大量具体的命令类。因为每一个具体操作都需要设计一个具体命令类，这会增加系统的复杂性
    * 抽象必然会额外增加类的数量，增加理解成本

```js
const Command = (function(){
  const _command = {
    a(arg){
      console.log(`a -> ${arg}`)
    },
    b(arg){
      console.log(`b -> ${arg}`)
    },
    c(arg){
      console.log(`c -> ${arg}`)
    }
  }
  return {
    execute(commands){
      if(!commands || !commands.length) return this
      commands.forEach(({ command='', params }) => {
        if(!_command[command]) return
        if(typeof params === 'string'){
          params = [params]
        }
        _command[command].apply(this, params)
      })
      console.log(this)
      return this
    }
  }
})()
```

## 访问者模式

针对对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法

* 优点
    * 扩展性好。能够在不修改对象结构中的元素的情况下，为对象结构中的元素添加新的功能
    * 复用性好。可以通过访问者来定义整个对象结构通用的功能，从而提高系统的复用程度
    * 灵活性好。访问者模式将数据结构与作用于结构上的操作解耦，使得操作集合可相对自由地演化而不影响系统的数据结构
    * 符合单一职责原则。访问者模式把相关的行为封装在一起，构成一个访问者，使每一个访问者的功能都比较单一
* 缺点
    * 增加新的元素类很困难。在访问者模式中，每增加一个新的元素类，都要在每一个具体访问者类中增加相应的具体操作，这违背了“开闭原则”
    * 破坏封装。访问者模式中具体元素对访问者公布细节，这破坏了对象的封装性
    * 违反了依赖倒置原则。访问者模式依赖了具体类，而没有依赖抽象类

```js
const ArrayVisitor = (function(){
  return {
    splice(){
      var args = Array.prototype.splice.call(arguments, 1)
      return Array.prototype.splice.apply(arguments[0], args)
    }
  }
})()
```

## 中介者模式

通过中介者对象封装一系列对象之间的交互，使对象之间不再互相引用，降低他们之间的耦合

* 优点
    * 类之间各司其职，符合迪米特法则
    * 降低了对象之间的耦合性，使得对象易于独立地被复用
    * 将对象间的一对多关联转变为一对一的关联，提高系统的灵活性，使得系统易于维护和扩展
* 缺点
    * 中介者模式将原本多个对象直接的相互依赖变成了中介者和多个同事类的依赖。当同事类越多时，中介者就会越臃肿，变得复杂且难以维护

```js
const Mediator = (function () {
  let _msg = {}
  return {
    register(type, action){
      if(_msg[type]){
        _msg[type].push(action)
      }else{
        _msg[type] = [action]
      }
    },
    send(type){
      if(_msg[type]){
        _msg[type].forEach(fn => {
          fn()
        })
      }
    }
  }
})()
```

## 备忘录模式

在不破坏对象封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态

* 优点
    * 提供了一种可以恢复状态的机制。当用户需要时能够比较方便地将数据恢复到某个历史的状态
    * 实现了内部状态的封装。除了创建它的发起人之外，其他对象都不能够访问这些状态信息
    * 简化了发起人类。不需要管理和保存其内部状态的各个备份，所有状态信息都保存在备忘录中，并由管理者进行管理，这符合单一职责原则
* 缺点
    * 资源消耗大。如果要保存的内部状态信息过多或者特别频繁，将会占用比较大的内存资源


```js
const Data = (function () {
  const _cache = {}
  return {
    getData(type, callback=()=>{}){
      if(_cache[type]) return callback(_cache[type])
      const timer = setTimeout(() => {
        const data = Math.random() * 10
        _cache[type] = data
        callback(data)
      }, 1000 * Math.random())
    }
  }
})()
```

## 迭代器模式
	
在不暴露对象内部结构的情况下，可以顺序访问聚合对象内部的元素

* 优点
    * 访问一个聚合对象的内容而无须暴露它的内部表示
    * 遍历任务交由迭代器完成，这简化了聚合类
    * 它支持以不同方式遍历一个聚合，甚至可以自定义迭代器的子类以支持新的遍历
    * 增加新的聚合类和迭代器类都很方便，无须修改原有代码
    * 封装性良好，为遍历不同的聚合结构提供一个统一的接口
* 缺点
    * 增加了类的个数，这在一定程度上增加了系统的复杂性

```js
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
```

## 解释器模式
	
通过一定的文法对应定义一个解释器，通过解释器解释语言的意思

* 优点
    * 扩展性好。由于在解释器模式中使用类来表示语言的文法规则，因此可以通过继承等机制来改变或扩展文法
    * 容易实现。在语法树中的每个表达式节点类都是相似的，所以实现其文法较为容易
* 缺点
    * 执行效率较低。解释器模式中通常使用大量的循环和递归调用，当要解释的句子较复杂时，其运行速度很慢，且代码的调试过程也比较麻烦
    * 会引起类膨胀。解释器模式中的每条规则至少需要定义一个类，当包含的文法规则很多时，类的个数将急剧增加，导致系统难以管理与维护
    * 可应用的场景比较少。在软件开发中，需要定义语言文法的应用实例非常少，所以这种模式很少被使用到

```js
const Play = (function () {
  const _str = {
    'up': '向上',
    'down': '向下',
    'left': '向左',
    'right': '向右',
    'move': '移动', 
    'jump': '跳'
  }
  return {
    exec(strings){
      strings = strings.split(' ')
      if(!strings || !strings.length) return this
      let text = ''
      strings.forEach(str => {
        text += _str[str] || str
      })
      console.log(text)
      return this
    }
  }
})()
```

## 状态模式
	
根据不同的状态做出不同的行为，状态驱动行为，行为决定状态

* 优点
    * 结构清晰，状态模式将与特定状态相关的行为局部化到一个状态中，并且将不同状态的行为分割开来，满足“单一职责原则”
    * 将状态转换显示化，减少对象间的相互依赖。将不同的状态引入独立的对象中会使得状态转换变得更加明确，且减少对象间的相互依赖
    * 状态类职责明确，有利于程序的扩展。通过定义新的子类很容易地增加新的状态和转换
* 缺点
    * 使用必然会增加系统的类与对象的个数
    * 结构与实现都较为复杂，如果使用不当会导致程序结构和代码的混乱
    * 对开闭原则的支持不太好，对于可以切换状态的状态模式，增加新的状态类需要修改那些负责状态转换的源码，否则无法切换到新增状态，而且修改某个状态类的行为也需要修改对应类的源码

```js
var Light = function() {
  this.state = 'off' // 电灯初始状态 off
  this.button = null // 电灯开关按钮
}
Light.prototype.init = function () {
  var button = document.createElement('button'),self = this;
  button.innerHTML = '开关';
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.buttonWasPressed();
  }
};
Light.prototype.buttonWasPressed = function () {
  if (this.state === 'off') {
    console.log('开灯');
    this.state = 'on';
  } else if (this.state === 'on') {
    console.log('关灯');
    this.state = 'off';
  }
};
var light = new Light();
light.init();
```

## 观察者模式
	
指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，依赖于它的对象都得到通知并被自动更新，在观察者模式中有两个主要角色：Subject（主题）和 Observer（观察者）

* 优点
    * 降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。符合依赖倒置原则
    * 目标与观察者之间建立了一套触发机制
* 缺点
    * 目标与观察者之间的依赖关系并没有完全解除，而且有可能出现循环引用
    * 当观察者对象很多时，通知的发布会花费很多时间，影响程序的效率

```js
class Observer {
  constructor(name){
    this.name = name
  }
  notify(){
    console.log(`${this.name} has been notified`)
  }
}
class Subject {
  observers = []
  addObserver(observer){
    console.log(observer.name, 'is push')
    this.observers.push(observer)
  }
  deleteObserver(observer){
    console.log('remove observer: ', observer.name)
    this.observers = this.observers.filter(o => o !== observer)
  }
  notifyObservers(){
    console.log('notify')
    this.observers.forEach(o => o.notify())
  }
}
```

## 发布订阅模式

发送者（称为发布者）不会将消息直接发送给接收者（称为订阅者）。而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者

* 优点
    * 对象之间解耦
    * 异步编程中，可以更松耦合的代码编写
* 缺点
    * 创建订阅者本身要消耗一定的时间和内存
    * 虽然可以弱化对象之间的联系，多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护

```js
class Event{
  constructor(){
    this.cache = {}
    return this
  }
  on(type, event){
    if(!this.cache[type]) this.cache[type] = []
    if(this.cache[type].indexOf(event) == -1){
      this.cache[type].push(event)
    }
    return this
  }
  off(type, event){
    if(!this.cache[type]) return this
    this.cache[type] = this.cache[type].filter(e => e !== event)
    return this
  }
  once(type, event){
    let _event = function(){
      event.apply(this, arguments)
      this.off(type, _event)
    }
    this.on(type, _event)
    return this
  }
  emit(){
    let type = arguments[0]
    let args = Array.prototype.slice.call(arguments, 1)
    let list = this.cache[type] || []
    for (const event of list) {
      event.apply(this, args)
    }
    return this
  }
}
```

### 与观察者模式的差异

* 观察者模式
    * 观察者是知道 Subject 的，Subject 一直保持对观察者进行记录
    * 紧耦合
    * 大部分情况是同步的
* 发布订阅
    * 发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信
    * 松耦合
    * 大部分情况是异步的

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/designPattern/3)

![行为型设计模式.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93b8cb04d9164f3ba23bb8ddccb8d8bc~tplv-k3u1fbpfcp-watermark.image?)
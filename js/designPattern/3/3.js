/*
 * @Author: xiaohuolong
 * @Date: 2021-07-06 16:46:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-06 17:18:34
 * @FilePath: /js-demo/js/designPattern/3.js
 */
// 行为型设计模式
// 模板方法模式
// 父类定义一组操作算法骨架，而将实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤
(() => {
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

  const motorcycle = new Motorcycle()
  motorcycle.run()
  console.log(motorcycle.type)

  const car = new Car({
    beforeRun(){
        console.log(`w启动了`)
    },
    afterRun(){
        console.log(`没有人能追得上我`)
    }
  })
  car.run()
  console.log(car.type)

  const toyotaCar = new ToyotaCar({
    beforeRun(){
        console.log(`丰田启动`)
    },
    afterRun(){
        console.log(`没有人能追得上我的脚步`)
    }
  })
  toyotaCar.run()
  console.log(toyotaCar.logo + toyotaCar.type)
});
// 策略模式
// 将定义的一组算法封装起来，使其相互之间可以替换，封装的算法具有一定的独立性，不会随着客户端变化而变化。
(() => {
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

Strategy.check('a', 123)
Strategy.add('b', (arg) => {
  return console.log(`b -> ${arg}`)
})
Strategy.check('b', 123)
});

// 职责链模式
// 解决请求点发送者与请求点接受者的耦合，通过职责链上多个对象分解请求流程，实现请求在多个对象中传递，直到最后一个对象完成处理的请求
(() => {
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

  const aFn = function(count){
    console.log(count)
    if(count < 70) return console.log('谢谢参与')
    return 'successor'
  }

  const bFn = function(count){
    if(count < 80) return console.log('得了三等奖')
    return 'successor'
  }

  const cFn = function(count){
    if(count < 90) return console.log('得了二等奖')
    return 'successor'
  }

  const dFn = function(count){
    if(count < 100) return console.log('得了一等奖')
    return 'successor'
  }

  const lottery = new Chain(aFn)
  const lottery1 = new Chain(bFn)
  const lottery2 = new Chain(cFn)
  const lottery3 = new Chain(dFn)
  lottery.setNextSuccessor(lottery1)
  lottery1.setNextSuccessor(lottery2)
  lottery2.setNextSuccessor(lottery3)
  lottery.passRequest(19)
  lottery.passRequest(70)
  lottery.passRequest(80)
  lottery.passRequest(90)
});

// 命令模式
// 将请求与实现解耦并封装成独立对象，从而使得不同的请求对客户端实现参数化
(() => {
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

  Command
  .execute([])
  .execute([{
    command: 'a',
    params: ['a']
  },
  {
    command: 'b',
    params: ['b']
  },
  {
    command: 'c',
    params: 'c'
  },
  {
    command: 'd',
    params: 'c'
  }])
});

// 访问者模式
// 针对对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
(() => {
  const ArrayVisitor = (function(){
    return {
      splice(){
        var args = Array.prototype.splice.call(arguments, 1)
        return Array.prototype.splice.apply(arguments[0], args)
      }
    }
  })()

  console.log(ArrayVisitor.splice({'0':1, '1': '2', '2': '3', length: '3'},1))
  console.log(ArrayVisitor.splice([1,2,3],1))
});

// 中介者模式
// 通过中介者对象封装一系列对象之间的交互，使对象之间不再互相引用，降低他们之间的耦合。
(() => {
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

  Mediator.register('demo', () => {
    console.log('first')
  })
  Mediator.send('demo')
  Mediator.register('demo', () => {
    console.log('second')
  })
  Mediator.send('demo')
});

// 备忘录模式
// 在不破坏对象封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态
(() => {
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

  Data.getData('test',(data)=> {
    console.log(data)
    // 取缓存数据
    Data.getData('test',console.log)
  })
});

// 迭代器模式
// 在不暴露对象内部结构的情况下，可以顺序访问聚合对象内部的元素
(() => {
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
});

// 解释器模式
// 通过一定的文法对应定义一个解释器，通过解释器解释语言的意思
(() => {
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
  Play.exec('up move 5 move 10 left jump 1 right jump 10 down left jump 10')
//向上移动5移动10向左跳1向右跳10向下向左跳10
})();

(() => {
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
    
});

(() => {
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
});

(() => {
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
});
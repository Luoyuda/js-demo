<!--
 * @Author: xiaohuolong
 * @Date: 2021-07-04 15:11:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-04 17:19:12
 * @FilePath: /js-demo/js/README.md
-->
# js代码整理

## call apply bind new 模拟实现

```js
/**
使用一个指定的this值调用某个函数
    1. 将函数设为对象属性
    2. 执行函数
    3. 删除该对象属性
 */
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
/*
使用一个指定的this值调用某个函数
    1. 将函数设为对象属性
    2. 执行函数
    3. 删除该对象属性
*/
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

```js
/*
创建一个新函数，使用第一个参数作为运行新函数的 this  其他参数作为新函数的入参
    1. 取出入参
    2. 新建一个函数 F() 作为参数返回值
    3. 创建一个 函数 f() f.prototype = this.prototype F.prototype = new f()
    4. 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    5. 函数调用的时候，新传入的参数跟之前提取的参数合并为一个数组
    6. self.apply( this instanceof F ? this : context, arg ) '是否 new 调用', this instanceof fBound"
*/
Function.prototype.newBind = function(){
    if(typeof this !== 'function') throw new Error('no function')
    var context = arguments[0] || window
    var fn = this
    var args = []
    for(let i = 1; i < arguments.length; i++) args.push(arguments[i])
    var bind = function(){
        for(let i = 0; i < arguments.length; i++) args.push(arguments[i])
        context = this instanceof bind ? this : context
        return fn.apply(context, args)
    }
    var F = function(){}
    F.prototype = this.prototype
    bind.prototype = new F()
    return bind
}
```

```js
/*
创建一个用户定义的对象类型实例
    1. 先从 Object.prototype 克隆一个对象 O
    2. Construtor 是外部传入的构造器
    3. O.__proto__ = Construtor.prototype
    4. ret = Construtor.apply(O, arguments) 借用构造器给obj设置属性
    5. ret || O 总是返回一个对象
*/
function New(){
    var obj = new Object();
    var Constructor = Array.prototype.shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    let ret =Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}
```

## 防抖节流

```js
/*
无论触发多少次，都是 N 秒后执行
    1. 定义一个定时器 变量
    2. 函数内，获取 this 参数
    3. 函数内，设置定时器
    4. 返回一个包装后的函数
*/
function debounce(fn, wait, immediate) {
    var timeout, result
    var debounced = function(){
        var context = this
        var args = arguments
        // 如果存在，取消后 wait 秒后再调用
        if(timeout) clearTimeout(timeout)
        if(immediate){
            // 立即触发
            // 如果没有触发过，则直接触发
            var caller = !timeout
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            if(caller) result = fn.apply(context, args)
        }else{
            timeout = setTimeout(function(){
                result = fn.apply(context, args)
                timeout = null
            }, wait)
        }
        return result
    }
    // 取消
    debounced.cancel = function(){
        if(timeout) clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
```

```js
/*
一段时间内无论触发多少次，只执行一次
    1. 定义一个下次触发时间的变量
    2. 通过设置当前时间戳 + 时间间隔的方式来控制是否触发事件
*/
// 时间戳实现，会立刻执行，停止触发后没有办法再执行事件
function throttle(fn, wait){
    var prev = 0
    var throttled = function(){
        var now = +new Date()
        var context = this
        var args = arguments
        if(now - prev > wait){
            fn.apply(context, args)
            prev = now
        }
    }
    return throttled
}
// 定时器实现 n 秒后第一次执行，停止触发后依然会再执行一次事件
function throttle(fn, wait){
    var timeout
    var throttled = function(){
        var context = this
        var args = arguments
        if(!timeout){
            timeout = setTimeout(function(){
                timeout = null
                fn.apply(context, args)
            }, wait)
        }
    }
    return throttled
}
/**
 * 
 * @param {function} fn 执行方法
 * @param {number} wait 等待时间
 * @param {配置} options leading：是否允许立即执行 trailing：是否允许最后一次执行
 * @returns 
 */
function throttle(fn, wait, options) {
    options = options || {}
    var result, context, args, timeout
    var prev = 0
    var later = function(){
        prev = options.leading === false ? 0 : +new Date()
        timeout = null
        result =fn.apply(context, args)
    }
    var t = function(){
        var now = +new Date()
        prev = !prev && options.leading === false ? now : prev
        var r = wait - (now - prev)
        context = this
        args = arguments
        if(r > wait || r <= 0){
            if(timeout){
                clearTimeout(timeout)
                timeout = null
            }
            prev = now
            result = fn.apply(context, args)
        }else if(!timeout && options.trailing !== false){
            timeout = setTimeout(later, r)
        }
        return result
    }
    t.cancel = function(){
        clearTimeout(timeout)
        timeout = null
        prev = 0
    }
    return t
}
```

## promise

```js
// 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	// 状态: 初始状态为 pending
	status = PENDING
	// 值
	value = null
	// 原因
	reason = null
	// 执行 onFulfilled 的队列
	onFulfilledCallbacks = []
	// 执行 onRejected 的队列
	onRejectedCallbacks = []
	// 构造方法
	constructor(executor){
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}
	resolve = value => {
		// 判断是否状态处于等待状态
		if(this.status === PENDING){
			// 改变状态
			this.status = FULFILLED
			// 赋值
			this.value = value
			// 循环调用
			while(this.onFulfilledCallbacks.length){
				this.onFulfilledCallbacks.shift()(this.value)
			}
		}
	}
	reject = reason => {
		// 判断是否状态处于等待状态
		if(this.status === PENDING){
			// 更改状态
			this.status = REJECTED
			// 赋值原因
			this.reason = reason
			// 循环调用
			while(this.onRejectedCallbacks.length){
				this.onRejectedCallbacks.shift()(this.reason)
			}
		}
	}
	then(onFulfilled, onRejected){
		// 可选参数
		const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
		const promise1 = new MyPromise((resolve, reject) => {
			// 创建一个微任务执行完成的函数
			const fulfilledMicrotask = () => {
				queueMicrotask(() => {
					try{
						let x = realOnFulfilled(this.value)
						resolvePromise(promise1, x, resolve, reject)
					}catch (error) {
						reject(error)
					}
				})
			}
			// 创建一个微任务执行拒绝的函数
			const rejectMicrotask = () => {
				queueMicrotask(() => {
					try{
						let x = realOnRejected(this.reason)
						resolvePromise(promise1, x, resolve, reject)
					}catch (error) {
						reject(error)
					}
				})
			}
			// 状态确定后直接执行
			if(this.status == FULFILLED){
				fulfilledMicrotask()
			}else if(this.status == REJECTED){
				rejectMicrotask()
			}else{
				// 异步，加入队列
				this.onFulfilledCallbacks.push(fulfilledMicrotask)
				this.onRejectedCallbacks.push(rejectMicrotask)
			}
		})
		// then 返回一个新的 promise
		return promise1
	}
	// catch 方法
	catch (onRejected) {
		this.then(null, onRejected)
	}
	// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
	finally(fn) {
		return this.then(value => {
			return MyPromise.resolve(fn()).then(() => {
				return value
			})
		}, reason => {
			return MyPromise.resolve(fn()).then(() => {
				return reason
			})
		})
	}
	// 有时需要将现有对象转为 Promise 对象，状态为 fulfilled
	static resolve(parameter){
		// 如果传入一个 promise 对象，直接返回
		if(parameter instanceof MyPromise){
			return parameter
		}
		return new MyPromise(resolve => {
			resolve(parameter)
		})
	}
	// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected
	static reject(reason){
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}
	// all 方法，全部成功的时候返回
	static all(promiseList){
		return new MyPromise((resolve, reject) => {
			let count = 0
			let length = promiseList.length
			let result = []
			if(length === 0) return resolve(result)
			for(let i = 0; i < length; i++){
				MyPromise.resolve(promiseList[i]).then(value => {
					count++
					results[i] = value
					// 全部成功
					if(count === length) resolve(result)
				}, reason => {
					// 一次失败
					reject(reason)
				})
			}
		})
	}
	// race 方法 只有一次成功就返回
	static race(promiseList){
		return new MyPromise((resolve, reject) => {
			let length = promiseList.length
			if(length === 0) return resolve()
			for (let i = 0; i < length; i++) {
				MyPromise.resolve(promiseList[i]).then(value => {
					return resolve(value)
				}, reason => {
					return reject(reason)
				})
			}
		})
	}
	// 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，
	static allSettled(promiseList){
		return new MyPromise((resolve, reject) => {
			let count = 0
			let length = promiseList.length
			let result = []
			if(length === 0) return resolve(result)
			for (let i = 0; i < length; i++) {
				MyPromise.resolve(promiseList[i]).then(value => {
					count++;
					result[i] = {
						value,
						status: FULFILLED
					}
					if(count === length) resolve(result)
				}, reason => {
					count++;
					result[i] = {
						reason,
						status: REJECTED
					}
					if(count === length) resolve(result)
				})
			}
		})
	}
}

function resolvePromise(promise, x, resolve, reject){
	if(x === promise){
		// 循环调用，直接报错
		return reject(new TypeError('The promise and the return value are the same'));
	}
	if(typeof x === 'function' || typeof x === 'object'){
		// null 直接返回
		if(x === null) return resolve(x)

		let then
		try {
			then = x.then
		} catch (error) {
			// 不存在直接拒绝
			return reject(error)
		}
		// 如果对象上面存在 then 方法
		if(typeof then === 'function'){
			let called = false
			try {
				then.call(x, y => {
					// 执行多次忽略
					if(called) return
					called = true
					// 接着执行
					resolvePromise(promise, y, resolve, reject)
				}, r => {
					// 执行多次忽略
					if(called) return
					called = true
					reject(r)
				})
			} catch (error) {
				// 
				if(called) return
				called = true
				reject(error)
			}
		}else{
			// then 不是函数
			resolve(x)
		}
	}else{
		// 如果 x 不为对象或者函数，直接用 x 为参数执行 promise
		resolve(x)
	}
}
```

## curry compose pipe partial

```js
// add(1, 2, 3) => add = curry(add) add(1, 2, 3) = add(1)(2)(3) = add(1)(2, 3) = ...
function curry(fn, args){
    var length = fn.length
    args = args || []
    return function(){
        var _args = args.slice().concat(Array.prototype.slice.call(arguments))
        if(_args.length < length){
            return curry.call(this, fn, _args)
        }else{
            return fn.apply(this, _args)
        }
    }
}
```
```js
// a(b(c(d))) => compose(c, b, a)(d)
function compose(){
    var args = arguments
    var start = args.length
    return function(){
        var result = args[--start].apply(this, arguments)
        while(start--) result = args[start].call(this, result)
        return result
    }
}
```

```js
// a(b(c(d))) => pipe(a, b, c)(d)
function pipe(){
    var args = arguments
    var start = 0
    return function(){
        var result = args[start++].apply(this, arguments)
        while(start < args.length){
            result = args[start++].call(this, result)
        }
        return result
    }
}
```

```js
// partial(func, _, 'b', _, 'd')('a', 'c')
var _ = {}
function partial(){
    var fn = arguments[0]
    var args = Array.prototype.slice.call(arguments, 1)
    var bind = function(){
        var position = 0
        _args = args.slice(0)
        var len = _args.length
        for(var i = 0; i < len; i++){
            _args[i] = _args[i] === _ ? arguments[position++] : _args[i]
        }
        while(position < arguments.length) _args.push(arguments[position++])
        return fn.apply(this, _args)
    }
    inherit(fn, bind)
    return bind
}

function inherit(parent, child){
    var F = function(){}
    F.prototype = parent.prototype
    child.prototype = new F()
}
```

## 发布订阅 EventEmitter & 观察者模式 Observer

```js
/*
    一对多
    消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。
    而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者。
*/
class EventEmitter{
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

```js
/*
观察者模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
在观察者模式中有两个主要角色：Subject（主题）和 Observer（观察者）。
*/
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

## inherit

```js
/**
 * 原型链继承
 * 缺点
 * 引用类型的属性被所有实例共享
 * 创建 Child 实例无法向 Parent 传参
 * child.__proto__ === Child.prototype === new Parent
 * child.__proto__.constructor === Parent
*/
function Parent(){
    this.name = 'Parent'
}
Parent.prototype.say = function(){
    console.log(this.name)
}

function Child(){

}

Child.prototype = new Parent()

var child = new Child()
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Parent) // true
child.say()
```

```js
/**
 * 借用构造函数继承
 * 优点
 * 避免了引用类型被共享的问题
 * Child 可以向 Parent 传参
 * 缺点
 * 每次创建实例都会创建一遍父类方法
 * child.__proto__ === Child.prototype
 * child.__proto__.constructor === Child
 */
function Parent(name){
    this.name = name
    this.say = function(){
        console.log(this.name)
    }
}

function Child(){
    Parent.apply(this, arguments)
}

var child = new Child('child')
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Child) // true
child.say() // child
```

```js
/**
 * 组合模式
 * 优点：
 * 避免了引用被共享
 * 不需要重复创建方法
 * 缺点：
 * 需要多 new 一次
 */
function Parent(name){
    this.name = name
}
Parent.prototype.say = function(){
    console.log(this.name)
}
function Child(name){
    Parent.apply(this, arguments)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
var child = new Child('child')
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Child) // true
child.say() // child
```

```js
/**
 * 原型式继承
 * 缺点
 * 引用类型共享
 * child.__proto__ === parent
 * child.__proto__.constructor === Object
 */
function CreateObj(o){
    function F(){}
    F.prototype = o
    return new F()
}
var parent = {
    name: 'parent',
    say: function(){
        console.log(this.name)
    }
}
var child = CreateObj(parent)
child.say()
console.log(child.__proto__ === parent)
console.log(child.__proto__.constructor === Object)
```

```js
/**
 * 寄生式继承
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
 */
function CreateObj(o){
    function F(){}
    F.prototype = o
    return new F()
}
var parent = {
    name: 'parent',
    say: function(){
        console.log(this.name)
    }
}
var Child = function(o, name){
    var clone = CreateObj(o)
    clone.name = name
    return clone
}
var child = Child(parent, 'child')
child.say()
console.log(child.__proto__ === parent)
console.log(child.__proto__.constructor === Object)
```

```js
/**
 * 寄生组合式继承
 * 优点
 * 只调用了一次父类的构造函数
 * 避免了在 Parent.prototype 上面创建不必要的、多余的属性
 * 原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf
 */
function inherit(Child, Parent){
    function F(){}
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
}
function Parent(name){
    this.name = name
}
Parent.prototype.say = function(){
    console.log(this.name)
}
function Child(){
    Parent.apply(this, arguments)
}
inherit(Child, Parent)
var child = new Child('child')
child.say()
console.log(child.__proto__ === Child.prototype)
console.log(child.__proto__.constructor === Child)
```

## create object

```js
/*
工厂模式
函数 factory 能够接受参数来构建一个包含必要信息的对象，可以无数次的调用这个函数。而每次都返回一个对象
优点：
    批量生成相似对象
缺点：
    对象指向同一个原型 ，生成对象无法识别
    每个方法都需要创建一次
*/
function factory(name, age){
    var o = new Object()
    o.name = name
    o.age = age
    o.say = function(){
        console.log(`name=${this.name}, age=${this.age}`)
    }
    return o
}

var a = factory('a', 20)
var b = factory('b', 10)
a.say()
b.say()
```

```js
/*
构造函数模式
通过构造函数来创建特定类型的对象 要通过 new 操作符
优点：
    实例都可以被识别成一种特定类型
缺点：
    每次创建实例 每个实例方法都需要被创建一次
*/

function create(name, age){
    this.name = name
    this.age = age
    this.say = function(){
        console.log(`name=${this.name}, age=${this.age}`)
    }
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()
```

```js
/*
原型模式
每个函数都有一个 prototype，可以使用原型对象，让所有的对象实例共享它所包含的属性方法
优点：
    方法不会重复创建
缺点：
    所有属性方法共享，不能初始化参数
*/
function Prototype(){

}
Prototype.prototype = {
    constructor: Prototype,
    name: 'a',
    say:function(){
        console.log(this.name)
    }
}

var a = new Prototype()
var b = new Prototype()
a.say()
b.say()
```

```js
/*
组合模式
构造函数跟原型模式双剑合璧。构造函数模式用于定义实例属性，原型属性定义方法和共享属性。
优点
    该共享的共享，该私有的私有
缺点
    封装性不足
*/

function Create(name, age){
    this.name = name;
    this.age = age;
}
Create.prototype.say = function(){
    console.log(`name=${this.name}, age=${this.age}`)
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()
```

```js
/*
动态原型模式
为了解决独立的构造函数和原型，动态原型模式，把信息封装到构造函数中，而且通过在构造函数初始化原型
优点：
    组合模式的优点，且封装性更好
缺点：
    多判断一次
*/

function CreatePrototype(name, age){
    this.name = name
    this.age = age
    if(typeof this.say !== 'function'){
        CreatePrototype.prototype.say = function(){
            console.log(`name=${this.name}, age=${this.age}`)
        }
    }
}

var a = new CreatePrototype('a', 20)
var b = new CreatePrototype('b', 10)
a.say()
b.say()
```

```js
/*
寄生构造函数模式
创建一个函数，该函数的作用仅仅在封装创建对象的代码，然后返回新创建的对象
缺点：
    工厂模式 + new
*/

function NewFactory(name, age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.say = function () {
        console.log(`name=${this.name}, age=${this.age}`)
    };
    return o;
}

var a = new NewFactory('a', 20)
var b = new NewFactory('b', 10)
a.say()
b.say()
```

```js
/*
稳妥函数模式
那些没有公共属性，而且其方法不引用this
优点：
    不需要 new 不引用 this
缺点：
    生成对象无法识别
*/

function StaticCreate(name, age){
    var o = new Object()
    o.say = function () {
        console.log(`name=${name}, age=${age}`)
    }
    return o
}

var a = new StaticCreate('a', 20)
var b = new StaticCreate('b', 10)
a.say()
b.say()
```

## instanceof

```js
function instanceOf(l, r){
    while(true){
        if(l === null) return false
        if(l.__proto__ === r.prototype) return true
        l = l.__proto__
    }
}
```

## 相等判断

```js
function eq(a, b, aStack, bStack){
    if(a === b) return a !== 0 || 1 / a === 1 / b
    if(a === null || b === null) return false
    if(a !== a) return b !== b
    var type = typeof a
    if(type !== 'object' && type !== 'function' && typeof b !== 'object') return false
    return deepEq(a, b, aStack, bStack)
}

function deepEq(a, b, aStack, bStack){
    var type = Object.prototype.toString.call(a)
    if(type !== Object.prototype.toString.call(b)) return false

    switch (type) {
        case '[object Number]':
            if(+a !== +a) return +b !== +b
            return +a === +b && 1 / a === 1 / b
        case '[object String]':
        case '[object RegExp]':
            return '' + a === '' + b
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b
        case '[object Symbol]':
            return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b)            
        default:
            break;
    }

    var areArrays = type === '[object Array]';
    if(!areArrays){
        if(typeof a !== 'object' && typeof b !== 'object') return false
        var aCtor = a.constructor
        var bCtor = b.constructor
        if(aCtor !== bCtor
            && !(typeof aCtor === 'function' && typeof bCtor === 'function' && aCtor instanceof aCtor && bCtor instanceof bCtor)
            && ('constructor' in a && 'constructor' in b)
        ) return false
    }

    aStack = aStack || []
    bStack = bStack || []
    var length = aStack.length
    if(length !== bStack.length) return false
    while(length--) if(aStack[length] === a) return bStack[length] === b

    aStack.push(a)
    bStack.push(b)
    if(areArrays){
        length = a.length
        if(length !== b.length) return false
        while(length--) if(!eq(a[length], b[length], aStack, bStack)) return false
    }else{
        var keys = Object.keys(a)
        length = keys.length
        if(length !== Object.keys(b).length) return false
        while(length--) if(!eq(a[keys[length]], b[keys[length]], aStack, bStack)) return false
    }
    aStack.pop()
    bStack.pop()
    return true
}
```

## 去重

```js
/**
 * 去重
 * @param {[]} array 待去重数组
 * @param {Boolean} isSorted 是否排序
 * @param {function} iteratee 比较函数
 * @param {object} context 作用域
 */
function unique(array, isSorted, iteratee, context){
    if(typeof isSorted !== 'boolean'){
        context = iteratee
        iteratee = isSorted
        isSorted = false
    }
    if(isSorted == true){
        iteratee = function(value){ return value }
    }else if(typeof iteratee !== 'function'){
        iteratee = function(value){
            value = value instanceof RegExp ? value.toString() : value
            var key = (typeof value) + JSON.stringify(value)
            if(this[key]) return false
            this[key] = true
            return true
        }
    }
    iteratee = iteratee.bind(context || {})
    var result = []
    var last
    for(var i = 0; i < array.length; i++){
        var value = array[i]
        var computed = iteratee(value, i, array)
        if(isSorted){
            if(!i || last !== computed) result.push(value)
            last = value
        }else{
            if(computed) result.push(value)
        }
    }
    return result
}
```

## 冒泡排序

```js
/**
最外层的 for 循环每经过一轮，
剩余数字中的最大值就会被移动到当前轮次的最后一位，
中途也会有一些相邻的数字经过交换变得有序。
总共比较次数是 (n-1)+(n-2)+(n-3)+…+1(n−1)+(n−2)+(n−3)+…+1。
这种写法相当于相邻的数字两两比较，并且规定：“谁大谁站右边”。
经过 n-1n−1 轮，数字就从小到大排序完成了。
 */
/**
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 * @returns {[Number]}
 */
var bubbleSort = (arr) => {
    let n = arr.length
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if(arr[j] > arr[j + 1]){
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}
// 冒泡排序改进版：如果某一趟没有发生交换，则提前跳出
var bubbleSort = arr => {
    let n = arr.length
    let swapped = true
    for (let i = 0; i < n - 1; i++) {
        if(!swapped) break
        swapped = false
        for (let j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]){
                swap(arr, j, j + 1)
                swapped = true
            }
        }
    }
    return arr
}
// 冒泡排序改进版:记录上一次交换的位置
var bubbleSort = arr => {
    let lastIndex = arr.length - 1
    let swapped = true
    let swappedIndex = 0
    while (swapped){
        swapped = false
        for (let i = 0; i < lastIndex; i++) {
            if(arr[i] > arr[i + 1]){
                swap(arr, i, i + 1)
                swapped = true
                swappedIndex = i
            }
        }
        lastIndex = swappedIndex
    }
    return arr
}
```

## 插入排序

```js
/**
 * 插入排序：在新数字插入过程中，不断与前面的数字交换，直到找到自己合适的位置。交换法
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 */
var InsertSort = function(arr){
    for (let i = 1; i < arr.length; i++) {
        let j = i
        while (j >= 1 && arr[j - 1] > arr[j]){
            swap(arr, j, j - 1)
            j--
        }
    }
    return arr
}
/**
 * 插入排序：在新数字插入过程中，不断与前面的数字交换，直到找到自己合适的位置。插入一次法
 * 时间:O(n*n)
 * 空间:O(1)
 * 稳定
 * @param {[Number]} arr 待排序数组
 */
var InsertSort = function(arr){
    for (let i = 1; i < arr.length; i++) {
        let x = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > x){
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = x
    }
    return arr
}
```

## 希尔排序

```js
/**
 * 希尔排序:本质上是对插入排序的一种优化，它利用了插入排序的简单，
 * 又克服了插入排序每次只交换相邻两个元素的缺点。它的基本思想是：
 * 将待排序数组按照一定的间隔分为多个子数组，每组分别进行插入排序。
 * 这里按照间隔分组指的不是取连续的一段数组，而是每跳跃一定间隔取一个值组成一组
 * 逐渐缩小间隔进行下一轮排序
 * 最后一轮时，取间隔为 11，也就相当于直接使用插入排序。
 * 但这时经过前面的「宏观调控」，数组已经基本有序了，所以此时的插入排序只需进行少量交换便可完成
 * 时间:O(n)~O(n*n) 普遍最高在O(1.3*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var ShellSort = arr => {
    let maxGap = 1
    let n = arr.length
    while (maxGap <= n / 3){
        maxGap = maxGap * 3 + 1
    }
    for (let gap = maxGap; gap > 0; gap = (gap - 1) / 3) {
        for (let i = gap; i < n; i++) {
            let curr = arr[i]
            let preIndex = i - gap
            while (preIndex >= 0 && curr < arr[preIndex]){
                arr[preIndex + gap] = arr[preIndex]
                preIndex -= gap
            }
            arr[preIndex + gap] = curr
        }
    }
    return arr
}
```

## 选择排序

```js
/**
 * 选择排序:双重循环遍历数组，每经过一轮比较，找到最小元素的下标，将其交换至首位。
 * 时间:O(n*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var SelectSort = (arr) => {
    let n = arr.length
    let min
    for (let i = 0; i < n - 1; i++) {
        min = i
        for (let j = i + 1; j < n; j++) {
            if(arr[j] < arr[min]) {
                min = j
            }
        }
        swap(arr, i, min)
    }
    return arr
}

/**
 * 选择排序改进版:双重循环遍历数组，每经过一轮比较，找到最小元素的下标，将其交换至首位。找到最大的坐标放在最后一位
 * 时间:O(n*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var SelectSort = (arr) => {
    let n = arr.length
    let min
    let max
    for (let i = 0; i < n >> 1; i++) {
        min = i
        max = i
        for (let j = i + 1; j < n - i; j++) {
            if(arr[j] < arr[min]) {
                min = j
            }
            if(arr[j] > arr[max]) {
                max = j
            }
        }
        if(arr[min] == arr[max]) break
        swap(arr, i, min)
        // 如果最大值的下标刚好是 i，由于 arr[i] 和 arr[min] 已经交换了，所以这里要更新 max 的值。
        if(i == max) max = min
        swap(arr, max, n - i - 1)
    }
    return arr
}
```

## 归并排序

```js
/**
 * 归并排序：将一个数组分割成N个小数组，然后将小数组逐一合并成一个个有序的数组
 * 时间: O(nlogn)
 * 空间: O(n)
 * 稳定
 * @param {*} arr 待排序数组
 */
var MergeSort = function(arr){
    if(!arr.length) return
    let result = mergeSort(arr, 0 , arr.length - 1)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = result[i]
    }
    return arr
}
/**
 * 二分分割数组
 * @param {[Number]} arr 
 * @param {Number} start 
 * @param {Number} end 
 * @returns 
 */
var mergeSort = function(arr, start, end){
    if(start == end) return [arr[start]]
    let mid = Math.floor((start + end) / 2)
    let left = mergeSort(arr, start, mid)
    let right = mergeSort(arr, mid + 1, end)
    return merge(left, right)
}
/**
 * 合并两个有序数组
 * @param {[Number]} arr1 
 * @param {[Number]} arr2 
 */
var merge = function(arr1, arr2){
    let result = new Array(arr1.length + arr2.length)
    let i = 0
    let j = 0
    while (i < arr1.length && j < arr2.length){
        result[i + j] = arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]
    }
    while(i < arr1.length){
        result[i + j] = arr1[i++]
    }
    while(j < arr2.length){
        result[i + j] = arr2[j++]
    }
    return result
}

/**
 * 归并排序空间优化版：将一个数组分割成N个小数组，然后将小数组逐一合并成一个个有序的数组
 * 时间: O(nlogn)
 * 空间: O(n)
 * 稳定
 * @param {*} arr 待排序数组
 */
var MergeSort = function(arr){
    if(!arr.length) return
    let result = new Array(arr.length)
    mergeSort(arr, 0 , arr.length - 1, result)
    return arr
}
/**
 * 二分分割数组
 * @param {[Number]} arr 
 * @param {Number} start 
 * @param {Number} end 
 * @returns 
 */
var mergeSort = function(arr, start, end, result){
    if(start == end) return 
    let mid = Math.floor((start + end) / 2)
    mergeSort(arr, start, mid, result)
    mergeSort(arr, mid + 1, end, result)
    merge(arr, start, end, result)
}
/**
 * 合并两个有序数组
 * @param {[Number]} arr1 
 * @param {[Number]} arr2 
 */
var merge = function(arr, start, end, result) {
    let end1 = Math.floor((start + end) / 2)
    let start2 = end1 + 1
    let end2 = end

    let index1 = start
    let index2 = start2

    while(index1 <= end1 && index2 <= end2) {
        result[index1 + index2 - start2] = arr[index1] <= arr[index2] ? arr[index1++] : arr[index2++]
    }
    while(index1 <= end1){
        result[index1 + index2 - start2] = arr[index1++]
    }
    while(index2 <= end2){
        result[index1 + index2 - start2] = arr[index2++]
    }
    while(start <= end){
        arr[start] = result[start++]
    }
    return arr
}
```

## 快速排序

```js
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 09:05:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-14 20:36:10
 * @FilePath: /js-demo/algorithm/Sort/QuickSort.js
 */
/**
 * 划分函数：从头开始，双指针划分
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
    let x = arr[p]
    let i = p
    let j = p + 1
    for (j; j <= q; j++) {
        if(arr[j] < x){
            swap(arr, ++i, j)
        }
    }
    swap(arr, i, p)
    return i
}
/**
 * 划分函数：从头开始，双指针划分
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
    // 取第一个数为基数
    let pivot = arr[p]
    // 从第二个数开始分区
    let i = p + 1
    // 右边界
    let j = q
    // 相遇时退出循环
    while (i < j){
        // 找到第一个大于基数的位置
        // console.log(arr.join(','), i, j);
        while (i < j && arr[i] <= pivot) i++
        // console.log(i, arr[i], pivot);
        if(i != j){
            // 交换到右分区，使得左边分区都小于或等于基数，右边分区大于或等于基数
            swap(arr, i, j)
            j--
        }
    }
    // console.log('while-end')
    // console.log(arr.join(','))
    // 如果两个指针相等，单独比较 arr[j] pivot
    if(i == j && arr[j] > pivot) j--
    // 将基数和中间树交换
    // console.log(j, p, arr[p], arr[j]);
    if(j != p) swap(arr, p, j)
    // console.log(arr.join(','))
    // 返回中间的下标
    return j
}

/**
 * 划分函数：将 arr 从 p 到 q 分区，左边区域比基数小，右边区域比基数大，然后返回中间值的下标
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
    // 取第一个数为基数
    let pivot = arr[p]
    // 从第二个数开始分区
    let i = p + 1
    // 右边界
    let j = q
    // 相遇时退出循环
    while (i < j){
        // 找到第一个大于基数的位置
        // console.log(arr.join(','), i, j);
        while (i < j && arr[i] <= pivot) i++
        while (i < j && arr[j] >= pivot) j--
        // console.log(i, arr[i], arr[j], pivot);
        if(i < j){
            // 交换到右分区，使得左边分区都小于或等于基数，右边分区大于或等于基数
            swap(arr, i, j)
            i++
            j--
        }
    }
    // console.log('while-end')
    // console.log(arr.join(','))
    // 如果两个指针相等，单独比较 arr[j] pivot
    if(i == j && arr[j] > pivot) j--
    // 将基数和中间树交换
    swap(arr, p, j)
    // console.log(arr.join(','))
    // 返回中间的下标
    return j
}
/**
 * 划分函数：将 arr 从 p 到 q 分区，左边区域比基数小，右边区域比基数大，然后返回中间值的下标
 * @param {*} arr 数组
 * @param {*} p 左指针
 * @param {*} q 右指针
 * @returns 
 */
var partition = (arr, p, q) => {
    let pivot = arr[p]
    let i = p + 1
    let j = q
    while (i < j){
        while (i < j && arr[i] <= pivot) i++
        while (i < j && arr[j] >= pivot) j--
        if(i != j){
            swap(arr, i, j)
            i++
            j--
        }
    }
    if(i == j && arr[j] >= pivot) j--
    swap(arr, p, j)
    return j
}
/**
 * 快速排序算法的基本思想是：
 * 从数组中取出一个数，称之为基数（pivot）
 * 遍历数组，将比基数大的数字放到它的右边，比基数小的数字放到它的左边。遍历完成后，数组被分成了左右两个区域
 * 将左右两个区域视为两个数组，重复前两个步骤，直到排序完成
 * 时间复杂度: O(nlogn ~ n*n)
 * 空间复杂度: O(logn ~ n)
 * 稳定: 不稳定
 * @param {*} arr 
 * @param {*} p 
 * @param {*} q 
 * @returns 
 */
var sortArray = function(arr){
    shuffle(arr)
    return QuickSort(arr, 0, arr.length - 1)
}
var QuickSort = (arr, p, q) => {
    if(p < q){
         // 将数组分区，并获得中间值的下标
        const r = partition(arr, p, q)
        // 对左边区域快速排序
        QuickSort(arr, p, r - 1)
        // 对右边区域快速排序
        QuickSort(arr, r + 1, q)
    }
    return arr
}

/**
 * 优化: 将排序数组用洗牌算法打乱
 * @return {number[]}
 */
var shuffle = function(nums) {
    let n = nums.length
    // [n, m] 内的一个随机整数
    var randOne = function(n, m) {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    };
    for (let i = 0; i < n; i++) {
        let rand = randOne(i, n - 1)
        swap(nums, i, rand)
    }
    return nums
};


// 交换
var swap = function(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
};
```

## 堆排序

```js
/**
 * 堆：符合以下两个条件之一的完全二叉树：
 * 根节点的值 ≥ 子节点的值，这样的堆被称之为最大堆，或大顶堆；
 * 根节点的值 ≤ 子节点的值，这样的堆被称之为最小堆，或小顶堆。
 * 堆排序过程如下：
 * 用数列构建出一个大顶堆，取出堆顶的数字；
 * 调整剩余的数字，构建出新的大顶堆，再次取出堆顶的数字；
 * 循环往复，完成整个排序。
 * 时间: O(nlogn)
 * 空间: O(n)
 * 不稳定
 */
class Heap {
    constructor(size, handle){
        this.list = new Array(size + 1)
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
    }
    handle(a, b){
        return a > b
    }
    getParentIndex(i){
        return Math.floor(i / 2)
    }
    getLeftChildIndex(i){
        return i * 2
    }
    getRightChildIndex(i){
        return i * 2 + 1
    }
    swap(i, j){
        let temp = this.list[i]
        this.list[i] = this.list[j]
        this.list[j] = temp
    }
    heapUp(i){
        // 1. 找到节点的父节点，判断是否需要交换
        let j = this.getParentIndex(i)
        while(this.list[i] !== undefined && this.handle(this.list[i], this.list[j]) && j >= 1){
            this.swap(i, j)
            i = j
            j = this.getParentIndex(i)
        }
    }
    heapDown(i){
        let n = Math.floor(this.realSize / 2)
        while(i < this.realSize && i <= n){
            let l = this.getLeftChildIndex(i)
            let r = this.getRightChildIndex(i)
            let left = this.list[l]
            let right = this.list[r]
            let curr = this.list[i]
            let j = i
            // console.log(curr, left, right)
            if(left === undefined && right === undefined) break
            if(right === undefined && this.handle(curr, left)) break
            if(this.handle(curr, left) && this.handle(curr, right)) break
            if(left === undefined) j = r
            else if(right === undefined) j = l
            else{
                if(this.handle(left, right)){
                    j = l
                }else{
                    j = r
                }
            }
            this.swap(i, j)
            i = j
        }
    }
    add(val){
        if(this.realSize >= this.list[0]){
            if(this.handle(this.peek(), val)){
                this.pop()
            }else{
                return
            }
        }
        this.realSize++
        this.list[this.realSize] = val
        // 插入后上浮
        this.heapUp(this.realSize)
    }
    pop(){
        let head = this.list[1]
        this.list[1] = this.list[this.realSize]
        this.list[this.realSize--] = undefined
        this.heapDown(1)
        return head
    }
    peek(){
        return this.list[1] != undefined ? this.list[1] : -1
    }
    size(){
        return this.realSize
    }
    heapify(list = [], handle){
        let size = list.length
        this.list = new Array(size + 1)
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
        for (let i = 0; i < size; i++) {
            this.add(list[i])
        }
    }
}
class MinHeap extends Heap{
    constructor(size, handle){
        super(size, handle)
    }
    handle(a, b){
        return a < b
    }
}
var sortArray = function(arr){
    let n = arr.length
    let heap = new MinHeap(n)
    heap.heapify(arr)
    for (let i = 0; i < n; i++) {
        arr[i] = heap.pop()
    }
    return arr
}
```

## 计数排序

```js
/**
 * 计数排序
 * 每次遍历都是进行 n 次或者 k 次，所以计数排序的时间复杂度为 O(n + k)，k 表示数据的范围大小。
 * 用到的空间主要是长度为 k 的计数数组和长度为 n 的结果数组，所以空间复杂度也是 O(n + k)
 * 稳定
 * 计数排序只适用于数据范围不大的场景
 * @param {*} arr 
 */
var CountingSort = (arr) => {
    // 判空及防止数组越界
    if (arr == null || arr.length <= 1) return arr;
    // 找最大最小
    let max = arr[0]
    let min = arr[0]
    for (let i = 1; i < arr.length; i++) {
        max = Math.max(max, arr[i])
        min = Math.min(min, arr[i])
    }
    let range = max - min + 1
    // 建立长度为 range 的数组，下标 0~8 对应数字 1~9
    let counting = new Array(range).fill(0)
    // 遍历 arr 中的每个元素
    for (const x of arr) {
        // 将每个整数出现的次数统计到计数数组中对应下标的位置
        counting[x-min] += 1
    }
    // 记录前面比自己小的数字的总数
    let preCounts = 0
    for (let i = 0; i < counting.length; i++) {
        // 将 counting 计算成当前数字在结果中的起始下标位置。位置 = 前面比自己小的数字的总数。
        preCounts += counting[i]
        // 当前的数字比下一个数字小，累计到 preCounts 中
        counting[i] = preCounts - counting[i]
    }
    let result = new Array(arr.length)
    for (const x of arr) {
        // counting[x - 1] 表示此元素在结果数组中的下标
        let index = counting[x - min]
        result[index] = x
        // 更新 counting[x - 1]，指向此元素的下一个下标
        counting[x-min]+=1
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = result[i]
    }
    return arr
}
```

## 基数排序

```js
/**
 * 基数排序
 * 基数排序可以分为以下三个步骤：
 * 找出数组中最大的数字的位数 maxDigit
 * 获取数组中每个数字的基数
 * 遍历 maxDigit 轮数组，每轮按照基数对其进行排序
 * 时间复杂度为 O(d(n + k))
 * 空间复杂度为 O(n+k)
 * 稳定
 * @param {number[]} arr 
 */
var radixSort = function(arr){
    if(arr.length <= 1) return arr
    let max = -Infinity
    for (const x of arr) {
        max = Math.max(max, Math.abs(x))
    }
    let maxDigit = 0;
    while (max != 0) {
        maxDigit++;
        max = Math.floor(max / 10);
    }
    let counting = new Array(20).fill(0)
    let result = new Array(arr.length)
    let dev = 1
    for (let i = 0; i < maxDigit; i++) {
        // console.log(arr)
        for (const x of arr) {
            let radix = (dev <= Math.abs(x) ? parseInt(x / dev) % 10 : 0) + 9
            // console.log(radix, x)
            counting[radix]++
        }
        // console.log(counting)
        for (let j = 1; j < counting.length; j++) {
            counting[j] += counting[j - 1]
        }
        for (let j = arr.length - 1; j >= 0; j--){
            let radix = (dev <= Math.abs(arr[j]) ? parseInt(arr[j] / dev) % 10 : 0) + 9 
            result[--counting[radix]] = arr[j]
        }
        // console.log(result)
        for (let j = 0; j < result.length; j++) {
            arr[j] = result[j];
        }
        counting.fill(0)
        dev *= 10
    }
    return arr
}
```

## diff 

```js
// react
function diff1(prev, next){
    let container = prev.slice()
    let nextIndex = {}
    let prevIndex = {}
    let prevLength = prev.length
    let nextLength = next.length
    let lastIdx = 0
    // 生成映射表，方便查找
    for(let i = 0; i < prevLength; i++) prevIndex[prev[i].key] = i
    for(let i = 0; i < nextLength; i++){
        // 1. 遍历 next 取出 nextNode，位置 i
        let nextNode = next[i]
        nextIndex[nextNode.key] = i
        // 3. 如果找到节点，位置为 j ，更新节点，判断 j 是否小于 lastIdx（lastIdx = 0），如果不小于，则 lastIdx = j
        let j = prevIndex[nextNode.key]
        if(j !== undefined){
            patch(prev[j], nextNode)
            // 4. 如果小于 lastIdx 则将节点插入到 next[i - 1] 之后
            if(j < lastIdx){
                container = insertBefore(next[i - 1], nextNode, container, 1)
            }else{
                lastIdx = j
            }
        }else{
            // 2. 在 prev 中查找 nextNode.key 一致的节点，如果没找到，则创建后插入到 next[i - 1] 之后
            container = insertBefore(next[i - 1], nextNode, container, 1)
        }
    }
    // 5. 遍历 next 结束后，遍历 prev 如果节点不在 next 中，则删除节点
    for(let p of prev){
        if(nextIndex[p.key] === undefined){
            remove(p, container)
        }
    }
    return container
}
```

```js
// vue2
function diff2(prev, next){
    let container = prev.slice()
    // 1. 声明4个变量 prevStart，prevEnd，nextStart，nextEnd 取出 prevStartNode， prevEndNode，nextStartNode，nextEndNode
    let prevStart = 0
    let nextStart = 0
    let prevEnd = prev.length - 1
    let nextEnd = next.length - 1
    let prevStartNode = prev[prevStart]
    let prevEndNode = prev[prevEnd]
    let nextStartNode = next[nextStart]
    let nextEndNode = next[nextEnd]
    let prevIndex = {}
    for(let i = 0; i < prev.length; i++) prevIndex[prev[i].key] = i
    // 2. 循环，条件不满足 prevStart <= prevEnd && nextStart <= nextEnd 跳出循环
    while(prevStart <= prevEnd && nextStart <= nextEnd){
        // 3. prevStartNode 或 prevEndNode 是否存在，不存在则 prevStart++，prevEnd--，回到 2
        if(!prevStartNode){
            prevStartNode = prev[++prevStart]
        }else if(!prevEndNode){
            prevEndNode = prev[--prevEnd]
        }else if(prevStartNode.key === nextStartNode.key){
            // 4. prevStartNode.key == nextStartNode.key，相等则更新节点， prevStart++ nextStart++，回到2
            patch(prevStartNode, nextStartNode)
            prevStartNode = prev[++prevStart]
            nextStartNode = next[++nextStart]
        }else if(prevEndNode.key === nextEndNode.key){
            // 5. prevEndNode.key == nextEndNode.key，相等则更新节点， prevEnd-- nextEnd --， 回到2
            patch(prevEndNode, nextEndNode)
            prevEndNode = prev[--prevEnd]
            nextEndNode = next[--nextEnd]
        }else if(prevStartNode.key === nextEndNode.key){
            // 6. prevStartNode.key == nextEndNode.key，相等则更新节点， 将 prevStartNode 插入到 prevEndNode.next 之前，prevStart++ nextEnd--，回到 2 
            patch(prevStartNode, nextEndNode)
            container = insertBefore(prevEndNode, prevStartNode, container, 1)
            prevStartNode = prev[++prevStart]
            nextEndNode = next[--nextEnd]
        }else if(prevEndNode.key === nextStartNode.key){
            // 7. prevEndNode.key == nextStartNode.key，相等则更新节点，将 prevEndNode 插入到 prevStartNode 之前，prevEnd-- nextStart++，回到 2
            patch(prevEndNode, nextStartNode)
            container = insertBefore(prevStartNode, prevEndNode, container)
            prevEndNode = prev[--prevEnd]
            nextStartNode = next[++nextStart]
        }else{
            // 8. 如果全都不相等，查找 prev，看是否存在一个与 nextStartNode.key相同的节点，有则更新，没有则创建一个新的节点，将其插入到 prevStartNode 之前，nextStart++，prev[j]标记为操作过，回到2
            let j = prevIndex[nextStartNode.key]
            if(j !== undefined){
                patch(prev[j], nextStartNode)
                prev[j] = undefined
            }
            container = insertBefore(prevStartNode, nextStartNode, container)
            nextStartNode = next[++nextStart]
        }
    }
    if(prevEnd < prevStart){
        // 9. 循环结束后 如果 prevEnd < prevStart 证明存在新节点未处理，从 nextStart 开始 插入节点，直到newEnd，每次节点都插入在 next[newEnd + 1]之前
        let ref = next[nextEnd + 1] || null
        while(nextStart <= nextEnd){
            container = insertBefore(ref, next[nextStart++], container)
        }
    }else if(nextEnd < nextStart){
        // 10. 如果 nextEnd < newStart 证明存在节点被移除，未处理，从 prevStart 开始 移除节点，直到 prevEnd
        while(prevStart <= prevEnd){
            remove(prev[prevStart++], container)
        }
    }
    return container
}
```

```js
// vue3
function diff3(prev, next){
    let container = prev.slice()
    // 1. j 表示当前匹配到第几个位置，初始值为0
    let j = 0
    let prevEnd = prev.length - 1
    let nextEnd = next.length - 1
    let prevNode = prev[j]
    let nextNode = next[j]
    // 2. 从 j 开始匹配相同的元素，如果 prev[j].key == next[j].key，更新后 j++ 如果 j > prevEnd || j > nextEnd 提前跳出
    while(prevNode && nextNode && prevNode.key === nextNode.key){
        patch(prevNode, nextNode)
        j++
        if(j > prevEnd || j > nextEnd) break
        prevNode = prev[j]
        nextNode = next[j]
    }
    // 3. 匹配完前面的相同元素后 j 停在第一个不同点
    prevNode = prev[prevEnd]
    nextNode = next[nextEnd]
    // 4. 从 prevEnd 和 nextEnd 开始从后面查找相同的后缀，更新后 prevEnd-- nextEnd-- 如果 j > prevEnd || j > nextEnd提前跳出
    while(prevNode && nextNode && prevNode.key === nextNode.key){
        patch(prevNode, nextNode)
        prevEnd--
        nextEnd--
        if(j > prevEnd || j > nextEnd) break
        prevNode = prev[prevEnd]
        nextNode = next[nextEnd]
    }
    // console.log(j, prevEnd, nextEnd)
    // console.log(container, prev, next)
    // 5. 此时已经更新完相同的前缀和后缀，需要看 j 处于什么位置
    if(j > prevEnd && j <= nextEnd){
        // 6. 如果 j > prevEnd && j <= nextEnd ，则 next 在[ j , nextEnd]  新增元素，直接在next[nextEnd + 1] 前插入新增元素
        let ref = next[nextEnd + 1] || null
        while(j <= nextEnd){
            container = insertBefore(ref, next[j++], container)
        }
    }else if(j > nextEnd && j <= prevEnd){
        // 7. 如果 j > nextEnd && j  <= prevEnd ，则 prev 在 [j , prevEnd]  中元素被删除，直接删除多余元素
        while(j <= prevEnd){
            remove(prev[j++], container)
        }
    }else if(j <= nextEnd){
        // 8. 如果都不是上两种情况，则说明在 [j , prevEnd] 段存在乱序的节点，长度为 nextLeft = nextEnd - j + 1
        let nextLeft = nextEnd - j + 1
        // 9. 初始化一个辅助数组  source 长度为 nextLeft 默认值为 -1，patched = 0，move = false， pos = 0
        let source = new Array(nextLeft).fill(-1)
        let pos = 0
        let patched = 0
        let move = false
        let keyIndex = {}
        // 10. 遍历 next, 从 j 到 nextEnd，生成一个 key - i 的映射表 keyIndex
        for(let i = j; i <= nextEnd; i++) keyIndex[next[i].key] = i
        // 11. 遍历 prev ,从 j 到 prevEnd 
        for (let i = j; i <= prevEnd; i++) {
            let prevNode = prev[i]
            // 12. 如果 patched 大于 nextLeft，则说明相同元素从 prev 中取完，后面均为待删除的元素，直接删除
            if(patched < nextLeft){
                let k = keyIndex[prevNode.key]
                // 13. k = keyIndex[prev[i]]，如果 k 不存在，证明该节点不存在于 next，直接删除
                if(k !== undefined){
                    // 14. next[k].key == prev[i].key，则更新该节点，patched++，source[k - j] = i，如果 k < pos，则prev[i] 是需要移动的 move = true，否则 pos = k
                    patch(prevNode, next[k])
                    source[k - j] = i
                    patched++
                    if(k < pos){
                        move = true
                    }else{
                        pos = k
                    }
                }else{
                    remove(prevNode, container)
                }
            }else{
                remove(prevNode, container)
            }
        }
        // console.log(source)
        // 15. 处理完成后判断 move 是否为真
        if(move){
            // 17. 如果为真，则在这段范围内发生乱序 / 新增的情况
            // 18. 求出最长上升子序列 seq = lis(source) j = seq.length - 1
            let seq = lis(source)
            let k = seq.length - 1
            for(let i = nextLeft - 1; i >= 0; i--){
                if(source[i] === -1 || i !== seq[k]){
                    // 19. i = nextLeft - 1 倒序遍历，如果 source[i] == -1 时，pos = j + i，在 next[pos + 1]前增加节点next[pos]
                    // 20. 如果 i == seq[j]，则需要移动此节点，pos = j + i，将 prev 中的 next[pos]插入到 prev 中的 next[pos + 1] 之前
                    let pos = j + i
                    container = insertBefore(next[pos + 1] || null, next[pos], container)
                }else{
                    // 21. 其他情况，j-- 
                    k--
                }
                // console.log(container)
            }
        }else{
            // 16. 如果不为真，i = nextLeft - 1 倒序遍历，如果 source[i] == -1 时，pos = j + i，在 next[pos + 1]前增加节点 next[pos]
            for(let i = nextLeft - 1; i >= 0; i--){
                if(source[i] === -1){
                    let pos = j + i
                    container = insertBefore(next[pos + 1] || null, next[pos], container)
                }
            }
        }
    }
    return container
}
function lis(arr) {
    const p = arr.slice()
    const result = [0]
    let i
    let j
    let u
    let v
    let c
    const len = arr.length
    for (i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            j = result[result.length - 1]
            if (arr[j] < arrI) {
                p[i] = j
                result.push(i)
                continue
            }
            u = 0
            v = result.length - 1
            while (u < v) {
                c = ((u + v) / 2) | 0
                if (arr[result[c]] < arrI) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1]
            }
                result[u] = i
            }
        }
    }
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
        result[u] = v
        v = p[v]
    }
    return result
}
```
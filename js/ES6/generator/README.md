---
title: Generator 与 Co 模块理解（ES6）
tags: 
 - ES6
 - JavaScript
categories:
 - 技术
comments: true
date: 2022-03-20 19:23
updated: 2022-03-20 19:23
---

# 是什么

`Generator` 是 ES6 提供的一种异步编程解决方案，是协程的一种实现，本质是状态机的一种实现，封装了多个内部状态

执行函数后会返回一个遍历器对象，依次遍历函数内部中的每一个状态

## 语法

* 通过 `*function(){}` 声明为一个 `Generator` 函数
* 通过 `yield` 关键字作为暂停标志
* 换句话说就是 `next()` 执行到下一个 `yield` / `return`时停止
* 返回 `{ value: 表示当前的内部状态的值, done: 表示是否遍历完毕 }`

```js
function *genFunc(){
  console.log('before yield 1')
  yield 1
  console.log('before yield 2')
  yield 2
  console.log('before yield 3')
  yield 3
  console.log('before return 4')
  return 4
}
const gen = genFunc()
console.log(gen.next()) // before yield 1 { value: 1, done: false }
console.log(gen.next()) // before yield 2 { value: 2, done: false }
console.log(gen.next()) // before yield 3 { value: 3, done: false }
console.log(gen.next()) // before return 1 { value: 4, done: true }
console.log(gen.next()) // { value: undefined, done: true }
console.log(gen.next()) // { value: undefined, done: true }
```

* 如果传参数会是怎么样的

```js
function *genFunc(x){
  console.log(`before yield x + 1 x = ${x}`)
  var y = yield (x + 1)
  console.log(`before yield y + 1 x = ${x} y = ${y}`)
  var z = yield (y + 1)
  console.log(`before yield z + 1 x = ${x} y = ${y} z = ${z}`)
  var i = yield (z + 1)
  console.log(`before return x = ${x} y = ${y} z = ${z} i = ${i}`)
  return i
}

const a = genFunc(5)
// 第一次传递参数是无效的，传递的参数表示上一个yield表达式的返回值！value = x + 1
console.log(a.next(4)) // before yield x + 1 x = 5 { value: 6, done: false } 
// 传入 3 y = 3，value = y + 1 = 4
console.log(a.next(3)) // before yield y + 1 x = 5 y = 3 { value: 4, done: false }
// 传入 2 z = 2, value = z + 1 = 2
console.log(a.next(2)) // before yield z + 1 x = 5 y = 3 z = 2 { value: 3, done: false }
// 传入 1 i = 1, value = i + 1 = 1
console.log(a.next(1)) // before return x = 5 y = 3 z = 2 i = 1 { value: 1, done: true }

const b = genFunc()
console.log(b.next()) // before yield x + 1 x = undefined { value: NaN, done: false }
console.log(b.next()) // before yield y + 1 x = undefined y = undefined { value: NaN, done: false }
console.log(b.next()) // before yield z + 1 x = undefined y = undefined z = undefined { value: NaN, done: false }
console.log(b.next()) // before return x = undefined y = undefined z = undefined i = undefined { value: undefined, done: true }
```

## 模拟过程（极简）

```js
function *genFunc(){
	console.log('before yield 1')
	var a = yield 1
	console.log(`before yield 2 a = ${a}`)
	var b = yield (a + 1)
	console.log(`before return b = ${b}`)
	return a + b
}
const gen = genFunc()
console.log(gen.next()) // before yield 1 { value: 1, done: false }
console.log(gen.next(2)) // before yield 2 a = 2 { value: 3, done: false }
console.log(gen.next(3)) // before return b = 3 { value: 5, done: true }
```

通过 `babel` 编译后

```js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(genFunc);
function genFunc() {
  var a, b;
  return regeneratorRuntime.wrap(function genFunc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('before yield 1');
          _context.next = 3;
          return 1;

        case 3:
          a = _context.sent;
          console.log("before yield 2 a = ".concat(a));
          _context.next = 7;
          return a + 1;

        case 7:
          b = _context.sent;
          console.log("before return b = ".concat(b));
          return _context.abrupt("return", a + b);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

我们可以先忽略里面函数被转换的样子，先关注 `regeneratorRuntime` 对象提供两个方法

* `mark`：包装后返回一个迭代器对象
* `warp`：包装 `gen` 创建变量存储状态

```js
var regeneratorRuntime = (function () {
  var end = {} // 用于后续判断
  function makeInvokeMethod(innerFn, context) {
    var state = 'start'
    return function invoke(method, arg) {
      if(state === 'completed') return { value: undefined, done: true}
      context.method = method
      context.arg = arg
      while(true){
        context.sent = context.arg;
        var arg = innerFn.call(null, context)
        state = context.done ? "completed" : "yield"
        if(arg === end){
          continue
        }
        return {
          value: arg,
          done: context.done
        }
      }
    }
  }
  return {
    mark: function (genFun){
      genFun.prototype.next = function (arg) {
        return this._invoke('next', arg)
      }
      return genFun
    },
    wrap: function(innerFn, marked){
      var context = {
        done: false,
        method: 'next',
        next: 0,
        prev: 0,
        sent: undefined,
        abrupt: function(type, arg){
          // 后续为 return 时调用
          var record = {}
          record.type = type
          record.arg = arg
          return this.complete(record)
        },
        complete: function(record){
          // 完成后调用
          if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          }
          return end;
        },
        stop: function(){
          // 遍历完成，停止
          this.done = true
          return this.rval
        }
      }
      marked.prototype._invoke = makeInvokeMethod(innerFn, context);
      return marked.prototype
    }
  }
})();
```

## 如何让它自动执行呢？

`Generator ` 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权，当任务都是同步任务的时候

```js
function *genFunc(){
	yield 1
	yield 2
	return 3
}
var gen = genFunc()
var res = gen.next()
while (!res.done){
	console.log(res.value)
	res = gen.next()
}
console.log(res.value)
```

如果任务是异步的，这里的顺序执行 next 就显然是会出现问题

### Thunk

Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式

```js
function asyncFn(x, callback){
	setTimeout(() => {
		callback(x + 1)
	})
}
function callback(x){
	console.log(`by callback: ${x}`)
}
// 普通的调用方式
asyncFn(1, callback)

function Thunk(fn){
	return function(){
		const args = Array.prototype.slice.call(arguments)
		return function(callback){
			args.push(callback)
			return fn.apply(this, args)
		}
	}
}
const thunkAsync = Thunk(asyncFn)
// thunkify
thunkAsync(1)(callback)
```

改成这样有什么意义呢？callback放在后续传入有什么不一样吗？直接看代码！

```js
function co(genF){
	var gen = genF()
	function next(){
		var args = Array.prototype.slice.call(arguments)
		var res = gen.next.apply(gen, args)
		if(res.done) return res.value
		// 传入 next 作为 callback， 这就是实现 co 自动执行的关键！
		// next 被触发时，异步任务已经得到结果，并执行下一个 gen.next ！
		// 这也是为什么 co 是需要后面跟 Thunk 函数的原因！
		res.value(next)
	}
	next()
}
function* genF(){
	var i = yield thunkAsync(1) // 这里进行传参，执行后是需要传入 callback 才开始执行异步
	var j = yield thunkAsync(2)
	console.log(i, j)
	return i + j
}
co(genF)
```

如果理解了这个，下面这个 Promise 版本就很容易理解了

```js

function asyncFn(x){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x + 1)
		})
	})
}
function* genF(){
	var i = yield asyncFn(1)
	var j = yield asyncFn(2)
	console.log(i, j)
	return i + j
}
function co(genF){
	return new Promise((resolve) => {
		var gen = genF()
		function step(next){
			let res = next();
			if(res.done) return resolve(res.value)
			Promise.resolve(res.value).then(v => step(() => gen.next(v)))
		}
		step(() => gen.next())
	})
}
co(genF)
```

再贴一个增加容错处理的

```js
function co(genF){
  return new Promise((res, rej) => {
    const gen = genF()
    const step = nextF => {
      let next
      try {
        next = nextF()
      } catch (error) {
        rej(error)
      }
      if(next.done) return res(next.value)
      Promise.resolve(next.value).then(v => {
        step(() => gen.next(v))
      }, r => {
        step(() => gen.throw(r))
      })
    }
    return step(() => gen.next())
  })
}
```


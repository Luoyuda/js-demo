---
title: EventLoop 到底是个啥（JavaScript）
tags:
  - JavaScript
  - EventLoop
  - 队列
categories:
  - 技术
comments: true
date: '2022-04-11 16:35'
theme: devui-blue
---
![微信截图_20220411115823.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c301abed6964afcbb256244ac481da0~tplv-k3u1fbpfcp-watermark.image?)

## 同步和异步、阻塞和非阻塞

同步和异步关注的是**消息通信机制**，描述的是一种**行为方式**

* 同步：发出调用后，在没有得到结果之前，该调用不返回。当调用返回时得到返回值。调用者主动等待这个调用结果
* 异步：发出调用后，立即返回。但调用方通常不会立即得到结果。调用者需要等待被调用者通知才能得到调用结果

阻塞非阻塞关注的是**程序在等待调用结果时的状态**，描述的是一种**状态**

* 阻塞：调用结果返回之前，线程被挂起，只有得到结果之后才会激活
* 非阻塞：调用后不等待结果，该调用不阻塞当前进程

## EventLoop

`JavaScript` 是一门单线程的语言，起初只是为了实现简单的功能而设计的脚本语言。单线程存在着任务执行阻塞的问题，遇到耗时的操作时，容易导致页面长时间无响应。

`EventLoop`（事件循环）是让 `JavaScript` 做到即是单线程运行，又不会阻塞的一种机制。是 `JavaScript` 并发模型的基础，用于协调各类事件、交互、脚本执行、UI渲染、网络请求等操作

`EventLoop` 由三个部分组成，**函数调用栈、宏任务队列（macro-task-queue）和微任务队列（micro-task-queue）**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b8514d79c7d45a6a4496816bab179b0~tplv-k3u1fbpfcp-watermark.image?)

#### 函数调用栈

当引擎遇到 `JS` 代码时，会产生全局上下文，并将其压入调用栈中，后面每当遇到函数调用都会往栈中压入新的函数上下文，执行完栈顶内容后，弹出对应的上下文

#### 宏任务队列

通过队列存放被注册的宏任务

* 常见的宏任务（MacroTask）：`script` 中的代码、`setTimeout`、`setInterval`、`setImmediate(ie10、node)`、`postMessage(MessageChannel)`、`I/O`、`UI渲染`、`网络请求`、`History API`
* `requestAnimationFrame`不是宏任务！它会在微任务结束后，下一个 `EventLoop` 开始前去执行

#### 微任务队列

通过队列存放被注册的微任务

* 常见的微任务（MicroTask）：`Promise callback`、`MutationObserver`、`Object.observe`

### 循环过程

**一个宏任务一队微任务**

1. 调用栈选择最先进入队列的 `MacroTask`，执行过程如果产生新的 `MacroTask` 或 `MicroTask` 分别入队
2. 执行完毕第一个 `MacroTask`，检查当前的 `MicroTask` 队列，执行至清空 `MicroTaskQueue`
3. 浏览器检查更新渲染（`render`），每次循环都可能会检查更新渲染
4. 重复 1-3，直到所有队列都为空

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd71bdf316e4f258d110c955adb80f2~tplv-k3u1fbpfcp-watermark.image?)

### 例子

```js
let logs = []
let log = (v) => logs.push(v)
setTimeout(() => {
  log('timer - 1')
  new Promise((resolve) => {
    log('sync - 1')
    resolve()
  }).then(() => {
    log('then - 1')
  })
})
new Promise((resolve) => {
  log('sync - 2')
  setTimeout(() => {
    log('timer - 2')
    new Promise((resolve) => {
      log('sync - 3')
      resolve()
    }).then(() => {
      log('then - 3')
    })
  })
  resolve()
}).then(() => {
  log('then - 2')
})
```
1. 遇到 `setTimeout` 将回调入队 `macro-task-queue`
```js
setTimeout(() => {
  log('timer - 1')
  new Promise((resolve) => {
    log('sync - 1')
    resolve()
  }).then(() => {
    log('then - 1')
  })
})
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aa4c427665c4bc3bb0033a9a0bbad9b~tplv-k3u1fbpfcp-watermark.image?)

2. 接着执行 `new Promise` 中的同步代码，又遇到 `setTimeout` 入队

```js
new Promise((resolve) => {
  log('sync - 2')
  // ... 入队
  resolve()
})
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b573b3147cac449bbdd360b7d0040144~tplv-k3u1fbpfcp-watermark.image?)

3. 执行完成同步代码后，入队 `then` 微任务 `micro-task-queue`

```js
.then(() => {
  log('then - 2')
})
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aba2db1de2e148a792c68f7ed33a67bb~tplv-k3u1fbpfcp-watermark.image?)

4. 此时同步代码已经执行完毕出栈，依次执行 `micro-task-queue` 中的任务

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1926ff84546c408088512b89f43ed0d1~tplv-k3u1fbpfcp-watermark.image?)

5. `micro-task-queue` 清空，执行 `macro-task-queue` 队首 `setTimeout1`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94d9228a051c4d3bbbab38413482184b~tplv-k3u1fbpfcp-watermark.image?)

6. 执行完 `new Promise` 中的同步代码，`then2` 入队 `micro-task-queue` 

```js
log('timer - 1')
new Promise((resolve) => {
  log('sync - 1')
  resolve()
})
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfdcb95ada344a14ab906ac31c9293c4~tplv-k3u1fbpfcp-watermark.image?)

7. 执行完 `setTimeout1` 后，接着清空 `micro-task-queue`

```js
.then(() => {
  log('then - 1')
})
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/526a7d304bba4f79a6d2ba0615a29012~tplv-k3u1fbpfcp-watermark.image?)

8. 清空后，再次取出 `macro-task-queue` 队首，同样的操作，执行遇到 `microTask` 后又入队 `then3`

```js
setTimeout(() => {
  log('timer - 2')
  new Promise((resolve) => {
    log('sync - 3')
    resolve()
  }).then(() => {
    log('then - 3')
  })
})
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/028d3ea33fa14654940a6ddddbd7b088~tplv-k3u1fbpfcp-watermark.image?)

9. 执行完最后的 `then3` 后，数组收集到的数据应该为

```js
[
  'sync - 2',
  'then - 2',
  'timer - 1',
  'sync - 1',
  'then - 1',
  'timer - 2',
  'sync - 3',
  'then - 3'
]
```

## NodeJS 中的 EventLoop

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57cb335d4ce64a6883a6d5bbe4bac203~tplv-k3u1fbpfcp-watermark.image?)

- **times**：执行 `setTimeout()` 和 `setInterval()` 中定义的回调函数
- **pending callbacks**：处理网络I/O或文件I/O中的错误的回调（比较少见）
- **idle, prepare**：仅系统内部使用（忽略）
- **poll**：执行 I/O 回调，处理轮询队列中的事件，同时检查定时器是否过期 
    - **poll 阶段处理的回调中，如果既派发了 setImmediate、又派发了 setTimeout，一定是先执行 setImmediate，再执行 setTimeout。**
- **check**：执行`setImmediate()` 中定义的回调函数
- **close callbacks**：处理“关闭”的回调函数，`socket.on('close', ...)`

### 任务队列

宏任务队列
1. `Timers Queue`
2. `IO Callbacks Queue`
3. `Check Queue`
4. `Close Callbacks Queue`

微任务队列
1. `Next Tick Queue`：放置 `process.nextTick(callback)`
2. `Other Micro Queue`：放置其他微任务

### 执行顺序

一队一队执行！

1. 执行 `script` 同步代码
2. 执行 `microTaskQueue`，优先清空 `Next Tick Queue` 中的任务，随后才会清空其它微任务
    1. 先执行 `Next Tick Queue`，所有`callbacks`会被依次调用
    2. 再执行 `Other Mico Queue`
3. 执行 `macroTaskQueue`
    1. 每个阶段的宏任务执行完后执行微任务
    
需要特别注意的是

> Node11开始，timers 阶段的setTimeout、setInterval等函数派发的任务、包括 setImmediate 派发的任务，都被修改为：一旦执行完当前阶段的一个任务，就立刻执行微任务队列。

```js
setTimeout(() => {
  console.log('timer 1')
  Promise.resolve().then(() => {
    console.log('then 1')
  })
})
setTimeout(() => {
  console.log('timer 2')
  Promise.resolve().then(() => {
    console.log('then 2')
  })
})
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38c87921568c4002902ddadc710bd337~tplv-k3u1fbpfcp-watermark.image?)

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/EventLoop)
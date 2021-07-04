<!--
 * @Author: xiaohuolong
 * @Date: 2021-07-04 20:01:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-04 20:17:50
 * @FilePath: /js-demo/js/test/README.md
-->
# js代码整理(2)

## setTimeout 模拟实现 setInterval(带清除定时器的版本)

```js
function setInterval(func, delay){
    var interval = function(){
        func()
        timeoutId = setTimeout(interval, delay)
    }
    var timeoutId = setTimeout(interval, delay)
    
    return { 
        cancel:function(){
            clearTimeout(timeoutId)
        }
    }
}
```

## 数组扁平化

```js
function flatten(arr){
    var res = []
    for(let x of arr){
        if(x instanceof Array){
            res = res.concat(flatten(x))
        }else{
            res.push(x)
        }
    }
    return res
}
```

## 寄生组合继承

```js
function inherit(Parent, Child){
    function F(){}
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
}
```

## 实现有并行限制的 Promise 调度器

```js
class Scheduler{
    constructor(limit){
        this.queue = []
        this.limit = limit
        this.runCounts = 0
    }
    add(time, order){
        const p = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order)
                    resolve()
                }, time)
            })
        }
        this.queue.push(p)
    }
    taskStart(){
        for (let i = 0; i < this.limit; i++) {
            this.request()
        }
    }
    request(){
        if(!this.queue.length || this.runCounts >= this.limit) return
        this.runCounts++
        this.queue.shift()().then(() => {
            this.runCounts--
            this.request()
        })
    }
}
```

## 深拷贝

```js
function deepCopy(obj) {
    if(!obj) return null
    let target = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(typeof obj[key] === 'object' && obj[key] !== null){
            target[key] = deepCopy(obj[key])
        }else{
            target[key] = obj[key]
        }
    }
    return target
}
```

## LazyMan

```js
class lazyMan{
    task = []
    constructor(name){
        this.task.push(this.createTask(`Hi This is ${name}`))
        setTimeout(() => {
            this.next()
        })
    }
    createTask(text, time){
        return () => {
            if(time !== undefined) {
                console.log(text)
                this.next()
            }else{
                setTimeout(() => {
                    console.log(text)
                    this.next()
                }, time)
            }
        }
    }
    sleep(time){
        this.task.push(this.createTask(`Wake up after ${time}`, time))
        return this
    }
    sleepFirst(time){
        this.task.unshift(this.createTask(`Wake up after ${time}`, time))
        return this
    }
    eat(name){
        this.task.push(this.createTask(`Eat ${name}`))
        return this
    }
    next(){
        let next = this.task.shift()
        next && next()
    }
}
function LazyMan(name){
    return new lazyMan(name)
}
```

## 写版本号排序的方法

```js
versions.sort((a, b) => {
    a = a.split('.')
    b = b.split('.')
    let i = 0
    while (true){
        let s1 = a[i] - 0
        let s2 = b[i] - 0
        i++
        if(s1 === s2) continue
        return s2 - s1
    }
})
```

## LRUCache

```js
class LRUCache {
    constructor(limit){
        this.limit = limit
        this.cache = {}
        this.queue = []
    }
    get(key){
        if(this.cache[key] !== undefined){
            this.update(key)
            return this.cache[key]
        }else{
            return -1
        }
    }
    put(key, val){
        if(this.cache[key] !== undefined){
            this.cache[key] = val
            this.update(key)
            return
        }else if(this.queue.length >= this.limit){
            delete this.cache[this.queue.pop()]
        }
        this.cache[key] = val
        this.queue.unshift(key)
    }
    update(key){
        for(let i = 0; i < this.limit; i++){
            let x = this.queue[i]
            if(x == key){
                for(let j = i; j > 0; j--){
                    this.queue[j] = this.queue[j - 1]
                }
                this.queue[0] = key
            }
        }
    }
}
```

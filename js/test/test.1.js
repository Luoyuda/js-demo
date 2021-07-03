/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 21:51:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-30 21:35:27
 * @FilePath: /js-demo/js/test/test.1.js
 */
// 1. compose
// 题目描述:实现一个 compose 函数
// 用法如下:
(() => {
    function fn1(x) {
        return x + 1;
    }
    function fn2(x) {
        return x + 2;
    }
    function fn3(x) {
        return x + 3;
    }
    function fn4(x) {
        return x + 4;
    }
    function compose(){
        var args = arguments
        var start = args.length
        return function(){
            var result = args[--start].apply(this, arguments)
            while(start--) result = args[start].call(this, result)
            return result
        }
    }
    var a = compose(fn1, fn2, fn3, fn4);
    console.log(a(1)); // 1+4+3+2+1=11
});

// 2. setTimeout 模拟实现 setInterval(带清除定时器的版本)
// 题目描述:setInterval 用来实现循环定时调用 可能会存在一定的问题 能用 setTimeout 解决吗
(() => {
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
});
// 3. 发布订阅模式
// 题目描述:实现一个发布订阅模式拥有 on emit once off 方法
(() => {
    class EventEmitter {
        constructor(){
            this.events = {}
        }
        on(type, cb){
            if(!this.events[type]) this.events[type] = []
            this.events[type].push(cb)
        }
        off(type, cb){
            if(this.events[type]){
                this.events[type] = this.events[type].filter(item => item !== cb)
            }
        }
        once(type, cb){
            function callback(){
                cb.apply(this, arguments)
                this.off(type, callback)
            }
            this.on(type, callback)
        }
        emit(){
            var type = Array.prototype.shift.call(arguments)
            this.events[type].forEach(func => {
                func.apply(this, arguments)
            })
        }
    }
    
    // 使用如下
    var e = new EventEmitter();
    e.on('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.off('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.once('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.emit('log', 1, 2, 3, 4)
});
// 4. 数组去重
(() => {
    function unique(arr){
        var hash = {}
        var result = []
        var computed = function(val){
            val = val instanceof RegExp ? val.toString() : val
            var key = (typeof val) + JSON.stringify(val)
            if(hash[key]) return false
            hash[key] = true
            return true
        }
        for(let x of arr){
            if(computed(x)){
                result.push(x)
            }
        }
        return result
    }
    
    console.log(unique([
        1, 1, 2,
        '1', '1', '2',
        null, null,
        undefined, undefined,
        new String('1'), new String('1'), new String('2'), 
        /a/, /a/, /b/,
        NaN, NaN,
        { a: 1}, { a: 1 }, { b: 1 },
    ]))
});
// 5. 数组扁平化
// 题目描述:实现一个方法使多维数组变成一维数组

(() => {
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
    console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
});

// 6 寄生组合继承
// 题目描述:实现一个你认为不错的 js 继承方式
(() => {
    function inherit(Parent, Child){
        function F(){}
        F.prototype = Parent.prototype
        Child.prototype = new F()
        Child.prototype.constructor = Child
    }

    function Parent(name) {
        this.name = name;
        this.say = () => {
            console.log(111);
        };
    }
    Parent.prototype.play = () => {
        console.log(222);
    };
    function Child(name) {
        Parent.call(this)
        this.name = name
    }
    inherit(Parent, Child)
    let child = new Child("111");
    console.log(child.name);
    console.log(child.__proto__ === Child.prototype) // true
    console.log(Child.prototype.constructor === Child) // true
    child.say();
    child.play();
});
// 7. 实现有并行限制的 Promise 调度器
// 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

(() => {
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
    const scheduler = new Scheduler(2);
    const addTask = (time, order) => {
        scheduler.add(time, order);
    };
    addTask(1000, "1");
    addTask(500, "2");
    addTask(300, "3");
    addTask(400, "4");
    scheduler.taskStart();
});

// 8 new 操作符
// 题目描述:手写 new 操作符实现

(() => {
    function MyNew(){
        var Constructor = Array.prototype.shift.call(arguments)
        var obj = new Object(Constructor.prototype)
        var ret = Constructor.apply(obj, arguments)
        return typeof ret === 'object' ? ret : obj
    }
    
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function() {
        console.log(this.age);
    };
    let p1 = MyNew(Person, "lihua", 18);
    console.log(p1.name);
    console.log(p1);
    p1.say();
    
});

// 9 call apply bind
// 题目描述:手写 call apply bind 实现
(() => {
    Function.prototype.newCall = function(){
        var context = arguments[0] || window
        context.fn = this
        var args = Array.prototype.slice.call(arguments, 1)
        var result = eval('context.fn(' + args + ')')
        delete context.fn
        return result
    }
    Function.prototype.newApply = function(){
        var context = arguments[0] || window
        context.fn = this
        var args = arguments[1] || []
        var result = eval('context.fn(' + args + ')')
        delete context.fn
        return result
    }
    Function.prototype.newBind = function(){
        var context = arguments[0] || window
        var fn = this
        var args = Array.prototype.slice.call(arguments, 1)
        var bind = function(){
            args = args.concat(Array.prototype.slice.call(arguments))
            context = this instanceof bind ? this : context
            return fn.apply(context, args)
        }
        var F = function(){}
        F.prototype = fn.prototype
        bind.prototype = new F()
        return bind
    }
    
    function Person(name, age) {
      console.log(name); //'我是参数传进来的name'
      console.log(age); //'我是参数传进来的age'
      console.log(this); //构造函数this指向实例对象
    }
    // 构造函数原型的方法
    Person.prototype.say = function() {
        console.log(123);
    }
    var obj = {
        objName: '我是obj传进来的name',
        objAge: '我是obj传进来的age'
    }
    // 普通函数
    function normalFun(name, age) {
      console.log(name);   //'我是参数传进来的name'
      console.log(age);   //'我是参数传进来的age'
      console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
      console.log(this.objName); //'我是obj传进来的name'
      console.log(this.objAge); //'我是obj传进来的age'
    }
    
    // 先测试作为构造函数调用
    var bindFun = Person.newBind(obj, '我是参数传进来的name')
    var a = new bindFun('我是参数传进来的age')
    a.say() //123
    
    // 再测试作为普通函数调用
    var bindFun = normalFun.newBind(obj, '我是参数传进来的name')
    bindFun('我是参数传进来的age')
    
});

// 10 深拷贝（考虑到复制 Symbol 类型）
(() => {
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
    
    var obj = {
        a: 1,
        b: {
            c: [1, { e: 2 }],
            d: Symbol('d')
        }
    };
    
    var clone = deepCopy(obj)
    console.log(clone)
});
// 11 instanceof
// 题目描述:手写 instanceof 操作符实现
(() => {
    function instanceOf(l, r) {
        if(typeof l !== 'object' && typeof l !== 'function') return false
        while(true) {
            if(l === null) return false
            if(l.__proto__ === r.prototype) return true
            l = l.__proto__
        }
    }
    let test = [
        [[], Array],
        [{}, Array],
        [[], Object],
        [{}, Object],
        [() => {}, Object],
    ]
    test.forEach(item => {
        if(instanceOf(...item) !== item[0] instanceof item[1]){
            console.log(item, instanceOf(...item), item[0] instanceof item[1])
        }
    })
});

// 12 柯里化
(() => {
    function curry(fn, args){
        var length = fn.length
        args = args || []
        return function(){
            var _args = args.concat(Array.prototype.slice.call(arguments))
            if(_args.length < length){
                return curry.call(this, fn, _args)
            }else{
                return fn.apply(this, _args)
            }
        }
    }
    
    var add1 = (a, b, c) => a + b + c;
    var a = curry(add1)(1);
    console.log(a(2,3))
});

// 13 冒泡排序--时间复杂度 n^2
// 题目描述:实现一个冒泡排序

(() => {
    function bubbleSort(arr){
        let len = arr.length
        for (let i = 0; i < len; i++) {
            let swap = false
            for (let j = 0; j < len - 1; j++) {
                if(arr[j] > arr[j + 1]){
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    swap = true
                }
            }
            if(!swap) break
        }
        return arr
    }
    console.log(bubbleSort([-1,-2,2,3,1,5,2]))
});

// 14 选择排序--时间复杂度 n^2
// 题目描述:实现一个选择排序
(() => {
    function selectSort(arr){
        var n = arr.length
        var m = n >> 1
        var max, min
        for(let i = 0; i < m; i++){
            max = min = i
            for(let j = i + 1; j < n - i; j++){
                if(arr[j] > arr[max]){
                    max = j
                }
                if(arr[j] < arr[min]){
                    min = j
                }
            }
            if(arr[min] == arr[max]) break
            swap(arr, min, i)
            if(max == i) max = min
            swap(arr, max, n - i - 1)
        }
        return arr
    }
    function swap(arr, i, j){
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    console.log(selectSort([-1,-2,2,3,1,5,2]))
});

// 15 插入排序--时间复杂度 n^2
// 题目描述:实现一个插入排序
(() => {
    function insertSort(arr){
        for(let i = 1; i < arr.length; i++){
            let x = arr[i]
            let j = i - 1
            while(j >= 0 && arr[j] > x){
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = x
        }
        return arr
    }
    console.log(insertSort([-1,-2,2,3,1,5,2]))
});

// 16 快排--时间复杂度 nlogn~ n^2 之间
// 题目描述:实现一个快排

(() => {
    function swap(arr, i, j){
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    function quickSort(arr){
        shuffle(arr)
        return QuickSort(arr, 0, arr.length - 1)
    }
    function QuickSort(arr, p, q){
        if(q > p){
            var m = partition(arr, p, q)
            QuickSort(arr, p, m - 1)
            QuickSort(arr, m + 1, q)
        }
        return arr
    }
    function partition(arr, p, q){
        var x = arr[p]
        var i = p + 1
        var j = q
        while(i < j){
            while(i < j && arr[i] <= x) i++
            while(i < j && arr[j] >= x) j--
            if(i != j){
                swap(arr, i, j)
                i++
                j--
            }
        }
        if(arr[j] >= x) j--
        swap(arr, j, p)
        return j
    }
    function shuffle(arr){
        var n = arr.length
        for (let i = 0; i < n; i++) {
            var rand = i + Math.floor(Math.random() * (n - i))
            swap(arr, i, rand)
        }
    }
    console.log(quickSort([-1,-2,2,3,1,5,2]))
});

// 17 归并排序--时间复杂度 nlog(n)
// 题目描述:实现一个时间复杂度为 nlog(n)的排序算法

(() => {
    function MergeSort(arr){
        var n = arr.length
        if(!n) return arr
        var result = new Array(n)
        mergeSort(arr, 0, n - 1, result)
        return arr
    }
    
    function mergeSort(arr, start, end, result){
        if(start >= end) return result
        let m = Math.floor((start + end) / 2)
        mergeSort(arr, start, m, result)
        mergeSort(arr, m + 1, end, result)
        merge(arr, start, end, result)
    }
    
    function merge(arr, start, end, result){
        var end1 = Math.floor((start + end) / 2)
        var start2 = end1 + 1
        var end2 = end
        var index1 = start
        var index2 = start2
        while(index1 <= end1 && index2 <= end2){
            result[index1 + index2 - start2] = arr[index1] < arr[index2] ? arr[index1++] : arr[index2++]
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
    console.log(MergeSort([-1,-2,2,3,1,5,2]))
});

// 18 二分查找--时间复杂度 log2(n)
// 题目描述:如何确定一个数在一个有序数组中的位置

(() => {
    function binarySearch(arr, target, start, end){
        var l = start === undefined ? 0 : start
        var r = end === undefined ? arr.length - 1 : end
        var m
        while(l < r){
            m = Math.floor((l + r) / 2)
            // console.log(l, arr[l], m, arr[m], r, arr[r])
            if(arr[m] >= target) r = m
            else l = m + 1
            // m = Math.floor((l + r + 1) / 2)
            // console.log(l, arr[l], m, arr[m], r, arr[r])
            // if(arr[m] <= target) l = m
            // else r = m - 1
        }
        if(arr[l] === target) return l
        return -1
    }
    
    console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9, 10], 7))
    console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9], 7, 7))
    console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9], 7, 10))
});

// 19 实现 LazyMan
// 题目描述:
// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
//等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

(() => {
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
    
    LazyMan('Hank').eat('dinner').eat('supper')
    LazyMan('Hank').sleep(10).eat('supper')
    LazyMan('Hank').eat('supper').sleepFirst(5)
    
});

// 20 防抖节流
// 题目描述:手写防抖节流

(() => {
    function debounce(func, wait, immediate){
        var timeout, result
        var d = function(){
            var context = this
            var args = arguments
            if(timeout) clearTimeout(timeout)
            if(immediate){
                var called = !timeout
                timeout = setTimeout(function(){
                    timeout = null
                }, wait)
                if(called) result = func.apply(context, args)
            }else{
                timeout = setTimeout(function(){
                    result = func.apply(context, args)
                }, wait)
            }
            return result
        }
        d.cancel = function(){
            clearTimeout(timeout)
            timeout = null
        }
        return d
    }
    
    function throttle(func, wait, options){
        options = options || {}
        var timeout, result, context, args
        var prev = 0
        var later = function(){
            prev = options.leading === false ? 0 : +new Date()
            timeout = null
            result = func.apply(context, args)
        }
        var t = function(){
            context = this
            args = arguments
            var now = +new Date()
            prev = options.leading === false && prev === 0 ? now : prev
            var r = wait - (now - prev)
            if(r > wait || r <= 0){
                if(timeout){
                    clearTimeout(timeout)
                    timeout = null
                }
                prev = now
                result = func.apply(context, args)
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
});

// 21 写版本号排序的方法
// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
// 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

(() => {
    var versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
    console.log(versions.sort((a, b) => {
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
    }))
});

(() => {
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
    
    var funcs = ["put", "put", "get", "put", "get", "put", "get", "get", "get"]
    var params = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    var results =[null, null, 1, null, -1, null, -1, 3, 4]
    // var funcs = ["get","put","get","put","put","get","get"]
    // var params = [[2],[2,6],[1],[1,5],[1,2],[1],[2]]
    // var results = [-1,null,-1,null,null,2,6]
    // var funcs = ["put","put","put","put","get","get"]
    // var params = [[2,1],[1,1],[2,3],[4,1],[1],[2]]
    // var results =[null,null,null,null,-1,3]
    var lru = new LRUCache(2)
    funcs.forEach((item, index) => {
        var res = lru[item](...params[index])
        if(!(res == results[index])){
            console.log(...params[index])
        }
    })
});

// 23 Promise 以及相关方法的实现
// 题目描述:手写 Promise 以及 Promise.all Promise.race 的实现
(() => {
    var PENDING = 'pending';
    var REJECTED = 'rejected';
    var FULFILLED = 'fulfilled';
    class MyPromise {
        status = PENDING
        value = null
        reason = null
        onFulfilled = []
        onRejected = []
        constructor(executor){
            try {
                executor(this.resolve, this.reject)
            } catch (error) {
                this.reject(error)
            }
        }
        resolve = value => {
            if(this.status === PENDING){
                this.status = FULFILLED
                this.value = value
                while(this.onFulfilled.length){
                    this.onFulfilled.shift()(this.value)
                }
            }
        }
        reject = reason => {
            if(this.status === PENDING){
                this.status = REJECTED
                this.reason = reason
                while(this.onRejected.length){
                    this.onRejected.shift()(this.reason)
                }
            }
        }
        then(onFulfilled, onRejected){
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
            onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
            var promise1 = new MyPromise((resolve, reject) => {
                var fulfilled = () => {
                    queueMicrotask(() => {
                        try {
                            var x = onFulfilled(this.value)
                            resolvePromise(promise1, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                }
                var rejected = () => {
                    queueMicrotask(() => {
                        try {
                            var x = onRejected(this.reason)
                            resolvePromise(promise1, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                }
                if(this.status === FULFILLED){
                    fulfilled()
                }else if(this.status === REJECTED){
                    rejected()
                }else{
                    this.onFulfilled.push(fulfilled)
                    this.onRejected.push(rejected)
                }
            })
        }
        catch(onRejected){
            this.then(null, onRejected)
        }
    }

    function resolvePromise(promise, x, resolve, reject){
        if(promise === x) return reject(new TypeError('promise'))
        if(typeof x === 'object' || typeof x === 'function'){
            if(x === null) return resolve(x)
            var then
            try {
                then = x.then
            } catch (error) {
                reject(error)
            }
            if(typeof then === 'function'){
                var caller = false
                try {
                    then.call(x, y => {
                        if(caller) return
                        caller = true
                        resolvePromise(promise, y, resolve, reject)
                    }, r => {
                        if(caller) return
                        caller = true
                        reject(r)
                    })
                } catch (error) {
                    if(caller) return
                    caller = true
                    reject(error)
                }
            }else{
                resolve(x)
            }
        }else{
            resolve(x)
        }
    }
});

// 24 实现一个 add 方法
// 题目描述:实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10

(() => {
    function add(){
        var args = []
        var fn = function(){
            var _args = Array.prototype.slice.call(arguments, 0)
            if(!_args.length) return args.reduce(function(prev, item){
                return prev + item
            }, 0)
            args = args.concat(_args)
            return fn
        }
        return fn.apply(this, arguments)
    }
    console.log(add(1)(2)(3)())
    console.log(add(1,2,3)(4)())
});

// 25 动态规划求解硬币找零问题
// 题目描述:给定不同面额的硬币 coins 和一个总金额 amount。
// 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
(() => {
    const coinChange = function (coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity)
        dp[0] = 0
        for(let i = 1; i <= amount; i++){
            for(let coin of coins){
                if(i >= coin){
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1)
                }
            }
        }
        return dp[amount]
    }
    
});
// 26 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式
// 题目描述:
// <div>
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>
// 把上诉dom结构转成下面的JSON格式
// {
//   tag: 'DIV',
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }

(() => {
    function dom2json(doms){
        var obj = {}
        obj.name = doms.tagName
        obj.children = Array.prototype.map.call(doms.childNodes, (item) => dom2json(item))
        return obj
    }
});
// 27 类数组转化为数组的方法
// 题目描述:类数组拥有 length 属性 可以使用下标来访问元素 但是不能使用数组的方法 如何把类数组转化为数组?
// 1.扩展运算符
// [...arrayLike]
// 2.Array.from
// Array.from(arrayLike)
// 3.Array.prototype.slice
// Array.prototype.slice.call(arrayLike)
// 4.Array.apply
// Array.apply(null, arrayLike)
// 5.Array.prototype.concat
// Array.prototype.concat.apply([], arrayLike)

// 28 Object.is 实现
// Object.is不会转换被比较的两个值的类型，这点和===更为相似，他们之间也存在一些区别。
//     1. NaN在===中是不相等的，而在Object.is中是相等的
//     2. +0和-0在===中是相等的，而在Object.is中是不相等的
(() => {
    var is = function(a, b){
        if(a === b){
            return a !== 0 || 1 / a === 1 / b
        }
        return a !== a && b !== b
    }
    console.log(is(-0, +0))
    console.log(is(0, 0))
    console.log(is(1, 1))
    console.log(is(-1, -1))
    console.log(is(NaN, NaN))
    console.log(is(NaN, -1))
});

// 29 AJAX
// 题目描述:利用 XMLHttpRequest 手写 AJAX 实现
(() => {
    const ajax = function(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open("GET", url, false)
            xhr.setRequestHeader('Content-Type', "application/json")
            xhr.onreadystatechange = function(){
                if(xhr.readyState != 4) return
                if(xhr.status == 200){
                    resolve(xhr.responseText)
                }else{
                    reject(new Error(xhr.responseText))
                }
            }
            xhr.send()
        })
    }   
});

// 30 分片思想解决大数据量渲染问题
// 题目描述:渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染
(() => {
    let count = 100
    let once = 20
    let page = Math.floor(count / once)
    let app = document.getElementById('app')
    function loop(curCount, curIndex){
        if(curCount <= 0) return
        let count = Math.min(curCount, once)
        window.requestAnimationFrame(function(){
            for(let i = 0; i < count; i++){
                let li = document.createElement('li')
                li.innerHTML = `${curIndex + i}`
                app.append(li)
            }
            loop(curCount - count, curIndex + count)
        })
    }
    loop(count, 0)

});
// 32 实现模板字符串解析功能
(() => {
    function render(template, data){
        let stack = []
        let rStack = []
        let str = ''
        let prop = ''
        for(let i = 0; i < template.length; i++){
            if(template[i] == '{'){
                stack.push('{')
            }else if(template[i] == '}'){
                rStack.push(template[i])
                if(stack.length == 2 && rStack.length == 2){
                    stack.pop()
                    stack.pop()
                    rStack.pop()
                    rStack.pop()
                    str += data[prop]
                    prop = ''
                }
            }else if(stack.length == 2){
                prop += template[i]
            }else if(stack.length > 2){
                str += stack.pop()
            }else{
                str += template[i]
            }
        }
        if(stack.length) str += stack.join('')
        if(prop) str += prop
        if(rStack.length) str += rStack.join('')
        return str
    }
    
    function render(template, data){
        return template.replace(/\{\{(\w+)\}\}/ig, function(match, key){
            return data[key]
        })
    }
    
    var template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
    var data = {
        name: '姓名',
        age: 18
    }
    console.log(render(template, data)); // 我是姓名，年龄18，性别undefined
    
    
});

// 33 实现一个对象的 flatten 方法
// 题目描述:
// flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
(() => {
    var obj = {
        a: {
            b: 1,
            c: 2,
            d: {e: 5}
        },
        b: [1, 3, {a: 2, b: 3}],
        c: 3
    }
    
    function flattenObject(obj){
        var res = {}
        function isObject(o){
            return typeof o === 'object' && o !== null
        }
        function dfs(cur, prefix){
            if(isObject(cur)){
                if(cur instanceof Array){
                    for (let i = 0; i < cur.length; i++) {
                        dfs(cur[i], prefix + '[' + i + ']')
                    }
                }else{
                    for (const key in cur) {
                        dfs(cur[key], prefix + '.' + key)
                    }
                }
            }else{
                res[prefix] = cur
            }
        }
        dfs(obj, '')
        return res
    }
    
    console.log(flattenObject(obj))
});

// 34 列表转成树形结构
// 题目描述:
// [
//     {
//         id: 1,
//         text: '节点1',
//         parentId: 0 //这里用0表示为顶级节点
//     },
//     {
//         id: 2,
//         text: '节点1_1',
//         parentId: 1 //通过这个字段来确定子父级
//     }
// ]
// 转成
// [
//     {
//         id: 1,
//         text: '节点1',
//         parentId: 0,
//         children: [
//             {
//                 id:2,
//                 text: '节点1_1',
//                 parentId:1
//             }
//         ]
//     }
// ]

(() => {
    var list = [
        {
            id: 1,
            text: '节点1',
            parentId: 0 //这里用0表示为顶级节点
        },
        {
            id: 2,
            text: '节点1_1',
            parentId: 1 //通过这个字段来确定子父级
        },
        {
            id: 3,
            text: '节点3',
            parentId: 0 //这里用0表示为顶级节点
        },
    ]
    
    function listToTree(list){
        let temp = {}
        let tree = []
        for(let node of list){
            node.children = []
            temp[node.id] = node
        }
        for(let i in temp){
            if(temp[i].parentId == 0){
                tree.push(temp[i])
            }else{
                temp[temp[i].parentId].children.push(temp[i])
            }
        }
        return tree
    }
    
    console.log(listToTree(list))
    
    function treeToList(tree){
        let list = []
        let temp = {}
        function dfs(tree){
            for (const node of tree) {
                if(!temp[node.id]){
                    list.push(node)
                    temp[node.id] = true
                    dfs(node.children)
                    delete node.children
                }   
            }
        }
        dfs(tree)
        return list
    }
    
    console.log(treeToList(JSON.parse(JSON.stringify(listToTree(list)))))
    
});

(() => {
    var a = "98765"
    var b = "12345"
    var a = "9007199254740991";
    var b = "1234567899999999999";
    var bigAdd = function(a, b) {
        let length = Math.max(a.length, b.length)
        function fixedZero(a, length) {
            let len = a.length
            for (let i = 0; i < length - len; i++) {
                a = '0' + a
            }
            return a
        }
        a = fixedZero(a, length)
        b = fixedZero(b, length)
        let f = 0
        let str = ''
        while(length--){
            let s = (a[length] - 0) + (b[length] - 0) + f
            let count = s % 10
            f = Math.floor(s / 10)
            str = count + str
        }
        if(f > 0) str = '1' + str
        return str
    }
    console.log(bigAdd(a, b))
});
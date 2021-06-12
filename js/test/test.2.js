/*
 * @Author: xiaohuolong
 * @Date: 2021-06-08 18:12:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-10 18:45:42
 * @FilePath: /js-demo/js/test/test.2.js
 */
// 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间
// 然后写一个 myClear，停止上面的 mySetInterVal
(() => {
    function mySetInterVal(fn, a, b){
        var timeId
        var i = 0
        var setInterval = () =>{
            timeId = setTimeout(() => {
                clearTimeout(timeId)
                fn()
                console.log(a, b, (a + i * b))
                i++
                setInterval()
            }, (a + i * b) * 1000)
        }
        setInterval()
        return function(){
            clearTimeout(timeId)
        }
    }
    
    var clear = mySetInterVal(function(){
        console.log('a')
    }, 1, 1)
    setTimeout(() => {
        clear()
    }, 5000)
});

// 2.合并二维有序数组成一维有序数组，归并排序的思路
(() => {
    function mergeArr(arr){
        let n = arr.length;
        if(n <= 1) return arr[0];
        let m = Math.floor(n / 2)
        let left = mergeArr(arr.slice(0, m))
        let right = mergeArr(arr.slice(m))
        arr = merge(left, right)
        return arr
    }
    function merge(left, right) {
        let i = 0
        let j = 0
        let len1 = left.length
        let len2 = right.length
        let res = []
        while(i < len1 && j < len2){
            res[i + j] = left[i] < right[j] ? left[i++] : right[j++]
        }
        while(i < len1){
            res[i + j] = left[i++]
        }
        while(j < len2){
            res[i + j] = right[j++]
        }
        return res
    }
    var arr=[[1,2,4],[2,3,7],[3,5,7],[4,5,8]]
    console.log(mergeArr(arr))
    console.log([1,2,4,2,3,7,3,5,7,4,5,8].sort((a, b) => a - b))
});

// 3.斐波那契数列
(() => {
    var fib = (n) => {
        if(n <= 1) return n
        return fib(n - 1) + fib(n - 2)
    }
    console.time('fib-1')
    console.log(fib(20))
    console.timeEnd('fib-1')
    var fib = (n) => {
        if(n <= 1) return n
        fib.cache = fib.cache || {}
        if(fib.cache[n]) return fib.cache[n]
        fib.cache[n] = fib(n - 1) + fib(n - 2)
        return fib.cache[n]
    }
    console.time('fib-2')
    console.log(fib(20))
    console.timeEnd('fib-2')
    var fib = (n) => {
        if(n <= 1) return n
        let one = 0
        let two = 1
        for(let i = 2; i <= n; i++){
            let o = one + two
            one = two
            two = o
        }
        return two
    }
    console.time('fib-3')
    console.log(fib(20))
    console.timeEnd('fib-3')
});

// 4.字符串出现的不重复最长长度
(() => {
    /**
     * 字符串出现的不重复最长长度
     * @param {string} s 
     */
    function lengthOfLongestSubstring(s){
        let i = 0
        let j = 0
        let n = s.length
        let set = new Set()
        let max = 0
        while(j < n){
            while(set.has(s[j])){
                set.delete(s[i++])
            }
            set.add(s[j])
            j++
            max = Math.max(max, j - i)
        }
        return max
    }

    console.log(lengthOfLongestSubstring('abcabcabc'))
    console.log(lengthOfLongestSubstring("loddktdji"))
    console.log(lengthOfLongestSubstring("dvdf"))
    console.log(lengthOfLongestSubstring("adfafwefffdasdcx"))
});

// 5.防抖节流
(() => {
    function debounce(func, wait, immediate) {
        var timeout, result
        var d = function(){
            var context = this
            var args = arguments
            if(timeout)clearTimeout(timeout)
            if(immediate){
                var call = !timeout
                timeout = setTimeout(function(){
                    timeout = null
                }, wait)
                if(call) result = func.apply(context, args)
            }else{
                timeout = setTimeout(function(){
                    result = func.apply(context, args)
                    timeout = null
                }, wait)
            }
            return result
        }
        d.cancel = function(){
            if(timeout) clearTimeout(timeout)
            timeout = null
        }
        return d
    }
    function throttle(func, wait, options) {
        options = options || {}
        var timeout, result
        var previous = 0
        function t(){
            var context = this
            var args = arguments
            var now = +new Date()
            previous = options.leading === false && !previous ? now : previous
            var r = wait - (now - previous)
            if(r > wait || r <= 0){
                if(timeout){
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                result = func.apply(context, args)
            }else if(!timeout && options.trailing !== false){
                timeout = setTimeout(function(){
                    previous = options.leading === false ? 0 : +new Date()
                    timeout = null
                    result = func.apply(context, args)
                }, r)
            }
            return result
        }
        t.cancel = function(){
            clearTimeout(timeout)
            timeout = null
            previous = 0
        }
        return t
    }
});

// 13.有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）
(() => {
    function findPart(arr, k){
        arr.sort((a, b) => a - b)
        let sum = avg = 0
        for(let x of arr){
            sum += x
        }
        avg = Math.floor(sum / k)
        let curr = 0
        let hash = {}
        let ans = []
        let last = Infinity
        while(k > 0){
            let i = arr.length
            let res = []
            while(i--){
                if(!hash[i]){
                    if(curr + arr[i] <= avg){
                        res.push(arr[i])
                        curr += arr[i]
                        hash[i] = true
                    }
                }
            }
            if(curr < last){
                ans.unshift(res)
            }else{
                ans.push(res)
            }
            last = curr
            curr = 0
            k--
        }
        let j = 0
        for(let i = 0; i < arr.length; i++){
            if(!hash[i]){
                let temp = ans[j].reduce((prev, item) => {
                    return prev + item
                }, 0)
                ans[j].push(arr[i])
                hash[i] = true
                if(temp + arr[i] >= avg){
                    j++
                }
            }
        }
        return ans
    }
    function check(list){
        return [list, list.reduce((prev, item) => {
            return prev.concat(item)
        }, []).length, list.map(l => {1
            return l.reduce((prev, item) => {
                return prev + item
            }, 0)
        })]
    }
    console.log(check(findPart([11, 42, 23, 4, 5, 6, 4, 5, 6, 11, 23, 42, 56, 78, 90], 3)))
    console.log(check(findPart([1,2,90,180,300], 3)))
    console.log(check(findPart([1,2,3,4,5,6,7,8], 3)))
});

// 在 js 中经常会出现嵌套调用这种情况，如 a.b.c.d.e，但是这么写很容易抛出异常。你需要这么写 a && a.b && a.b.c && a.b.c.d && a.b.c.d.e，但是显得有些啰嗦与冗长了。特别是在 graphql 中，这种嵌套调用更是难以避免。
// 这时就需要一个 get 函数，使用 get(a, 'b.c.d.e') 简单清晰，并且容错性提高了很多。
(() => {
    function get(obj, path, defaultValue){
        let data = obj
        path = path.replace(/\[(\d+)\]/ig, ".$1").split('.')
        for(let key of path){
            if(data[key]){
                data = data[key]
            }else{
                return defaultValue
            }
        }
        return data
    }
    // 测试用例
    console.log(get({ a: null }, "a.b.c", 3)); // output: 3
    console.log(get({ a: undefined }, "a", 3)); // output: 3
    console.log(get({ a: null }, "a.b", 3)); // output: 3
    console.log(get({ a: [{ b: 1 }] }, "a[0].b", 3)); // output: 1
    console.log(get({ a: { b : { c: 2 } } }, "a.b.c", 3)); // output: 2
});

// 第 15 题：实现 add(1)(2)(3)
(() => {
    function _add(a, b, c) {
        return a + b + c
    }
    function curry(fn, args){
        let length = fn.length
        args = args || []
        return function(){
            let _args = args.concat(Array.prototype.slice.call(arguments))
            if(_args.length < length){
                return curry.call(this, fn, _args)
            }else{
                return fn.apply(this, _args)
            }
        }
    }
    var add = curry(_add)
    console.log(add(1)(2,3)) // 6
    console.log(add(1,2)(3)) // 6
    console.log(add(1)(3)(2)) // 6
});

// 第 23 题：介绍下 promise 的特性、优缺点，内部是如何实现的，动手实现 Promise
(() => {
    var PENDING = 'pending';
    var REJECTED = 'rejected';
    var FULFILLED = 'fulfilled';
    function MyPromise(executor){
        this.status = PENDING
        this.onFulfilled = []
        this.onRejected = []
        this.reason = null
        this.value = null
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    MyPromise.prototype.reject = function(reason){
        if(this.status === PENDING){
            this.status = REJECTED
            this.reason = reason
            while(this.onRejected.length){
                this.onRejected.shift()(this.reason)
            }
        }
    }
    MyPromise.prototype.resolve = function(value){
        if(this.status === PENDING){
            this.status = FULFILLED
            this.value = value
            while(this.onFulfilled.length){
                this.onFulfilled.shift()(this.value)
            }
        }
    }
    MyPromise.prototype.then = function(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value){ return value}
        onRejected = typeof onRejected === 'function' ? onRejected : function(reason){ throw reason}
        var that = this
        var promise = new MyPromise(function(resolve, reject){
            function f(){
                queueMicrotask(function(){
                    try {
                        var x = onFulfilled(that.value)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            function r(){
                queueMicrotask(function(){
                    try {
                        var x = onRejected(that.reason)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(that.status === FULFILLED){
                f()
            }else if(that.status === REJECTED){
                r()
            }else{
                that.onFulfilled.push(f)
                that.onRejected.push(r)
            }
        })
        return promise
    }
    MyPromise.prototype.catch = function(onRejected){
        this.then(null, onRejected)
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
                    then.call(x, function(y){
                        if(caller) return
                        caller = true
                        resolvePromise(promise, y, resolve, reject)
                    }, function(r){
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

// 24.实现 Promise.all
(() => {
    function all(promiseList) {
        return new Promise((resolve, reject) => {
            if(!promiseList || !promiseList.length) return resolve([])
            let count = 0
            let length = promiseList.length
            let result = []
            for (let i = 0; i < length; i++) {
                Promise.resolve(promiseList[i]).then(value => {
                    result[count++] = value
                    if(count === length) resolve(result)
                }, reason => {
                    reject(reason)
                })
            }
        })
    }
    function race(promiseList) {
        return new Promise((resolve, reject) => {
            if(!promiseList || !promiseList.length) return resolve()
            let length = promiseList.length
            for (let i = 0; i < length; i++) {
                Promise.resolve(promiseList[i]).then(value => {
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            }
        })
    }
    function allSettled(promiseList) {
        return new Promise((resolve, reject) => {
            if(!promiseList || !promiseList.length) return resolve([])
            let count = 0
            let length = promiseList.length
            let result = []
            for (let i = 0; i < length; i++) {
                Promise.resolve(promiseList[i]).then(value => {
                    result[count++] = {
                        value,
                        status: 'fulfilled'
                    }
                    if(count === length) resolve(result)
                }, reason => {
                    result[count++] = {
                        reason,
                        status: 'rejected'
                    }
                    if(count === length) resolve(result)
                })
            }
        })
    }
    var promiseList = new Array(3).fill(0).map((item, index) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(index)
            }, index * 1000)
        })
    })
    Promise.all(promiseList).then(list => {
        console.log(list)
    })
    all(promiseList).then(list => {
        console.log(list)
    })
    Promise.race(promiseList).then(list => {
        console.log(list)
    })
    race(promiseList).then(value => {
        console.log(value)
    })
    Promise.allSettled(promiseList).then(list => {
        console.log(list)
    })
    allSettled(promiseList).then(list => {
        console.log(list)
    })
});

// 发布订阅中心, on-订阅, off取消订阅, emit发布, 内部需要一个单独事件中心caches进行存储;
(() => {
    function EventEmitter(){
        this.caches = {}
    }
    EventEmitter.prototype.on = function(type, event){
        if(!this.caches[type]) this.caches[type] = []
        this.caches[type].push(event)
        return this
    }
    EventEmitter.prototype.off = function(type, event){
        if(!this.caches[type]) return
        this.caches[type] = this.caches[type].filter(item => item !== event)
        return this
    }
    EventEmitter.prototype.once = function(type, event){
        var _event = function(){
            event.apply(this, arguments)
            this.off(type, _event)
        }
        this.on(type, _event)
        return this
    }
    EventEmitter.prototype.emit = function(){
        var type = arguments[0]
        if(!this.caches[type]) return
        var args = Array.prototype.slice.call(arguments, 1)
        for(let event of this.caches[type]){
            event.apply(this, args)
        }
        return this
    }
    // 使用如下
    var e = new EventEmitter();
    e.on('log', console.log)
    e.on('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.emit('log', 1, 2, 3, 4)
    e.off('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.once('log', console.log)
    e.emit('log', 1, 2, 3, 4)
    e.emit('log', 1, 2, 3, 4)
});

(() => {
    let input = [
        {
            id: 1,
            val: "学校",
            parentId: null,
        },
        {
            id: 2,
            val: "班级1",
            parentId: 1,
        },
        {
            id: 3,
            val: "班级2",
            parentId: 1,
        },
        {
            id: 4,
            val: "学生1",
            parentId: 2,
        },
        {
            id: 5,
            val: "学生2",
            parentId: 3,
        },
        {
            id: 6,
            val: "学生3",
            parentId: 3,
        },
        {
            id: 7,
            val: "学校2",
            parentId: null,
        },
        {
            id: 8,
            val: "班级1",
            parentId: 7,
        },
        {
            id: 9,
            val: "班级2",
            parentId: 7,
        },
        {
            id: 10,
            val: "学生1",
            parentId: 8,
        },
        {
            id: 11,
            val: "学生2",
            parentId: 9,
        },
        {
            id: 12,
            val: "学生3",
            parentId: 8,
        },
    ];
    /**
     * 
     * @param {Array} arr 
     */
    function listToTree(arr){
        let tree = []
        let temp = {}
        arr.forEach((item) => {
            item.children = []
            temp[item.id] = item
            if(!item.parentId){
                tree.push(item)
            }else{
                temp[item.parentId].children.push(item)
            }
        })
        return tree
    }
    console.log(listToTree(input))
    /**
     * 
     * @param {Array} tree 
     */
    function treeToList(tree){
        let list = []
        let temp = {}
        function dfs(children){
            for(let node of children){
                if(!temp[node.id]){
                    list.push(node)
                    temp[node.id] = true
                }
                dfs(node.children)
                delete node.children
            }
        }
        dfs(tree)
        return list
    }
    console.log(treeToList(JSON.parse(JSON.stringify(listToTree(input)))))
});

// 30.手写用 ES6proxy 如何实现 arr[-1] 的访问
(() => {
    function proxyArray(arr){
        return new Proxy(arr, {
            get(target, key){
                if(key >= 0) return target[key]
                let len = target.length
                return target[len + (key % len)]
            }
        })
    }
    var arr = proxyArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log(arr[0], arr[1])
    console.log(arr[-10], arr[-20])
});

(() => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
            process.nextTick(() => {
                console.log(3);
            });
            new Promise((resolve) => {
                console.log(4);
                resolve();
            }).then(() => {
                console.log(5);
            });
        });
    new Promise((resolve) => {
        console.log(7);
        resolve();
    }).then(() => {
        console.log(8);
    });
    process.nextTick(() => {
        console.log(6);
    });
    setTimeout(() => {
        console.log(9);
        process.nextTick(() => {
            console.log(10);
        });
        new Promise((resolve) => {
            console.log(11);
            resolve();
        }).then(() => {
            console.log(12);
        });
    });
});

(() => {
    function side(arr) {
        arr[0] = arr[2];
    }
    function a(a, b, c = 3) {
        c = 10;
        side(arguments);
        return a + b + c;
    }
    console.log(a(1, 1, 2));
});

// 74.给定一个数组，按找到每个元素右侧第一个比它大的数字，没有的话返回-1 规则返回一个数组
(() => {
    /*
    * 示例：
    * 给定数组：[2,6,3,8,10,9]
    * 返回数组：[6,8,8,10,-1,-1]
    */
    function get(arr){
        let stack = []
        let n = arr.length
        let res = new Array(n).fill(-1)
        for(let i = 0; i < n; i++){
            while(stack.length && arr[stack[stack.length - 1]] < arr[i]){
                res[stack.pop()] = arr[i]
            }
            stack.push(i)
        }
        return res
    }
    console.log(get([2,6,3,8,10,9]))
});

// 单向链表实现队列
(() => {
    function Node(value){
        this.value = value
        this.next = null
    }
    function Queue(){
        this.dummyHead = new Node(-1)
    }
    Queue.prototype.add = function(node) {
        var curr = this.dummyHead
        while (curr.next){
            curr = curr.next
        }
        curr.next = new Node(node)
        return curr.next
    }
    Queue.prototype.remove = function(){
        var node
        if(this.dummyHead.next){
            node = this.dummyHead.next
            this.dummyHead.next = this.dummyHead.next.next
        }
        return node
    }
    Queue.prototype.isEmpty = function(){
        return !!this.dummyHead.next
    }
    Queue.prototype.getHead = function(){
        return this.dummyHead.next
    }
    Queue.prototype.printQueue = function(){
        var curr = this.dummyHead.next
        while (curr){
            console.log(curr.value)
            curr = curr.next
        }
    }
    const queue = new Queue();
    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.printQueue();
    console.log('--------split1--------');
    queue.remove();
    queue.remove();
    queue.add(4);
    queue.printQueue();
    console.log('--------split1--------');
    console.log(queue.getHead());
    console.log(queue.isEmpty())
});

// 21.versions 是一个项目的版本号列表，因多人维护，不规则，动手实现一个版本号处理函数
(() => {
    var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
    // 要求从小到大排序，注意'1.45'比'1.5'大
    function sortVersion(versions) {
        versions.sort((a, b) => {
            a = a.split('.')
            b = b.split('.')
            let i = 0
            let len = Math.max(a.length, b.length)
            while(i < len){
                if(a[i] == b[i]){
                    i++
                }else{
                    return a[i] - b[i]
                }
            }
        })
        return versions
    }
    // => ['1.5','1.45.0','3.3.3.3.3.3','6']
    console.log(sortVersion(versions))
});

// 23.动手实现一个 repeat 方法
(() => {
    function repeat(func, times, wait) {
        let timeout = null
        let i = 0
        function f(){
            let args = arguments
            let context = this
            timeout = setTimeout(() => {
                func.apply(context, args)
                i++
                if(i < times) f.apply(context, args)
            }, wait)
        }
        return f
    }
})();
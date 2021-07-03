/*
 * @Author: xiaohuolong
 * @Date: 2021-07-01 17:53:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-03 13:28:39
 * @FilePath: /js-demo/js/test/test.3.js
 */
// 抽奖
(() => {
    function lottery(whiteList, participant){
        let size = 20
        if(participant.length < size) return participant
        let res = []
        let i = 0
        let visited = new Set()
        while(i < whiteList.length && res.length < size){
            let index = participant.indexOf(whiteList[i])
            if(index > -1){
                visited.add(index)
                res.push(whiteList[i])
            }
            i++
        }
        while(res.length < size){
            let i = Math.floor(Math.random() * participant.length)
            if(visited.has(i)) continue
            res.push(participant[i])
            visited.add(i)
        }
        return res
    }
    
    const whiteList = Array.from({length: 10}, (v, k) => k)
    const participant = Array.from({length: 100}, (v, k) => k + 5)
    const res = lottery(whiteList, participant)
    
    console.log(res, whiteList,  participant)
});

// cache
(() => {
    var pool = new Map()
    function Cache(url, padding = true){
        this.url = url
        this.padding = padding
        this.cbs = []
        this.data = null
    }
    function cacheRequest(url, callback){
        if(pool.has(url)){
            let { padding, data, cbs } = pool.get(url)
            if(!padding){
                setTimeout(() => {
                    callback(data)
                })
            }else{
                cbs.push(callback)
            }
        }else{
            let cache = new Cache(url)
            cache.cbs.push(callback)
            pool.set(url, cache)
            setTimeout(function(){
                cache.padding = false
                cache.data = {
                    url
                }
                while(cache.cbs.length){
                    cache.cbs.shift()(cache.data)
                }
            }, 1000)
        }
    }

    cacheRequest('/user', data => {
        console.log(data)
    })

    cacheRequest('/user', data => {
        console.log(data)
    })
    cacheRequest('/user', data => {
        console.log(data)
    })
    setTimeout(() => {
        cacheRequest('/user', data => {
            console.log(data)
        })
    },1500)
});

// 子序列
(() => {
    var A = [1,3,5,7,11]
    var B = [1,5,11]
    function isSubsequence(A, B){
        let i = 0
        let j = 0
        let aLength = A.length
        let bLength = B.length
        while(i < aLength && j < bLength){
            if(A[i] == B[j]){
                j++
            }
            i++
        }
        return j === bLength
    }
    console.log(isSubsequence(A, B))
    console.log(isSubsequence(B, A))
});

// get
(() => {
    let test = [
        ['2[a]1[bc]', 'aabc'],
        ['2[e2[d]]', 'eddedd'],
        ['3[abc]2[cd]ff', 'abcabcabccdcdff']
    ]
    /**
     * 
     * @param {string} str 
     */
    function decodeStr(str){
        let res = ''
        for(let i = 0; i < str.length;){
            if(isNaN(Number(str[i]))) res += str[i++]
            else{
                let k = 0
                while(!isNaN(Number(str[i]))) k = k * 10 + Number(str[i++])
                let j = i + 1
                let sum = 1
                while(sum > 0){
                    if(str[j] == '[') sum++
                    if(str[j] == ']') sum--
                    j++
                }
                let s = decodeStr(str.substr(i + 1, j - i - 2))
                while(k--) res += s
                i = j
            }
        }
        return res
    }
    
    test.forEach(([arg, res]) => {
        let r = decodeStr(arg)
        if(r !== res){
            console.log(r)
        }
    })
});

// 进制转换
(() => {
    function toString(number, base){
        if(number === 0) return 0
        if(!(base >= 2 && base <= 36)) return new Error()
        let digits = '0123456789abcdefghijklmnopqrstuvwxyz'
        let neg = number > 0 ? '' : '-'
        let res = ''
        number = Math.abs(number)
        while(number){
            res = digits[number % base] + res
            number = Math.floor(number / base)
        }
        return neg + res
    }
    let size = 10000
    let test = Array.from({length: size}).map((k, v) => v)
    
    test.forEach(i => {
        for (let k = 2; k <= 36; k++) {
            let j = toString(i, k)
            let z = (i).toString(k)
            if(z != j){
                console.log(i, z, j)
            }
        }
    })
});

// 红绿灯
(() => {
    // 实现红绿灯 3s 打印 red 2s 打印 green 1s 打印 yellow
    let setColor = function(color, delay){
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                console.log(color)
                resolve()
            }, delay);
        })
    }

    function light(){
        setColor('red', 3000).then(() => {
            setColor('green', 2000).then(() =>{
                setColor('yellow', 1000).then(() =>{
                    light()
                })
            })
        })
    }

    async function light() {
        await setColor('red', 3000)
        await setColor('green', 2000)
        await setColor('yellow', 1000)
        light()
    }

    light()
});
// 取key
(() => {
    var obj = {
        a: '12',
        b: '13',
        first: {
            c: '2',
            d: '3',
            second: {
                e: '3',
                f: '4',
                three: {
                    g: '',
                    h: '1',
                    i: '23'
                }
            }
        },
    }
    function get(target){
        let res = [];
        for (const key in target) {
            if(target[key] && typeof target[key] === 'object'){
                res.push(...get(target[key]))
            }else{
                res.push(key)
            }
        }
        return res
    }
    console.log(obj)
    console.log(get(obj))
});
// 日期
(() => {
    function getMonths(startDate, endDate){
        let startTime = getDate(startDate).getTime()
        let endTime = getDate(endDate).getTime()
        let res = [];
        console.log(startTime, endTime)
        while(startTime < endTime){
            let curDate = new Date(startTime)
            res.push(formatMonth(curDate))
            curDate.setMonth(curDate.getMonth() + 1)
            startTime = curDate.getTime()
        }
        return res.slice(1)
    }
    function formatMonth(date){
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        return `${date.getFullYear()}-${month}`
    }
    function getDate(dateStr){
        let [year, month] = dateStr.split('-')
        return new Date(year, month - 1)
    }
    console.log(getMonths('2020-01', '2021-05'))
});
// eventLoop
(() => {
    let int = 1;
    setTimeout(function () {
        console.log(int);
        int = 2;
        new Promise((resolve, reject) => {
            resolve();
        }).then(function () {
            console.log(int);
            int = 7;
        });
        console.log(int);
    });
    int = 3;
    console.log(int);
    new Promise((resolve, reject) => {
        console.log(int);
        return resolve((int = 4));
    }).then(function (res) {
        console.log(int);
        int = 5;
        setTimeout(function () {
            console.log(int);
            int = 8;
        });
        return false;
    });
    console.log(int);
});

// 找下一个比当前元素大的数
(() => {
    var arr = [2,6,3,8,10,9]
    function getNext(arr){
        let stack = [];
        let length = arr.length
        let res = new Array(length).fill(-1)
        for (let i = 0; i < length; i++) {
            while(stack.length && arr[i] >= arr[stack[stack.length - 1]]){
                let j = stack.pop()
                res[j] = arr[i]
            }
            stack.push(i)
        }
        return res
    }
    console.log(getNext(arr))
});

(() => {
    function Foo() {
        getName = function () {
            console.log(1);
        };
        return this;
    }
    var getName;
    function getName() {
        console.log(5);
    }
    Foo.getName = function () {
        console.log(2);
    };
    Foo.prototype.getName = function () {
        console.log(3);
    };
    getName = function () {
        console.log(4);
    };
    
    Foo.getName(); // 2 getName: 4
    getName(); // 4
    Foo().getName(); // 1
    getName(); // 1
    new Foo.getName(); // 2
    new Foo().getName(); // 3
    new new Foo().getName(); // 3
});

// add(one(two())) // 3
(() => {
    function add(){
        if(arguments[0] instanceof Array){
            return arguments[0].reduce((prev, item) => prev + item, 0)
        }else{
            return arguments[0]
        }
    }
    function one(){
        if(arguments.length == 0){
            return 1
        }else{
            return [arguments[0], 1]
        }
    }
    function two(){
        if(arguments.length == 0){
            return 2
        }else{
            return [arguments[0], 2]
        }
    }
    console.log(add(one(two())));
    console.log(add(two(one())));
    console.log(add(one(one())));
    console.log(add(two(two())));
});
// B 继承 A
(() => {
    function A(name){
        this.name = name
    }
    A.prototype.getName = function(){
        console.log(this.name)
    }
    function inherit(B, A){
        function F (){}
        F.prototype = Object.create(A.prototype)
        B.prototype = new F()
        B.prototype.constructor = B
    }
    function B(){
        A.apply(this, arguments)
    }
    inherit(B, A)
    var b = new B('b')
    console.log(b)
    console.log(b.getName())
    console.log(b instanceof B)
    console.log(b instanceof A)
});
// Array.flat
(() => {
    let arr = [[1,[2,[3,[4],[5]],[6]],[7]],[8,[9,[[[[[10]]]]]]]]
    function flat(arr){
        let res = []
        for (const a of arr) {
            if(a instanceof Array){
                res.push(...flat(a))
            }else{
                res.push(a)
            }
        }
        return res
    }
    function flat(arr){
        let res = []
        let stack = [...arr]
        while(stack.length){
            let next = stack.pop()
            if(next instanceof Array){
                stack.push(...next)
            }else{
                res.push(next)
            }
        }
        return res.reverse()
    }
    console.log(flat(arr))
});
// 树右视图
function TreeNode(val, left, right){
    this.val = val
    this.left = left
    this.right = right
}
(() => {
    var root = new TreeNode(1, 
        new TreeNode(2, new TreeNode(7)),
        new TreeNode(4, new TreeNode(3)))
    function rightView(root){
        if(!root) return []
        let q = [root]
        let res = []
        while(q.length){
            let len = q.length
            res.push(q[q.length - 1].val)
            for(let i = 0; i < len; i++){
                let node = q.shift()
                if(node.left) q.push(node.left)
                if(node.right) q.push(node.right)
            }
        }
        return res
    }
    console.log(rightView(root))
});
// 打点计时器
(() => {
    function tapper(start, end){
        let timeout = null
        let count = start
        let time = 100
        let init = function(){
            return new Promise((resolve, reject) => {
                console.log(count++)
                if(count > end) return cancel()
                timeout = setTimeout(() => {
                    init()
                    resolve()
                }, time)
            })
        }
        let cancel = function(){
            clearTimeout(timeout)
        }
        return {
            init,
            cancel
        }
    }
    let demo = tapper(1, 100)
    demo.init()
    setTimeout(() => {
        demo.cancel()
    }, 1000)
});
// 浅复制
(() => {
    function cloneShallow(obj){
        if(!obj && !(obj instanceof Object)) return null
        var target = {}
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                target[key] = obj[key]
            }
        }
        return obj
    }
    console.log(cloneShallow({
        a: 1,
        b: {c: 1}
    }))
});
// 打乱数组
(() => {
    function swap(arr, i, j) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    function shuffle(arr){
        let len = arr.length - 1
        for(let i = 0; i <= len; i++){
            let rand = i + Math.floor(Math.random() * (len - i))
            swap(arr, i, rand)
        }
        return arr
    }
    console.log(shuffle([1,2,3,4,5,6,7,8]))
});
// curry
(() => {
    function curry(fn, args) {
        args = args || []
        return function(){
            var _args = args.concat(Array.prototype.slice.call(arguments))
            if(_args.length < fn.length){
                return curry.call(this, fn, _args)
            }else{
                return fn.apply(this, _args)
            }
        }
    }
    var sum = curry(function(a, b){
        return a + b
    })
    console.log(sum(1, 2) == sum(1)(2))
});
// kuai-shou-front-end => KuaiShouFrontEnd
(() => {
    function firstUp(str){
        return str.split('-').map(key => {
            return key[0].toUpperCase() + key.slice(1)
        }).join('')
    }
    console.log(firstUp('kuai-shou-front-end'))
});
// 十六进制
(() => {
    function getColor(){
        const colors = '0123456789abcdef'
        let color = '#'
        for(let i = 0; i < 6; i++){
            color += colors[Math.floor(Math.random() * colors.length)]
        }
        return color
    }
    console.log(getColor())
});
// setter
(() => {
    function setter(obj, key, value){
        let args = key.split('.')
        for (let i = 0; i < args.length; i++) {
            let k = args[i]
            if(i == args.length - 1){
                obj[k] = value
            }else{
                if(typeof obj[k] !== 'object') obj[k] = {}
            }
            obj = obj[k]
        }
        return
    }
    var n = {
        a: {
            b: {
                c: 1
            }
        },
        e: {
            f: 2
        }
    }
    console.log(setter(n, 'a.b.c', 2))
    console.log(setter(n, 'e.f', 3))
    console.log(setter(n, 'g.i', 4))
    console.log(n)
});
// promiseify
(() => {
    const fs = require('fs')
    function promiseify(fn){
        if(typeof fn !== 'function') throw new Error('must function')
        return function(){
            var args = Array.prototype.slice.call(arguments)
            var context = this
            return new Promise(function(resolve, reject){
                try {
                    args.push(function(err, result){
                        if(err) return reject(err)
                        resolve(result)
                    })
                    fn.apply(context, args)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
    promiseify(fs.readFile)(__dirname + '/q.1.html').then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
});
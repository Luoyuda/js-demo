/*
 * @Author: xiaohuolong
 * @Date: 2021-07-15 21:54:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-16 09:37:07
 * @FilePath: /js-demo/interview/1.js
 */
// 笔试题 01
// this 指向问题 10
(() => {
    var a = {
        count: 1,
        fn:function(){
            return this.count
        }
    }
    console.log(a.fn())
    console.log((fn = a.fn)())
})();
// 跨域解决方案 10
(() => {
    // JSONP xxx(data)
    // cors 
    // nodejs 反向代理
});
// http 缓存 10
(() => {
    // 不缓存 cache-control: no-store
    // 缓存 cache-control: max-age=xxx
    // 浏览器不检验缓存 cache-control: no-cache 配合服务端 etag 和 last-modified
});
// 千位加逗号 10
(() => {
    var a = 1000190.108881231
    /**
     * 
     * @param {number} num 
     * @returns 
     */
    function format(num){
        return num.toLocaleString()
    }
    console.log(format(a))
    function format1(num){
        let i = 0
        return num.toString().split('').reverse().reduce((prev, item) => {
            if(item === '.'  || item === '-') i = -1
            if(i != 0 && i % 3 === 0) item = item + ','
            i++
            prev = item + prev
            return prev
        }, '')
    }
    // .replace(/\B(?=(\d{3})+\b)/g, ',')
    console.log(format1(a))
});
function eq(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}
// clone 10
(() => {
    var a = { a: 1, b: '1', c: false, d: {a : 2, b: '2', c: true, d: { a: [{a: 1, b: [1,2,3,{a:3}]}]}}}
    function clone(obj) {
        if(typeof obj !== 'object') return obj
        let target = obj instanceof Array ? [] : {}
        for(let key in obj) {
            target[key] = clone(obj[key])
        }
        return target
    }
    console.log(eq(a, clone(a)))
});
// 树形结构转数组 10
(() => {
    var arr = [
        {
            id: 1,
            children: [
                {
                    id: 2,
                    children: [
                        {
                            id: 3,
                            children: []
                        }
                    ]
                },
                {
                    id: 5,
                    children: [
                        {
                            id: 6,
                            children: null
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            children: [
                {
                    id: 2,
                    children: [
                        {
                            id: 3,
                            children: []
                        }
                    ]
                },
                {
                    id: 5,
                    children: [
                        {
                            id: 6,
                            children: null
                        }
                    ]
                }
            ]
        }
    ]
    function flatten(arr){
        let res = []
        for (const o of arr) {
            res.push(o.id)
            if(o.children){
                res = res.concat(flatten(o.children))
            }
        }
        return res
    }
    console.log(flatten(arr))
});
// 区间和 20
(() => {
    var nums = [1,2,3,4,5,6,7,8,9,10]
    var pre = []
    pre[0] = nums[0]
    for(let i = 1; i < nums.length; i++){
        pre[i] = nums[i] + pre[i - 1]
    }
    function getRange(i, j){
        return pre[j] - (i == 0 ? 0 : pre[i - 1])
    }
    console.log(getRange(0, 5), nums.slice(0, 6).reduce((prev, item) => prev + item), 0)
    console.log(getRange(0, 9), nums.slice(0, 10).reduce((prev, item) => prev + item), 0)
});
// LazyMan 20
(() => {
    class _LazyMan {
        tasks=[]
        constructor(name){
            this.name = name
            this.say()
            this.run()
            return this
        }
        createTask(text, time){
            return () => {
                if(typeof time === 'number'){
                    setTimeout(() => {
                        console.log(text)
                        this.next()
                    }, time * 1000)
                }else{
                    console.log(text)
                    this.next()
                }
            }
        }
        run(){
            setTimeout(() => this.next())
        }
        next(){
            if(this.tasks.length) this.tasks.shift()()
        }
        say(){
            this.tasks.push(this.createTask(`Hi This is ${this.name}`))
            return this
        }
        eat(f){
            this.tasks.push(this.createTask(`eat ${f}`))
            return this
        }
        sleep(s){
            this.tasks.push(this.createTask(`Wake up after ${s}`, s))
            return this
        }
        sleepFirst(s){
            this.tasks.unshift(this.createTask(`Wake up after ${s}`, s))
            return this
        }
    }
    function LazyMan(name){
        return new _LazyMan(name);
    }
    LazyMan('Hank').eat('1').sleep(2).eat(2).sleepFirst(2)
});
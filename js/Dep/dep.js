/*
 * @Author: xiaohuolong
 * @Date: 2021-06-24 21:11:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-24 22:00:19
 * @FilePath: /js-demo/js/Dep/dep.js
 */
class Dep {
    constructor(){
        this.subs = []
    }
    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }
    depend(){
        if(Dep.target){
            Dep.target.addDep(this)
        }
    }
    /* 通知所有Watcher对象更新视图 */
    notify (val) {
        this.subs.forEach((sub) => {
            sub.update(val);
        })
    }
}
Dep.target = null
var id = 0
class Watcher {
    constructor(){
        Dep.target = this
        this.id = ++id
        this.deps = []
    }
    update(val){
        console.log('update-'+val)
    }
    addDep(dep){
        if(this.deps.indexOf(dep) == -1){
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
}

function defineReactive(obj, key, val){
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get(){
            dep.depend()
            return val
        },
        set(newVal){
            if(newVal === val) return
            dep.notify(newVal)
            val = newVal
        }
    })
}

function observer(options){
    Object.entries(options).forEach(([key, val]) => {
        defineReactive(options, key, val)
    })
}

function Vue(data){
    this._data = data
    observer(data)
    new Watcher()
    console.log(data.a)
    Dep.target = null
    return this
}

var data = {
    a: 1
}

var v = new Vue(data)
var v2 = new Vue({
    a: 2
})
console.log(data.a)
v._data.a = 2
console.log(v._data.a)
data.a = 3
console.log(v._data.a)
v2._data.a = 4
console.log(v2._data.a)
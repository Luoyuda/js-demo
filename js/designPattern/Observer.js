/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 17:16:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 18:13:26
 * @FilePath: /DesignPatterns/Observer.js
 */
const Observer = (function(){
    var __message = {}
    return {
        // 注册信息
        register: function(type, fn){
            if(__message[type] === undefined){
                __message[type] = [fn]
            }else{
                __message[type].push(fn)
            }
        },
        // 发布信息
        fire: function(type, args){
            if(!__message[type]) return
            const event = {
                type,
                args,
            }
            __message[type].forEach(fn => {
                fn.call(this, event)
            })
        },
        // 移除订阅
        remove: function(type, fn){
            if(!__message[type]) return
            if(!fn) return
            const fns = __message[type]
            const length = fns.length
            let remove = 0
            for (let i = 0; i < length; i++) {
                if(fn === fns[i]){
                    remove = 1
                }
                fns[i] = fns[i+remove]
            }
            __message[type].length = length - remove
        }
    }
})()

Observer.register('test-1', (event) => {
    console.log('fn-1')
    console.log(event)
})

Observer.register('test-1', (event) => {
    console.log('fn-2')
    console.log(event)
})

const removeFn = (event) => {
    console.log('remove-1')
    console.log(event)
}

Observer.register('test-1', removeFn)
Observer.register('test-2', removeFn)

Observer.fire('test-1', 111)
Observer.remove('test-1', removeFn)
Observer.fire('test-1', 1111)
Observer.fire('test-2', 2222)

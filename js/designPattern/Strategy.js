/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 20:05:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 20:21:59
 * @FilePath: /DesignPatterns/Strategy.js
 */
const Strategy = (function(){
    const _strategy = {
        a(arg){
            console.log(`a -> ${arg}`)
        }
    }
    return {
        check(type, ...args){
            if(!_strategy[type]) return this
            return _strategy[type](...args)
        },
        add(type, fn){
            _strategy[type] = fn
            return this
        }
    }
})()

Strategy.check('a', 123)
Strategy.add('b', (arg) => {
    return console.log(`b -> ${arg}`)
})
Strategy.check('b', 123)
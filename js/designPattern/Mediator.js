/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 22:17:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 22:25:53
 * @FilePath: /DesignPatterns/Mediator.js
 */
const Mediator = (function () {
    let _msg = {}
    return {
        register(type, action){
            if(_msg[type]){
                _msg[type].push(action)
            }else{
                _msg[type] = [action]
            }
        },
        send(type){
            if(_msg[type]){
                _msg[type].forEach(fn => {
                    fn()
                })
            }
        }
    }
})()

Mediator.register('demo', () => {
    console.log('first')
})
Mediator.send('demo')
Mediator.register('demo', () => {
    console.log('second')
})
Mediator.send('demo')
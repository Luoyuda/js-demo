/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 22:07:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 22:30:02
 * @FilePath: /DesignPatterns/Throttler.js
 */
const Throttler = function(){
    let isClear = arguments[0]
    let fn
    if(typeof isClear === 'boolean'){
        fn = arguments[1]
        fn._throttleId && clearTimeout(fn._throttleId)
    }else{
        fn = isClear
        let params = arguments[1] || {}
        let p = {
            context: null,
            args: [],
            time: 300,
            ...params,
        }
        // 清除上一次调用
        arguments.callee(true, fn)
        fn._throttleId = setTimeout(function(){
            fn.apply(p.context, p.args)
        }, p.time)
    }
}
const fn = function(a, b){
    console.log(this.a + a + b)
}
for (let index = 0; index < 100; index++) {
    Throttler(fn, {
        context: {
            a: 1
        },
        args: [2,3],
    })
}
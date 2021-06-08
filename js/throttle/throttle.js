/*
 * @Author: xiaohuolong
 * @Date: 2021-05-31 10:50:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-07 15:30:27
 * @FilePath: /js-demo/js/throttle/throttle.js
 */
/*
一段时间内无论触发多少次，只执行一次
    1. 定义一个下次触发时间的变量
    2. 通过设置当前时间戳 + 时间间隔的方式来控制是否触发事件
*/
// // 时间戳实现，会立刻执行，停止触发后没有办法再执行事件
// function throttle(fn, wait){
//     var prev = 0
//     var throttled = function(){
//         var now = +new Date()
//         var context = this
//         var args = arguments
//         if(now - prev > wait){
//             fn.apply(context, args)
//             prev = now
//         }
//     }
//     return throttled
// }
// 定时器实现 n 秒后第一次执行，停止触发后依然会再执行一次事件
// function throttle(fn, wait){
//     var timeout
//     var throttled = function(){
//         var context = this
//         var args = arguments
//         if(!timeout){
//             timeout = setTimeout(function(){
//                 timeout = null
//                 fn.apply(context, args)
//             }, wait)
//         }
//     }
//     return throttled
// }

// function throttle(func,wait,options) {
//     var context,args,timeout,result;
//     var previous = 0;
//     options = options || {};
//     // leading：false 表示禁用第一次执行
//     // trailing: false 表示禁用停止触发的回调
//     var later = function(){
//         previous = options.leading === false ? 0 : new Date().getTime();
//         timeout = null;
//         result = func.apply(context, args);
//     }
//     var throttled = function(){
//         var now = +new Date();
//         if (!previous && options.leading === false) previous = now;
//         // 下次触发 func 的剩余时间
//         var remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         // 如果没有剩余的时间了或者你改了系统时间
//         if(remaining > wait || remaining <= 0){
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             result = func.apply(context, args);
//         }else if(!timeout && options.trailing !== false){
//             timeout = setTimeout(later, remaining);
//         }
//         return result;
//     }
//     throttled.cancel = function() {
//         clearTimeout(timeout);
//         previous = 0;
//         timeout = null;
//     }
//     return throttled
// }
/**
 * 
 * @param {function} fn 执行方法
 * @param {number} wait 等待时间
 * @param {配置} options leading：是否允许立即执行 trailing：是否允许最后一次执行
 * @returns 
 */
function throttle(fn, wait, options) {
    options = options || {}
    var result, context, args, timeout
    var prev = 0
    var later = function(){
        prev = options.leading === false ? 0 : +new Date()
        timeout = null
        result =fn.apply(context, args)
    }
    var t = function(){
        var now = +new Date()
        prev = !prev && options.leading === false ? now : prev
        var r = wait - (now - prev)
        context = this
        args = arguments
        if(r > wait || r <= 0){
            if(timeout){
                clearTimeout(timeout)
                timeout = null
            }
            prev = now
            result = fn.apply(context, args)
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
module.exports = {
    throttle
}
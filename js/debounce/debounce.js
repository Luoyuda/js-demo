/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 13:03:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-07 15:25:18
 * @FilePath: /js-demo/js/debounce/debounce.js
 */
/*
无论触发多少次，都是 N 秒后执行
    1. 定义一个定时器 变量
    2. 函数内，获取 this 参数
    3. 函数内，设置定时器
    4. 返回一个包装后的函数
*/
function debounce(fn, wait, immediate) {
    var timeout, result
    var debounced = function(){
        var context = this
        var args = arguments
        // 如果存在，取消后 wait 秒后再调用
        if(timeout) clearTimeout(timeout)
        if(immediate){
            // 立即触发
            // 如果没有触发过，则直接触发
            var caller = !timeout
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            if(caller) result = fn.apply(context, args)
        }else{
            timeout = setTimeout(function(){
                result = fn.apply(context, args)
                timeout = null
            }, wait)
        }
        return result
    }
    // 取消
    debounced.cancel = function(){
        if(timeout) clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
module.exports = {
    debounce
}
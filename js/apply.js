/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 08:23:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-30 11:40:27
 * @FilePath: /js-demo/js/apply.js
 */
/*
使用一个指定的this值调用某个函数
    1. 将函数设为对象属性
    2. 执行函数
    3. 删除该对象属性
*/
Function.prototype.newApply = function(){
    if(typeof this !== 'function') throw new Error('no function')
    var context = arguments[0] || window
    context.fn = this
    var args = arguments[1] || []
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}

const a = {
    b: 1
}
function c (a, b){
    console.log('c')
    console.log(this.b)
    console.log(a, b)
    return this.b + a + b
}

console.log(c.apply(a, [1, 2]))
console.log(c.newApply(a, [1, 2]))
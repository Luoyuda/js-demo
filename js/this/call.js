/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 08:23:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-03 20:24:21
 * @FilePath: /js-demo/js/call.js
 */
/**
使用一个指定的this值调用某个函数
  1. 将函数设为对象属性
  2. 执行函数
  3. 删除该对象属性
 */
Function.prototype.newCall = function(){
  if(typeof this !== 'function') throw new Error('no function')
  var context = arguments[0] || window
  context.fn = this
  var args = []
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }
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

console.log(c.call(a, 1, 2))
console.log(c.newCall(a, 1, 2))
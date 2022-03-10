/* 
全局 function 
function a(){

}
function b(){
  
}

namespace模式 简单对象封装
var a = {
  bar(){

  }
}
var b = {
  for(){

  }
}

IIFE模式
~(function (){
  var val = 1
  window.a = { 
    get(){
      return val
    },
    set(b){
      value = b
    }
  }
})()

引入依赖
var a = (function() {
  return {
    c: 1
  }
})()
var b = (function (a){
  return {
    d: a.c + 1
  }
})(a)


请求过多
依赖模糊-先后加载问题
难以维护
script('a.js')
script('b.js')

*/
// CommonJS
// exports.a = a
// module.exports = a

// require('a')

// AMD
// define(function (){
//   return a
// })
// // 引入依赖
// define(['a', 'b'], function (a, b) {
//   return c
// })
// // 引入模块
// require(['a', 'b'], function (a, b){

// })

// CMD
//定义有依赖的模块
// define(function(require, exports, module){
//   //引入依赖模块(同步)
//   var module2 = require('./module2')
//   //引入依赖模块(异步)
//   require.async('./module3', function (m3) {
//   })
//   //暴露模块
//   exports.xxx = value
//   module.exports = value
// })

// ES6
// 导入
import a from './a'
// 暴露
export const b = {} // import { b } from '/b'
export default b // import b from './b'
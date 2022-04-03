/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 10:48:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-05 17:25:47
 * @FilePath: /js-demo/js/unique/unique.js
 */
/**
 * 去重
 * @param {[]} array 待去重数组
 * @param {Boolean} isSorted 是否排序
 * @param {function} iteratee 比较函数
 * @param {object} context 作用域
 */
function unique(array, isSorted, iteratee, context){
  if(typeof isSorted !== 'boolean'){
    context = iteratee
    iteratee = isSorted
    isSorted = false
  }
  if(isSorted === true){
    iteratee = function(value){ return value }
  }else if(typeof iteratee !== "function"){
    iteratee = function(value){
      value = value instanceof RegExp ? value.toString() : value
      var key = (typeof value) + JSON.stringify(value)
      if(this[key]) return false
      this[key] = true
      return true
    }
  }
  iteratee = iteratee.bind(context || {})
  var result = []
  var last
  for(var i = 0; i < array.length; i++){
    var value = array[i]
    var computed = iteratee(value, i, array)
    if(isSorted){
      if(!i || computed !== last) result.push(value)
      last = value
    }else{
      if(computed) result.push(value)
    }
  }
  return result
}
module.exports = {
    unique
}
/*
 * @Author: xiaohuolong
 * @Date: 2021-05-30 08:23:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-03 20:43:45
 * @FilePath: /js-demo/js/new.js
 */
/*
创建一个用户定义的对象类型实例
  1. 先从 Object.prototype 克隆一个对象 O
  2. Construtor 是外部传入的构造器
  3. O.__proto__ = Construtor.prototype
  4. ret = Construtor.apply(O, arguments) 借用构造器给obj设置属性
  5. ret || O 总是返回一个对象
*/
function New(){
  var obj = new Object();
  var Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let ret =Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

function A(a, b){
  return {a, b, c: 3}
}

function B(a, b){
  this.a = a
  this.b = b
}

console.log(new A(1, 2))
console.log(New(A, 1, 2))

console.log(new B(1, 2))
console.log(New(B, 1, 2))
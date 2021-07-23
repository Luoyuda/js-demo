/*
 * @Author: xiaohuolong
 * @Date: 2021-01-11 13:17:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-01-14 14:39:05
 * @FilePath: /javascript/src/extend/index.js
 */
/**
 * 原型链继承
 * 通过原型链实现继承
 * 优点
 * 实现了继承
 * 缺点
 * 引用类型的属性绘本所有实例共享
 * 创建 Child 实例无法向 Parent 传参
 * 原型链
 * child.__proto__ -> Child.prototype -> new Parent()
 * Child.prototype.constructor -> Parent
 */
function Parent(){

}
Parent.prototype.sayName = function(){
    console.log(this.name)
}
function Child(name){
    this.name = name
}
Child.prototype = new Parent()

var child = new Child('child')

child.sayName() // child
console.log(child) // Parent { name: 'child' }
console.log(child instanceof Parent) // true
console.log(child instanceof Child) // true
console.log(child.__proto__ === Child.prototype) // true
console.log(Child.prototype.constructor === Parent) // true

/**
 * 借用构造函数继承
 * 在子类中调用父类的构造函数绑定在子类的 this 上
 * 优点
 * 避免了引用类型被共享的问题
 * Child 可以向 Parent 传参
 * 缺点
 * 每次创建实例都会创建一遍父类方法
 * 原型链
 * child.__proto__ -> Child.prototype
 * Child.prototype.constructor -> Child
 */

function Parent2(name){
    this.name = name
    this.sayName = function(){
        console.log(this.name)
    }
}
function Child2(name){
    Parent2.call(this, name)
}

var child2 = new Child2('child')

child2.sayName() // child
console.log(child2) // Child2 { name: 'child' }
console.log(child2 instanceof Parent2) // true
console.log(child2 instanceof Child2) // true
console.log(child2.__proto__ === Child2.prototype) // true
console.log(Child2.prototype.constructor === Child2) // true

/**
 * 组合继承
 * 在子类中调用父类掉构造函数绑定到子类的 this 上，把子类的原型等于父类的实例
 * 优点
 * 避免引用被共享
 * 不需要重复创建方法
 * 缺点
 * 多一次 new 的开销
 * 原型链
 * child.__proto__ -> Child.prototype
 * Child.prototype.constructor -> Child
 */

function Parent3(name){
    this.name = name
}
Parent3.prototype.sayName = function(){
    console.log(this.name)
}
function Child3(name){
    Parent3.call(this, name)
}
Child3.prototype = new Parent()
Child3.prototype.constructor = Child3

const child3 = new Child3('child3')

child3.sayName() // child3
console.log(child3) // Child3 { name: 'child3' }
console.log(child3 instanceof Parent2) // false
console.log(child3 instanceof Child3) // true
console.log(child3.__proto__ === Child3.prototype) // true
console.log(Child3.prototype.constructor === Child3) // true

/**
 * 原型式继承
 * 将传入的对象作为创建的对象的原型
 * 优点
 * 实现了继承吧🐶
 * 缺点
 * 引用类型被共享
 * 原型链
 * child.__proto__ -> F.prototype -> o
 */
const P = {
    name: 'P',
    sayName(){
        console.log(this.name)
    }
}
function CreateObj(o){
    function F(){}
    F.prototype = o
    return new F()
}
const child4 = CreateObj(P)

child4.sayName() // P
console.log(child4) // {}
console.log(child4 instanceof Object) // true
console.log(child4.__proto__ === P) // true

/**
 * 寄生式继承
 * 创建一个封装继承过程的函数，用来增强对象，然后返回对象
 * 优点
 * 实现了继承吧🐶，封装性好了点
 * 缺点
 * 重复创建方法
 * 引用类型共享
 * 原型链
 * child.__proto__ -> o
 */

function CreateObj1(o, name){
    var clone = Object.create(o)
    clone.name = name
    return clone
}

const child5 = CreateObj1(P, 'child5')
child5.sayName() // P
console.log(child5) // {}
console.log(child5 instanceof Object) // true
console.log(child5.__proto__ === P) // true

/**
 * 寄生组合式继承
 * 优点
 * 只调用一次父类构造函数
 * 避免在 Parent.prototype 上创建不必要多余的属性
 * 原型链保持不变，能正常使用 instanceof 和 isPrototypeOf
 * 原型链
 * child.__proto__ -> Child.prototype
 * Child.prototype.constructor -> Child
 */

function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

function inherit(child, parent){
    const prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}

function Parent6(name){
    this.name = name
}
Parent6.prototype.sayName = function(){
    console.log(this.name)
}

function Child6(name){
    // 增强子类实例
    Parent6.call(this, name)
}
// 绑定原型
inherit(Child6, Parent6)

const child6 = new Child6('child6')

child6.sayName() // child6
console.log(child6) // Child6 { name: 'child6' }
console.log(child6 instanceof Child6) // true
console.log(child6 instanceof Parent6) // true
console.log(child6.__proto__ === Child6.prototype) // true
console.log(Child6.prototype.constructor === Child6) // true
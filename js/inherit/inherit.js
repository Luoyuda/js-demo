/*
 * @Author: xiaohuolong
 * @Date: 2021-06-04 14:28:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-04 15:59:26
 * @FilePath: /js-demo/js/inherit/inherit.js
 */
(() => {
    /**
     * 原型链继承
     * 缺点
     * 引用类型的属性被所有实例共享
     * 创建 Child 实例无法向 Parent 传参
     * child.__proto__ === Child.prototype === new Parent
     * child.__proto__.constructor === Parent
    */
    function Parent(){
        this.name = 'Parent'
    }
    Parent.prototype.say = function(){
        console.log(this.name)
    }
    
    function Child(){
    
    }
    
    Child.prototype = new Parent()
    
    var child = new Child()
    console.log(child.__proto__ === Child.prototype) // true
    console.log(child.__proto__.constructor === Parent) // true
    child.say()
})();

(() => {
    /**
     * 借用构造函数继承
     * 优点
     * 避免了引用类型被共享的问题
     * Child 可以向 Parent 传参
     * 缺点
     * 每次创建实例都会创建一遍父类方法
     * child.__proto__ === Child.prototype
     * child.__proto__.constructor === Child
     */
    function Parent(name){
        this.name = name
        this.say = function(){
            console.log(this.name)
        }
    }
    
    function Child(){
        Parent.apply(this, arguments)
    }
    
    var child = new Child('child')
    console.log(child.__proto__ === Child.prototype) // true
    console.log(child.__proto__.constructor === Child) // true
    child.say() // child
})();

(() => {
    /**
     * 组合模式
     * 优点：
     * 避免了引用被共享
     * 不需要重复创建方法
     * 缺点：
     * 需要多 new 一次
     */
    function Parent(name){
        this.name = name
    }
    Parent.prototype.say = function(){
        console.log(this.name)
    }
    function Child(name){
        Parent.apply(this, arguments)
    }
    Child.prototype = new Parent()
    Child.prototype.constructor = Child
    var child = new Child('child')
    console.log(child.__proto__ === Child.prototype) // true
    console.log(child.__proto__.constructor === Child) // true
    child.say() // child
})();

(() => {
    /**
     * 原型式继承
     * 缺点
     * 引用类型共享
     * child.__proto__ === parent
     * child.__proto__.constructor === Object
     */
    function CreateObj(o){
        function F(){}
        F.prototype = o
        return new F()
    }
    var parent = {
        name: 'parent',
        say: function(){
            console.log(this.name)
        }
    }
    var child = CreateObj(parent)
    child.say()
    console.log(child.__proto__ === parent)
    console.log(child.__proto__.constructor === Object)
})();

(() => {
    /**
     * 寄生式继承
     * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
     */
    function CreateObj(o){
        function F(){}
        F.prototype = o
        return new F()
    }
    var parent = {
        name: 'parent',
        say: function(){
            console.log(this.name)
        }
    }
    var Child = function(o, name){
        var clone = CreateObj(o)
        clone.name = name
        return clone
    }
    var child = Child(parent, 'child')
    child.say()
    console.log(child.__proto__ === parent)
    console.log(child.__proto__.constructor === Object)
})();

(() => {
    /**
     * 寄生组合式继承
     * 优点
     * 只调用了一次父类的构造函数
     * 避免了在 Parent.prototype 上面创建不必要的、多余的属性
     * 原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf
     */
    function inherit(Child, Parent){
        function F(){}
        F.prototype = Parent.prototype
        Child.prototype = new F()
        Child.prototype.constructor = Child
    }
    function Parent(name){
        this.name = name
    }
    Parent.prototype.say = function(){
        console.log(this.name)
    }
    function Child(){
        Parent.apply(this, arguments)
    }
    inherit(Child, Parent)
    var child = new Child('child')
    child.say()
    console.log(child.__proto__ === Child.prototype)
    console.log(child.__proto__.constructor === Child)
})();

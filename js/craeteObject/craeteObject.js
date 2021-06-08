/*
 * @Author: xiaohuolong
 * @Date: 2021-06-04 10:21:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-04 11:02:29
 * @FilePath: /js-demo/js/craeteObject/craeteObject.js
 */
/*
工厂模式
函数 factory 能够接受参数来构建一个包含必要信息的对象，可以无数次的调用这个函数。而每次都返回一个对象
优点：
    批量生成相似对象
缺点：
    对象指向同一个原型 ，生成对象无法识别
    每个方法都需要创建一次
*/
function factory(name, age){
    var o = new Object()
    o.name = name
    o.age = age
    o.say = function(){
        console.log(`name=${this.name}, age=${this.age}`)
    }
    return o
}

var a = factory('a', 20)
var b = factory('b', 10)
a.say()
b.say()

/*
构造函数模式
通过构造函数来创建特定类型的对象 要通过 new 操作符
优点：
    实例都可以被识别成一种特定类型
缺点：
    每次创建实例 每个实例方法都需要被创建一次
*/

function create(name, age){
    this.name = name
    this.age = age
    this.say = function(){
        console.log(`name=${this.name}, age=${this.age}`)
    }
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()

/*
原型模式
每个函数都有一个 prototype，可以使用原型对象，让所有的对象实例共享它所包含的属性方法
优点：
    方法不会重复创建
缺点：
    所有属性方法共享，不能初始化参数
*/
function Prototype(){

}
Prototype.prototype = {
    constructor: Prototype,
    name: 'a',
    say:function(){
        console.log(this.name)
    }
}

var a = new Prototype()
var b = new Prototype()
a.say()
b.say()

/*
组合模式
构造函数跟原型模式双剑合璧。构造函数模式用于定义实例属性，原型属性定义方法和共享属性。
优点
    该共享的共享，该私有的私有
缺点
    封装性不足
*/

function Create(name, age){
    this.name = name;
    this.age = age;
}
Create.prototype.say = function(){
    console.log(`name=${this.name}, age=${this.age}`)
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()

/*
动态原型模式
为了解决独立的构造函数和原型，动态原型模式，把信息封装到构造函数中，而且通过在构造函数初始化原型
优点：
    组合模式的优点，且封装性更好
缺点：
    多判断一次
*/

function CreatePrototype(name, age){
    this.name = name
    this.age = age
    if(typeof this.say !== 'function'){
        CreatePrototype.prototype.say = function(){
            console.log(`name=${this.name}, age=${this.age}`)
        }
    }
}

var a = new CreatePrototype('a', 20)
var b = new CreatePrototype('b', 10)
a.say()
b.say()

/*
寄生构造函数模式
创建一个函数，该函数的作用仅仅在封装创建对象的代码，然后返回新创建的对象
缺点：
    工厂模式 + new
*/

function NewFactory(name, age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.say = function () {
        console.log(`name=${this.name}, age=${this.age}`)
    };
    return o;
}

var a = new NewFactory('a', 20)
var b = new NewFactory('b', 10)
a.say()
b.say()

/*
稳妥函数模式
那些没有公共属性，而且其方法不引用this
优点：
    不需要 new 不引用 this
缺点：
    生成对象无法识别
*/

function StaticCreate(name, age){
    var o = new Object()
    o.say = function () {
        console.log(`name=${name}, age=${age}`)
    }
    return o
}

var a = new StaticCreate('a', 20)
var b = new StaticCreate('b', 10)
a.say()
b.say()
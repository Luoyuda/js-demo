/*
 * @Author: xiaohuolong
 * @Date: 2021-01-07 16:23:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-01-11 13:15:25
 * @FilePath: /javascript/src/createObject/index.js
 */
/**
 * 工厂模式
 * 调用函数传入参数构建一个对象，多次调用反对多个对象
 * 优点
 * 批量生成相似对象
 * 缺点
 * 对象指向同一个原型，生成对象无法识别
 * 每个方法都要创建一次
 */
console.log('----工厂模式----')
function CreatePerson(name){
    const obj = {}
    obj.name = name
    obj.sayName = () => console.log(name)
    return obj
}
const ming = CreatePerson('ming')
console.log(ming) // { name: 'ming', sayName: [Function] }
ming.sayName() // ming
console.log(ming instanceof CreatePerson) // false

/**
 * 构造函数模式
 * 通过new操作构造函数创建特定类型的对象
 * 优点
 * 实例都可以被识别成一种特定类型
 * 缺点
 * 每次创建实例，所有实例方法都会被创建一遍
 */
console.log('----构造函数模式----')
function CreateAnimal(type){
    this.type = type
    this.sayName = function(){
        console.log(this.type)
    }
    return this
}
const cat = new CreateAnimal('cat')
console.log(cat) // CreateAnimal { type: 'cat', sayName: [Function] }
cat.sayName() // cat
console.log(cat instanceof CreateAnimal) // true

/**
 * 原型模式
 * 通过函数原型，使创建的对象共享原型上的方法
 * 优点
 * 方法不会重复创建
 * 缺点
 * 所有属性方法共享，不能初始化参数
 */

function CreateAny(){}
CreateAny.prototype.name = 'ming'
CreateAny.prototype.sayName = function(){
    console.log(this.name)
}
const xia = new CreateAny()
console.log(xia) // CreateAny {}
xia.sayName() // undefined
console.log(xia instanceof CreateAny) // true

/**
 * 组合模式
 * 使用构造函数+原型模式，使用构造函数定义实例属性，原型属性定义共享方法
 * 优点
 * 该共享共享，该私有私有
 * 缺点
 * 封装不足
 */
function CreateXX(name){
    this.name = name
}
CreateXX.prototype.sayName = function(){
    console.log(this.name)
}

const yu = new CreateXX('yu')
console.log(yu) // CreateXX { name: 'yu' }
yu.sayName() // yu
console.log(yu instanceof CreateXX) // true

/**
 * 动态原型模式
 * 解决各自独立的构造函数跟原型，把信息封装到构造函数中，通过构造函数初始化原型
 * 优点
 * 封装性好了起来
 * 缺点
 * 每次都需要多走一次判断
 */
function CreateXY(name){
    this.name = name
    if(typeof this.sayName !== 'function'){
        CreateXY.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}

const jun = new CreateXY('jun')
console.log(jun) // CreateXY { name: 'jun' }
jun.sayName() // jun
console.log(jun instanceof CreateXY) // true

/**
 * 寄生构造函数模式
 * 使用构造函数来解决指向问题，然后在函数内部使用工厂模式
 * 优点
 * 无
 * 缺点
 * 工厂模式 + new
 */

function CreateSB(name){
    const sb = {}
    sb.name = name
    sb.sayName = function(){
        console.log(this.name)
    }
    return sb
}

const sb = new CreateSB('sb')
console.log(sb) // { name: 'sb', sayName: [Function] }
sb.sayName() // sb
console.log(sb instanceof CreateSB) // false

/**
 * 稳妥函数模式
 * 没有公共属性，其方法不引用this
 * 优点
 * 不需要 new
 * 不引用 this
 * 缺点
 * 生成对象无法识别
 */

function CreateF(name){
    const o = {}
    o.sayName = function(){
        console.log(name)
    }
    return o
}

const f = CreateF('F')
console.log(f) // { sayName: [Function] }
f.sayName() // F
console.log(f instanceof CreateF) // false
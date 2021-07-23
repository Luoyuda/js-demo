/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 16:12:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 17:07:37
 * @FilePath: /DesignPatterns/TemplateMethod.js
 */
const TemplateCar = function(data = {}){
    this.type = data.type || ''
    this.wheelCount = data.wheelCount || 2
    this.mirrorCount = data.mirrorCount || 2
    this.color = data.color || '白色'
    this.beforeRun = data.beforeRun || this.beforeRun
    this.afterRun = data.afterRun || this.afterRun
}
TemplateCar.prototype.makeWheel = function(count){
    console.log(`正在做出${count}个轮子`)
}
TemplateCar.prototype.makeMirror = function(count){
    console.log(`正在做出${count}个后视镜`)
}
TemplateCar.prototype.makeCarBody = function(color){
    console.log(`正在做出${color}车身`)
}
TemplateCar.prototype.beforeRun = function(){
    console.log(`逮虾户，油门启动`)
}
TemplateCar.prototype.afterRun = function(){
    console.log(`逮虾户，猛踩刹车`)
}
TemplateCar.prototype.run = function(){
    this.beforeRun()
    console.log(`我一路向北，离开有你的地方`)
    this.afterRun()
}
TemplateCar.prototype.init = function(){
    this.makeWheel(this.wheelCount)
    this.makeMirror(this.mirrorCount)
    this.makeCarBody(this.color)
}

const Motorcycle = function(data = {}){
    data.type = 'motorcycle'
    TemplateCar.call(this, data)
    this.init()
}
Motorcycle.prototype = new TemplateCar()

const Car = function(data = {}){
    data.type = 'car'
    data.mirrorCount = 2
    data.wheelCount = 4
    TemplateCar.call(this, data)
    this.init()
}
Car.prototype = new TemplateCar()
Car.prototype.init = function(){
    this.makeWheel(this.wheelCount)
    this.makeMirror(this.mirrorCount)
    this.makeCarBody(this.color)
    console.log(`小汽车组装完毕`)
}

const ToyotaCar = function(data={}){
    this.logo = 'Toyota'
    Car.call(this, data)
}
ToyotaCar.prototype = new Car()

const motorcycle = new Motorcycle()
motorcycle.run()
console.log(motorcycle.type)

const car = new Car({
    beforeRun(){
        console.log(`w启动了`)
    },
    afterRun(){
        console.log(`没有人能追得上我`)
    }
})
car.run()
console.log(car.type)

const toyotaCar = new ToyotaCar({
    beforeRun(){
        console.log(`丰田启动`)
    },
    afterRun(){
        console.log(`没有人能追得上我的脚步`)
    }
})
toyotaCar.run()
console.log(toyotaCar.logo + toyotaCar.type)

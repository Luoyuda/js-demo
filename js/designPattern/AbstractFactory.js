/*
 * @Author: xiaohuolong
 * @Date: 2020-08-12 23:44:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-13 00:04:26
 * @FilePath: /DesignPatterns/AbstractFactory.js
 */
const VehicleFactory = function(subType, superType) {
    if(typeof VehicleFactory[superType] === 'function'){
        // 继承父类 比如 BWM 继承 Car YUTONG 继承 Bus
        function F() {}
        F.prototype = new VehicleFactory[superType]()
        subType.constructor = subType
        subType.prototype = new F()
    }else{
        throw new Error('未创建抽象类')
    }
}
VehicleFactory.Car = function(){
    this.type = 'Car'
}
VehicleFactory.Car.prototype.getPrice = function(){
    throw new Error('抽象方法不可调用')
}
VehicleFactory.Car.prototype.getSpeed = function(){
    throw new Error('抽象方法不可调用')
}

VehicleFactory.Bus = function(){
    this.type = 'Bus'
}
VehicleFactory.Bus.prototype.getPrice = function(){
    throw new Error('抽象方法不可调用')
}
VehicleFactory.Bus.prototype.getSpeed = function(){
    throw new Error('抽象方法不可调用')
}

const BMW = function(price, speed){
    this.price = price
    this.speed = speed
}
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function(){
    return this.type + ' price ' + this.price
}
BMW.prototype.getSpeed = function(){
    return this.type + ' speed ' + this.speed
}

const YUTONG = function(price, speed){
    this.price = price
    this.speed = speed
}
VehicleFactory(YUTONG, 'Bus')
YUTONG.prototype.getPrice = function(){
    return this.type + ' price ' + this.price
}
YUTONG.prototype.getSpeed = function(){
    return this.type + ' speed ' + this.speed
}

const b1 = new BMW(1,2)
console.log(b1.getPrice())
console.log(b1.getSpeed())

const b2 = new YUTONG(1,2)
console.log(b2.getPrice())
console.log(b2.getSpeed())

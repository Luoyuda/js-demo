/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 20:08:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 20:48:20
 * @FilePath: /DesignPatterns/Bridge.js
 */
// 运动单元
const Speed = function(x, y){
    this.x = x
    this.y = y
}
Speed.prototype.run = function(x, y){
    console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
    this.x = x
    this.y = y
}
// 颜色单元
const Color = function(color){
    this.color = color
}
Color.prototype.draw = function(){
    console.log(`绘制${this.color}`)
}
// 变形单元
const Shape = function(shape){
    this.shape = shape
}
Shape.prototype.change = function(){
    console.log(`变形 ${this.shape}`)
}
// 说话单元
const Speak = function(){
    
}
Speak.prototype.say = function(word){
    console.log(`${word}`)
}
// 球类
const Ball = function(c, x=0, y=0){
    this.speed = new Speed(x, y)
    this.color = new Color(c)
}
// 精灵类
const Sprite = function(c, x, y, s){
    this.shape = new Shape(s)
    this.speed = new Speed(x, y)
    this.color = new Color(c)
}
// 人类
const Person = function(x, y){
    this.speed = new Speed(x, y)
    this.speak = new Speak()
}

const ball = new Ball('#fff')
ball.color.draw()
ball.speed.run(1,2)

const sprite = new Sprite('#fff', 0, 0, '正方形')
sprite.color.draw()
sprite.speed.run(1,2)
sprite.shape.change()

const person = new Person(1,1)
person.speed.run(3,4)
person.speak.say('我说话看看')
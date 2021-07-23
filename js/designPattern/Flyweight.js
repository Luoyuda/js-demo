/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 20:08:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 22:39:13
 * @FilePath: /DesignPatterns/Flyweight.js
 */
// 运动单元
const speed = {
    run: function(x, y){
        console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
        this.x = x
        this.y = y
    }
}
// 颜色单元
const color = {
    draw: function(){
        console.log(`绘制${this.color}`)
    }
}
// 变形单元
const shape = {
    change: function(){
        console.log(`变形 ${this.shape}`)
    }
}
// 说话单元

const speak = {
    say: function(word){
        console.log(`${word}`)
    }
}

// 球类
const Ball = function(c, x=0, y=0){
    this.x = x
    this.y = y
    this.color = c
}
Ball.prototype = {
    ...color,
    ...speed,
}

// 精灵类
const Sprite = function(c, x, y, s){
    this.x = x
    this.y = y
    this.color = c
    this.shape = s
}
Sprite.prototype = {
    ...color,
    ...speed,
    ...shape
}

// 人类
const Person = function(x, y){
    this.x = x
    this.y = y
}
Person.prototype = {
    ...speak,
    ...speed,
}

const ball = new Ball('#fff', 0, 0)
ball.draw()
ball.run(1,2)

const sprite = new Sprite('#fff', 0, 0, '正方形')
sprite.draw()
sprite.run(1,2)
sprite.change()

const person = new Person(1,1)
person.run(3,4)
person.say('我说话看看')
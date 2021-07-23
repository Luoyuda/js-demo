/*
 * @Author: xiaohuolong
 * @Date: 2020-08-13 23:37:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-13 23:43:03
 * @FilePath: /DesignPatterns/Prototype.js
 */
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.getName = function() {
    return this.name
}
Person.prototype.getAge = function() {
    return this.age
}

const Woman = function(name, age) {
    Person.call(this, name, age)
}
Woman.prototype = new Person()
Woman.prototype.getAge = function() {
    return `女人的年龄是秘密`
}
const Man = function(name, age) {
    Person.call(this, name, age)
}
Man.prototype = new Person()

const woman = new Woman('小红', 24)
const man = new Man('李白', 24)

console.log(woman.getName())
console.log(woman.getAge())
console.log(man.getName())
console.log(man.getAge())
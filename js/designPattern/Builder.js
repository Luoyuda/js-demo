/*
 * @Author: xiaohuolong
 * @Date: 2020-08-13 23:06:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-13 23:21:35
 * @FilePath: /DesignPatterns/Builder.js
 */
const Human = function (params) {
    this.skill = params.skill || '无'
    this.hobby = params.hobby || '无'
}
Human.prototype.getSkill = function() {
    return this.skill
}
Human.prototype.getHobby = function() {
    return this.hobby
}

const Name = function(name) {
    this.wholeName = name
}

const Work = function(work) {
    switch (work) {
        case 'code':
            this.work = '搬砖师'
            this.workDescription = '996警告'
            break;
        case 'ui':
            this.work = 'P图师'
            this.workDescription = '想要五彩斑斓的黑'
            break;
        default:
            this.work = '无业游民'
            this.workDescription = '干一天玩三天'
            break;
    }
}

Work.prototype.changeWork = function(work) {
    this.work = work
}
Work.prototype.changeWorkDescription = function(workDescription) {
    this.workDescription = workDescription
}

const Person = function(name, work, skill, hobby){
    const _person = new Human(skill, hobby)
    _person.name = new Name(name)
    _person.work = new Work(work)
    return _person
}

const person = Person('陈夏雨', 'code', '搬砖', '')

console.log(person)
console.log(person.getHobby())
console.log(person.getSkill())
console.log(person.name)
console.log(person.work)
person.work.changeWork('ui')
person.work.changeWorkDescription('放大的同时缩小一点')
console.log(person.work)
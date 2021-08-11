/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 13:20:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 13:58:47
 * @FilePath: /js-demo/refactoring/7.2.js
 */
(() => {
    class Person {
        constructor(name){
            this._name = name
            this._courses = []
        }
        get name(){return this._name }
        get courses() { return this._courses }
        set courses(courses) { this._courses = courses }
    }
    class Course {
        constructor(name, isAdvanced){
            this._name = name
            this._isAdvanced = isAdvanced
        }
        get name(){return this._name }
        get isAdvanced(){return this._isAdvanced }
    }
    const CoursesName = [{ name:'Math', isAdvanced: true }, { name:'Chinese', isAdvanced: true }, { name:'English', isAdvanced: false }]
    const p = new Person('xy')
    p.courses = CoursesName.map(({ name, isAdvanced }) => new Course(name, isAdvanced))
    p.courses.push(new Course('history', true)) // 无法监测的行为！
    console.log(p.courses.filter(c => c.isAdvanced))
})();
(() => {
    class Person {
        constructor(name){
            this._name = name
            this._courses = []
        }
        get name(){return this._name }
        get courses() { return this._courses.slice() }
        set courses(courses) { this._courses = courses.slice() }
        addCourse(aCourse) { this._courses.push(aCourse) }
        removeCourse(aCourse) { {
            const index = this._courses.indexOf(aCourse)
            if(index === -1) throw new RangeError("not in")
            this._courses.splice(index, 1)
        }}
    }
    class Course {
        constructor(name, isAdvanced){
            this._name = name
            this._isAdvanced = isAdvanced
        }
        get name(){return this._name }
        get isAdvanced(){return this._isAdvanced }
    }
    const CoursesName = [{ name:'Math', isAdvanced: true }, { name:'Chinese', isAdvanced: true }, { name:'English', isAdvanced: false }]
    const history = new Course('history', true)
    const p = new Person('xy')
    p.courses = CoursesName.map(({ name, isAdvanced }) => new Course(name, isAdvanced))
    p.addCourse(history)
    console.log(p.courses.filter(c => c.isAdvanced))
    p.removeCourse(history)
    console.log(p.courses.filter(c => c.isAdvanced))
})();


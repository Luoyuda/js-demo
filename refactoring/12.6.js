/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 20:50:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 21:33:59
 * @FilePath: /js-demo/refactoring/12.6.js
 */
(() => {
    class Employee {
        constructor(name, type){
            this.validateType(type)
            this._name = name
            this._type = type
        }
        validateType(type){
            if(!['engineer', 'salesman', 'manager'].includes(type)){
                throw new Error('Invalid type')
            }
        }
        toString() { return `${this._name} (${this._type})`}
    }
    const e = new Employee('x', 'engineer')
    const s = new Employee('x', 'salesman')
    const m = new Employee('x', 'manager')
    console.log(e.toString())
    console.log(s.toString())
    console.log(m.toString())
})();
(() => {
    class Employee {
        constructor(name){
            this._name = name
        }
        toString() { return `${this._name} (${this.type})`}
    }
    class Engineer extends Employee{
        get type(){ return 'engineer' }
    }
    class Salesman extends Employee{
        get type(){ return 'salesman' }
    }
    class Manager extends Employee{
        get type(){ return 'manager' }
    }
    function createEmployee(name, type){
        switch(type){
            case 'engineer': return new Engineer(name)
            case 'salesman': return new Salesman(name)
            case 'manager': return new Manager(name)
            default: throw new Error('Invalid type')
        }
    }
    const e = createEmployee('x', 'engineer')
    const s = createEmployee('x', 'salesman')
    const m = createEmployee('x', 'manager')
    console.log(e.toString())
    console.log(s.toString())
    console.log(m.toString())
})();
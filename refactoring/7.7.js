/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 16:03:53
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 16:12:55
 * @FilePath: /js-demo/refactoring/7.7.js
 */
(() => {
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        get department(){return this._department }
        set department(arg){this._department = arg}
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    let web = new Department()
    web.chargeCode = 100
    web.manager = 'xy'
    let xx = new Person('xx')
    xx.department = web
    console.log(xx.department.manager)
})();
(() => {
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        get manager(){return this.department.manager }
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    let web = new Department()
    web.chargeCode = 100
    web.manager = 'xy'
    let xx = new Person('xx')
    xx.department = web
    console.log(xx.manager)
})();
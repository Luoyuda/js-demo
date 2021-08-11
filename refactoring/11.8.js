/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 08:15:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 08:22:32
 * @FilePath: /js-demo/refactoring/11.8.js
 */
(() => {
    class Employee{
        constructor(name, typeCode){
            this. _name = name
            this._typeCode = typeCode
        }
        get name(){return this._name }
        get type(){return Employee.legalTypeCode[this._typeCode] }
        static get legalTypeCode(){
            return { 'E': 'Engineer', 'M': 'Manager', 'S': 'Salesman' }
        }
    }
    console.log(new Employee('xy', 'E'))
})();
(() => {
    class Employee{
        constructor(name, typeCode){
            this. _name = name
            this._typeCode = typeCode
        }
        get name(){return this._name }
        get type(){return Employee.legalTypeCode[this._typeCode] }
        static get legalTypeCode(){
            return { 'E': 'Engineer', 'M': 'Manager', 'S': 'Salesman' }
        }
    }
    function createEngineer(name){
        return new Employee(name, 'E')
    }
    console.log(createEngineer('xy'))
})();
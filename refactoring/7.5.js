/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 15:13:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 15:36:18
 * @FilePath: /js-demo/refactoring/7.5.js
 */
(() => {
    class Person {
        constructor(name){
            this._name = name
        }
        get name(){return this._name }
        get telephoneNumber(){return `(${this.officeAreaCode}) ${this.officeNumber}` }
        get officeAreaCode(){return this._officeAreaCode }
        set officeAreaCode(arg){return this._officeAreaCode = arg }
        get officeNumber(){return this._officeNumber }
        set officeNumber(arg){return this._officeNumber = arg }
    }
    let xy = new Person('xy')
    xy.officeNumber = '179175910'
    xy.officeAreaCode = '1299'
    console.log(xy.telephoneNumber)
})();
(() => {
    class Person {
        constructor(name){
            this._name = name
            this._telephoneNumber = new TelephoneNumber()
        }
        get name(){return this._name }
        get telephoneNumber(){return this._telephoneNumber.toString() }
        get officeAreaCode(){return this._telephoneNumber.areaCode }
        set officeAreaCode(arg){return this._telephoneNumber.areaCode = arg }
        get officeNumber(){return this._telephoneNumber.number }
        set officeNumber(arg){return this._telephoneNumber.number = arg }
    }
    class TelephoneNumber{
        get number(){return this._number}
        set number(arg){return this._number = arg}
        get areaCode(){return this._areaCode }
        set areaCode(arg){return this._areaCode = arg}
        toString(){return `(${this._areaCode}) ${this._number}`}
    }
    let xy = new Person('xy')
    xy.officeNumber = '179175910'
    xy.officeAreaCode = '1299'
    console.log(xy.telephoneNumber)
})();
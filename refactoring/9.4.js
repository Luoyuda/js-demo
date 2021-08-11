/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 11:54:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 11:57:24
 * @FilePath: /js-demo/refactoring/9.4.js
 */
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
(() => {
    class Person {
        constructor(name){
            this._name = name
        }
        get name(){return this._name }
        get telephoneNumber(){return this._telephoneNumber.toString() }
        get officeAreaCode(){return this._telephoneNumber.areaCode }
        set officeAreaCode(arg){return this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber) }
        get officeNumber(){return this._telephoneNumber.number }
        set officeNumber(arg){return this._telephoneNumber = new TelephoneNumber(this.areaCode, arg) }
    }
    class TelephoneNumber{
        constructor(areaCode, number){
            this._areaCode = areaCode
            this._number = number
        }
        get number(){return this._number}
        get areaCode(){return this._areaCode }
        toString(){return `(${this._areaCode}) ${this._number}`}
    }
    let xy = new Person('xy')
    xy.officeNumber = '179175910'
    xy.officeAreaCode = '1299'
    console.log(xy.telephoneNumber)
})();
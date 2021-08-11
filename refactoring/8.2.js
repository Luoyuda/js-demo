/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 19:51:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 20:03:44
 * @FilePath: /js-demo/refactoring/8.2.js
 */
(() => {
    class Customer {
        constructor(name, discountRate){
            this._name = name
            this._discountRate = discountRate
            this._contact = new Contact()
        }
        get discountRate(){return this._discountRate}
        becomePreferred(){
            return this._discountRate += 0.03
        }
        applyDiscount(amount){
            return amount - amount * this.discountRate
        }
    }
    class Contact {
        constructor(){
            this._startDate = new Date()
        }
    }
    const xy = new Customer('xy', 0.9)
    console.log(xy)
    console.log(xy.applyDiscount(1000))
    console.log(xy.becomePreferred())
    console.log(xy.applyDiscount(1000))
})();
(() => {
    class Customer {
        constructor(name, discountRate){
            this._name = name
            this._contact = new Contact(discountRate)
        }
        get discountRate(){return this._contact.discountRate}
        _setDiscountRate(aNumber){return this._contact.discountRate = aNumber}
        becomePreferred(){
            return this._setDiscountRate(this._contact.discountRate += 0.03)
        }
        applyDiscount(amount){
            return amount - amount * this.discountRate
        }
    }
    class Contact {
        constructor(discountRate){
            this._startDate = new Date()
            this._discountRate = discountRate
        }
        get discountRate(){return this._discountRate}
        set discountRate(arg){this._discountRate = arg}
    }
    const xy = new Customer('xy', 0.9)
    console.log(xy)
    console.log(xy.applyDiscount(1000))
    console.log(xy.becomePreferred())
    console.log(xy.applyDiscount(1000))
})();
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 14:58:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 15:08:11
 * @FilePath: /js-demo/refactoring/7.4.js
 */
(() => {
    class Order {
        constructor(quantity, item){
            this._quantity = quantity
            this._item = item
        }
        get price() {
            let basePrice = this._quantity * this._item.price
            let discountFactor = 0.98
            if(basePrice > 1000) discountFactor -= 0.03
            return basePrice * discountFactor
        }
    }
    let order = new Order(100, { price: 100 })
    console.log(order.price)
})();
(() => {
    class Order {
        constructor(quantity, item){
            this._quantity = quantity
            this._item = item
        }
        get price() {
            return this.basePrice * this.discountFactor
        }
        get basePrice() { return this._quantity * this._item.price }
        get discountFactor() {
            let discountFactor = 0.98
            if(this.basePrice > 1000) discountFactor -= 0.03
            return discountFactor
        }
    }
    let order = new Order(100, { price: 100 })
    console.log(order.price)
})();
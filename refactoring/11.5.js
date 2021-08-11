/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 21:55:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 22:00:01
 * @FilePath: /js-demo/refactoring/11.5.js
 */
(() => {
    class Order {
        constructor(quantity, price){
            this.quantity = quantity;
            this.price = price;
        }
        get finalPrice(){
            const basePrice = this.price * this.quantity
            let discount 
            if(this.quantity > 100) discount = 2
            else  discount = 1
            return this.discountedPrice(basePrice, discount)
        }
        discountedPrice(price, discount){
            switch(discount){
                case 1: return price * 0.9
                case 2: return price * 0.8
            }
        }
    }
    const order = new Order(1000, 299);
    console.log(order.finalPrice);
})();
(() => {
    class Order {
        constructor(quantity, price){
            this.quantity = quantity;
            this.price = price;
        }
        get finalPrice(){
            return this.discountedPrice()
        }
        get basePrice() { return this.price * this.quantity }
        get discount() { return this.quantity > 100 ? 2 : 1 }
        discountedPrice(){
            switch(this.discount){
                case 1: return this.basePrice * 0.9
                case 2: return this.basePrice * 0.8
            }
        }
    }
    const order = new Order(1000, 299);
    console.log(order.finalPrice);
})();
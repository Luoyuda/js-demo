/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 15:08:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 15:19:30
 * @FilePath: /js-demo/refactoring/6.3.js
 */
function price(order){
    // price is base price - quantity discount + shipping
    return order.quantity * order.itemPrice - 
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
}
function price(order){
    // price is base price - quantity discount + shipping
    let basePrice = order.quantity * order.itemPrice
    let quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
    let shipping = Math.min(basePrice * 0.1, 100)
    return basePrice - quantityDiscount + shipping
}
console.log(price({
    quantity: 550,
    itemPrice: 100,
}))

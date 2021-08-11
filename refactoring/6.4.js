/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 15:29:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 15:40:30
 * @FilePath: /js-demo/refactoring/6.4.js
 */
function price(order){
    let basePrice = order.basePrice;
    return (basePrice > 1000)
}
function price(order){
    return order.basePrice > 1000
}
console.log(price({
    basePrice: 1002
}))
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 10:21:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 10:42:22
 * @FilePath: /js-demo/refactoring/6.11.js
 */
/**
 * 
 * @param {{ basePrice: number, discountThreshold: number }} product 
 * @param {number} quantity 
 * @param {{discountThreshold: number, discountedFee: number, feePerCase: number}} shippingMethod 
 */
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase
    const shippingCost = quantity * shippingPerCase
    const price = basePrice - discount + shippingCost
    return price
}
/**
 * 
 * @param {{ basePrice: number, discountThreshold: number }} product 
 * @param {number} quantity 
 * @param {{discountThreshold: number, discountedFee: number, feePerCase: number}} shippingMethod 
 */
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity)
    return applyShipping(priceData, shippingMethod)
    function calculatePricingData(product, quantity){
        const basePrice = product.basePrice * quantity
        const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice
        return { basePrice, quantity, discount }
    }
    function applyShipping(priceData, shippingMethod){
        const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase
        const shippingCost = priceData.quantity * shippingPerCase
        return priceData.basePrice - priceData.discount + shippingCost
    }
}

console.log(priceOrder({ basePrice: 1000, discountThreshold: 50 }, 10, {discountThreshold: 10, discountedFee: 15, feePerCase: 20}))

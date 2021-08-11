/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 22:49:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 22:52:31
 * @FilePath: /js-demo/refactoring/6.10.js
 */
const reading = {
    customer: 'xy',
    quantity: 10,
    month: 5,
    year: 2017
}
function baseRate(month, year) {
    return month * 0.1 + year * 0.15
}
function taxThreshold(year) {
    return year * 10
}
// before
// 1
const baseCharge = baseRate(reading.month, reading.year) * reading.quantity
// 2
const base = baseRate(reading.month, reading.year) * reading.quantity
const taxableCharge = Math.max(0, base - taxThreshold(reading.year))
// 3
const amount = calculateBaseCharge(reading)
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity
}
// after
function clone(obj){
    return JSON.parse(JSON.stringify(obj))
}
function enrichReading(aReading){
    let result = clone(aReading)
    result.baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(aReading.year))
    return result
}
const aReading = enrichReading(reading)
// 1
const baseCharge = aReading.baseCharge
// 2
const base = aReading.baseCharge
const taxableCharge = aReading.taxableCharge
// 3
const amount = aReading.baseCharge
console.log(baseCharge, base, taxableCharge)
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 22:25:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 22:42:32
 * @FilePath: /js-demo/refactoring/6.9.js
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
class Reading {
    constructor(data) {
        this._customer = data.customer
        this._quantity = data.quantity
        this._month = data.month
        this._year = data.year
    }
    get customer() { return this._customer }
    get quantity() { return this._quantity }
    get month() { return this._month }
    get year() { return this._year }
    get baseCharge(){ 
        return baseRate(this.month, this.year) * this.quantity
    }
    get taxableCharge(){
        return Math.max(0, this.baseCharge - taxThreshold(this.year))
    }
}
const aReading = new Reading(reading)
// 1
const baseCharge = aReading.baseCharge
// 2
const base = aReading.baseCharge
const taxableCharge = aReading.taxableCharge
// 3
const amount = aReading.baseCharge
console.log(baseCharge, base, taxableCharge)
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 18:00:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 18:10:00
 * @FilePath: /js-demo/refactoring/6.8.js
 */
let station = {
    name: 'ZB1',
    readings: [
        { temp: 47 },
        { temp: 53 },
        { temp: 28 },
        { temp: 53 },
        { temp: 61 },
    ],
}
const min = 30
const max = 60
function readingsOutsideRange(station, min, max){
    return station.readings.filter((r) => r.temp < min || r.temp > max)
}
let list = readingsOutsideRange(station, min, max)

class Range {
    constructor(min, max) {
        this.min = min
        this.max = max
    }
    contains(arg){
        return arg >= this.min && arg <= this.max
    }
}
function readingsOutsideRange(station, range){
    return station.readings.filter(r => !range.contains(r.temp))
}
let range = new Range(min, max)
let list = readingsOutsideRange(station, range)
console.log(list, range)

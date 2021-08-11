/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 20:13:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 21:00:59
 * @FilePath: /js-demo/refactoring/11.2.js
 */
function tenPercentRaise(salary){
    return salary * 1.1
}
function fivePercentRaise(salary){
    return salary * 1.05
}
function raise(salary, factor=0){
    return salary * (factor + 1)
}
function tenPercentRaise(salary){
    return raise(salary, 0.1)
}
function fivePercentRaise(salary){
    return raise(salary, 0.05)
}
console.log(tenPercentRaise(10))
console.log(fivePercentRaise(10))

function baseCharge(usage){
    if(usage < 0) return 0
    return topBand(usage) * 0.07 + bottomBand(usage) * 0.03 + middleBand(usage) * 0.05
}
function bottomBand(usage){
    return Math.min(usage, 100)
}
function topBand(usage){
    return usage > 200 ? usage - 200 : 0
}
function middleBand(usage){
    return usage > 100 ? Math.min(usage, 200) - 100 : 0
}

function baseCharge(usage){
    if(usage < 0) return 0
    return withinBand(usage, 0, 100) * 0.03 
    + withinBand(usage, 100, 200) * 0.05
    + withinBand(usage, 200, Infinity) * 0.07 
}
function withinBand(usage, bottom, top){
    return usage > bottom ? Math.min(usage, top) - bottom : 0
}

console.log(baseCharge(500))
/*
 * @Author: xiaohuolong
 * @Date: 2021-06-04 15:59:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-04 18:15:09
 * @FilePath: /js-demo/js/instance.js
 */
function instanceOf(l, r){
    while(true){
        if(l === null) return false
        if(l.__proto__ === r.prototype) return true
        l = l.__proto__
    }
}

let test = [
    [[], Array],
    [{}, Array],
    [[], Object],
    [{}, Object],
    [() => {}, Object],
]
test.forEach(item => {
    if(instanceOf(...item) !== item[0] instanceof item[1]){
        console.log(item, instanceOf(...item), item[0] instanceof item[1])
    }
})
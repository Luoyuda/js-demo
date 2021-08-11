/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 16:35:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 16:43:06
 * @FilePath: /js-demo/refactoring/6.6.js
 */
let defaultOwnerData = {
    firstName: 'Mt',
    lastName: 'Fl'
}
function defaultOwner(){
    return Object.assign({}, defaultOwnerData)
}
function setDefaultOwner(newOwner){
    return defaultOwnerData = newOwner
}
let a = defaultOwner()
a.firstName = 'a'
setDefaultOwner({
    firstName: 'Mt2',
    lastName: 'Fl2'
})
let b = defaultOwner()
console.log(a, b)
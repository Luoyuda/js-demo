/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 16:11:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 16:35:29
 * @FilePath: /js-demo/refactoring/6.5.js
 */
// before
function circum (radius){
    return 2 * Math.PI * radius
}
// after
// 简单做法
function circumference (radius){
    return 2 * Math.PI * radius
}
// 复杂做法
function circum (radius){
    return circumference(radius)
    function circumference (radius){
        return 2 * Math.PI * radius
    }
}

// before
function isNewEndLand(aCustomer){
    return ['MA', 'CT', 'ME', 'VT', 'NH', 'NH', 'RI'].includes(aCustomer.address.state)
}
// after
function isNewEndLand(aCustomer){
    return checkState(aCustomer.address.state)
    function checkState(state){
        return ['MA', 'CT', 'ME', 'VT', 'NH', 'NH', 'RI'].includes(state)
    }
}
console.log(isNewEndLand({
    address: {
        state: 'MA'
    }
}))
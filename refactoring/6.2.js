/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 14:39:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 14:46:56
 * @FilePath: /js-demo/refactoring/6.2.js
 */
const customer = {
    name: 'BigCo',
    location: 'sz'
}
// before
function reportLines(aCustomer){
    const lines = []
    gatherCustomerData(lines, aCustomer)
    return lines
    function gatherCustomerData(out, aCustomer){
        out.push(['name', aCustomer.name])
        out.push(['location', aCustomer.location])
    }
}
// after
function reportLines(aCustomer){
    const lines = []
    lines.push(['name', aCustomer.name])
    lines.push(['location', aCustomer.location])
    return lines
}
console.log(reportLines(customer))
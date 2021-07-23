/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 19:50:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 19:56:44
 * @FilePath: /js-demo/codewar/expandedForm.js
 */
function expandedForm(num) {
    // Your code here
    let res = []
    while(num){
        res.push(num % 10)
        num = Math.floor(num / 10)
    }
    let base = 1
    let str = res.reduce((prev, item) => {
        let count = item * base
        base *= 10
        return (!count ? '' : count + ' + ') + prev
    }, '')
    return str.slice(0, str.length - 3)
}

console.log(expandedForm(12)); // Should return '10 + 2'
console.log(expandedForm(42)); // Should return '40 + 2'
console.log(expandedForm(70304)); // Should return '70000 + 300 + 4'
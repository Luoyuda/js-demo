/*
 * @Author: xiaohuolong
 * @Date: 2020-06-30 20:48:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 17:46:58
 * @FilePath: /js-demo/leetcode/7.js
 */ 
var reverse = function(num) {
    if(typeof num !== 'number') return
    let x = num > 0 ? String(num).split('').reverse().join('') : String(num).slice(1).split('').reverse().join('')
    let res = num > 0 ? parseInt(x, 10) : 0 - parseInt(x, 10)
    const large = Math.pow(2,31)
    if(res >= -large && res <= large) return res
    return 0
}
var reverse = function(num) {
    let x = Math.abs(num)
    let i = 0
    const large = Math.pow(2,31)
    while (x > 0){
        let j = x % 10
        x = Math.floor(x / 10)
        i = i * 10 + j
    }
    if(i > large-1 || i < -large) return 0
    if(num < 0) i = -i
    return i
};

console.log(reverse(Math.pow(2,31)))
console.log(reverse(120))
console.log(reverse(-120))
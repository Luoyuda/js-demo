/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 19:15:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 19:19:32
 * @FilePath: /js-demo/codewar/DigitalRoot.js
 */
/*
Digital root is the recursive sum of all the digits in a number.
Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
Examples
    16  -->  1 + 6 = 7
   942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2
*/
function digital_root(n) {
    // ...
    while(n >= 10){
        let x = 0
        while(n){
            x += n % 10
            n = Math.floor(n / 10)
        }
        n = x
    }
    return n
}

console.log(digital_root(16))
console.log(digital_root(942))
console.log(digital_root(132189))
console.log(digital_root(493193))
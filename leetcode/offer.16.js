/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 15:29:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-25 15:59:14
 * @FilePath: /js-demo/leetcode/offer.16.js
 */
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(x == 0) return 0
    let res = 1
    if(n < 0){
        x = 1 / x;
        n = -n;
    }
    // console.log(x, n)
    while(n > 0){
        // 如果奇数
        if(n & 1) res *= x;
        x *= x;
        n = Math.abs(n >> 1)
        // n = Math.floor(n / 2);
        console.log(n)
    }
    return res
};

// console.log(myPow(2, 2))
console.log(myPow(2.00000, -2147483648))
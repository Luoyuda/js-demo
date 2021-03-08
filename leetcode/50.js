/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 08:56:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 08:56:49
 * @FilePath: /js-demo/leetcode/50.js
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
        // 2147483648 >> 1 变成 负数
        n = Math.abs(n >> 1)
        // n = Math.floor(n / 2);
        // console.log(n)
    }
    return res
};
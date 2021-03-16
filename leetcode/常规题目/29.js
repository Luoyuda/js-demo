/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 15:11:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 15:39:13
 * @FilePath: /js-demo/leetcode/29.js
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
    29. 两数相除
        给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
        返回被除数 dividend 除以除数 divisor 得到的商。
        整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
    示例 1:
        输入: dividend = 10, divisor = 3
        输出: 3
        解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
    示例 2:
        输入: dividend = 7, divisor = -3
        输出: -2
        解释: 7/-3 = truncate(-2.33333..) = -2
    提示：
        被除数和除数均为 32 位有符号整数。
        除数不为 0。
        假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
 */
var divide = function(dividend, divisor) {
    const MIN_VALUE = -2147483648
    const MAX_VALUE = 2147483647
    const positive =(dividend ^ divisor) >= 0
    let d = Math.abs(dividend);
    const b = Math.abs(divisor);
    let res =0;
    while(d >= b){
        let tmp = b;
        let p = 1;
        // 寻找有多少个 b
        while(d >= tmp <<1&& tmp <1073741823){// 1073741823 考虑溢出的情况19      
            // console.log(tmp, p)
            tmp <<=1;
            p <<=1;
        }
        // console.log('d, res, p')
        // console.log(d, res, p)
        d -= tmp;
        res += p;
    }
    if(positive){
        return res >MAX_VALUE?MAX_VALUE: res;
    }
    return res <MIN_VALUE?MIN_VALUE:-res;
};

console.log(divide(100, 4))
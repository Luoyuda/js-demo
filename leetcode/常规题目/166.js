/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 15:40:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 16:21:08
 * @FilePath: /js-demo/leetcode/166.js
 */
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
    166. 分数到小数
        给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。
        如果小数部分为循环小数，则将循环的部分括在括号内。
        如果存在多个答案，只需返回 任意一个 。
        对于所有给定的输入，保证 答案字符串的长度小于 104 。
    示例 1：
        输入：numerator = 1, denominator = 2
        输出："0.5"
    示例 2：
        输入：numerator = 2, denominator = 1
        输出："2"
    示例 3：
        输入：numerator = 2, denominator = 3
        输出："0.(6)"
    示例 4：
        输入：numerator = 4, denominator = 333
        输出："0.(012)"
    示例 5：
        输入：numerator = 1, denominator = 5
        输出："0.2"
    提示：
        -231 <= numerator, denominator <= 231 - 1
        denominator != 0
 */
var fractionToDecimal = function(numerator, denominator) {
    if(denominator == 0) return ''
    if(numerator == 0) return '0'
    let result = ''
    if((numerator < 0) ^ (denominator < 0)){
        result += '-'
        numerator = Math.abs(numerator)
        denominator = Math.abs(denominator)
    }
    const integer = Math.floor(numerator / denominator)
    result += integer
    let remainder = numerator % denominator
    // console.log(remainder)
    if(!remainder) return result
    result += '.'
    // 小数部分
    let decimal =''
    let index = 0
    const remainders = {}
    while(remainder){
        const target = remainders[remainder]
        if(!isNaN(target)){
            decimal = `${decimal.substring(0, target)}(${decimal.substring(target)})`
            break
        }
        remainders[remainder] = index++
        remainder *= 10
        const num = Math.floor(remainder / denominator)
        decimal = `${decimal}${num}`
        remainder = remainder % denominator
    }
    result += decimal
    return result
};

console.log(fractionToDecimal(4, 333))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 09:07:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 09:12:07
 * @FilePath: /js-demo/leetcode/面试金典/05.02.js
 */
/**
面试题 05.02. 二进制数转字符串
    二进制数转字符串。给定一个介于0和1之间的实数（如0.72），
    类型为double，打印它的二进制表达式。如果该数字无法精确地用32位以内的二进制表示，则打印“ERROR”。
示例1:
    输入：0.625
    输出："0.101"
示例2:
    输入：0.1
    输出："ERROR"
    提示：0.1无法被二进制准确表示
提示：
    32位包括输出中的"0."这两位。
 * @param {number} num
 * @return {string}
 */
var printBin = function(num){
    if(num >= 1 || num <= 0) return 'ERROR'
    let i = 0
    let res = []
    while(i < 32){
        num = num * 2
        let b = parseInt(num)
        num -= b
        res.push(b)
        i = res.length
        if(num == 0){
            return '0.'+res.join('')
        }
    }
    return 'ERROR'
}

console.log(printBin('0.1'))
console.log(printBin('0.625'))
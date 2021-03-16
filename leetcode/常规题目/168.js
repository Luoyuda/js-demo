/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 20:29:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 20:51:41
 * @FilePath: /js-demo/leetcode/168.js
 */
/**
 * @param {number} n
 * @return {string}
    168. Excel表列名称
        给定一个正整数，返回它在 Excel 表中相对应的列名称。
    例如，
        1 -> A
        2 -> B
        3 -> C
        ...
        26 -> Z
        27 -> AA
        28 -> AB 
        ...
    示例 1:
        输入: 1
        输出: "A"
    示例 2:
        输入: 28
        输出: "AB"
    示例 3:
        输入: 701
        输出: "ZY"
 */
const map = ['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z']
var convertToTitle = function(n) {
    let str = ''
    while(n > 0){
        n -= 1
        let rem = n % 26
        // console.log(rem)
        str = map[rem] + str
        n = Math.floor(n / 26)
    }
    return str
};

console.log(convertToTitle(28))
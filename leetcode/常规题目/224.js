/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 08:12:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 08:40:29
 * @FilePath: /js-demo/leetcode/224.js
 */
/**
 * @param {string} s
 * @return {number}
    224. 基本计算器
        实现一个基本的计算器来计算一个简单的字符串表达式 s 的值。
    示例 1：
        输入：s = "1 + 1"
        输出：2
    示例 2：
        输入：s = " 2-1 + 2 "
        输出：3
    示例 3：
        输入：s = "(1+(4+5+2)-3)+(6+8)"
        输出：23
    提示：
        1 <= s.length <= 3 * 105
        s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
        s 表示一个有效的表达式
 */
var calculate = function(s) {
    let ops = [1]
    let sign = 1
    let n = s.length
    let i = 0
    let res = 0
    while(i < n){
        const ch = s[i];
        if(ch == ' '){
            i++
        }else if(ch == '+'){
            sign = ops[ops.length - 1]
            i++
        }else if(ch == '-'){
            sign = -ops[ops.length - 1]
            i++
        }else if(ch == '('){
            ops.push(sign)
            i++
        }else if(ch == ')'){
            ops.pop()
            i++
        }else{
            let num = 0
            while(i < n && !(isNaN(Number(s[i]))) && s[i] != ' '){
                num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt()
                i++
            }
            // console.log(res, num, sign)
            res += sign * num
        }
    }
    return res
};

console.log(calculate('1 + 1'))
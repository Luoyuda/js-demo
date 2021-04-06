/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 17:07:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 17:16:20
 * @FilePath: /js-demo/leetcode/常规题目/1678.js
 */
/**
 * @param {string} command
 * @return {string}
1678. 设计 Goal 解析器
    请你设计一个可以解释字符串 command 的 Goal 解析器 。
    command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成。
    Goal 解析器会将 
    "G" 解释为字符串 "G"
    "()" 解释为字符串 "o" 
    "(al)" 解释为字符串 "al" 。
    然后，按原顺序将经解释得到的字符串连接成一个字符串。
    给你字符串 command ，返回 Goal 解析器 对 command 的解释结果。
示例 1：
    输入：command = "G()(al)"
    输出："Goal"
    解释：Goal 解析器解释命令的步骤如下所示：
    G -> G
    () -> o
    (al) -> al
    最后连接得到的结果是 "Goal"
示例 2：
    输入：command = "G()()()()(al)"
    输出："Gooooal"
示例 3：
    输入：command = "(al)G(al)()()G"
    输出："alGalooG"
提示：
    1 <= command.length <= 100
    command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成
 */
var interpret = function(command) {
    let i = -1
    let j = 0
    let str = ''
    while (j < command.length) {
        if(command[j] == '('){
            i = j
        }else if(command[j] == ')'){
            // console.log(command.substring(i, j + 1))
            let s = command.substring(i, j + 1) == '()' ? 'o' : 'al'
            str += s
            i = -1
        }else{
            if(i == -1){
                str += command[j]
            }
        }
        j++
    }
    return str
};
var command = "G()(al)"
// var command = "G()()()()(al)"
// var command = "(al)G(al)()()G"
console.log(interpret(command))
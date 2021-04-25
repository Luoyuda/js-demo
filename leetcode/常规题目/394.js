/*
 * @Author: xiaohuolong
 * @Date: 2021-03-27 09:47:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 22:25:46
 * @FilePath: /js-demo/leetcode/常规题目/394.js
 */
/**
 * @param {string} s
 * @return {string}
394. 字符串解码
    给定一个经过编码的字符串，返回它解码后的字符串。
    编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
    你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
    此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
示例 1：
    输入：s = "3[a]2[bc]"
    输出："aaabcbc"
示例 2：
    输入：s = "3[a2[c]]"
    输出："accaccacc"
示例 3：
    输入：s = "2[abc]3[cd]ef"
    输出："abcabccdcdcdef"
示例 4：
    输入：s = "abc3[cd]xyz"
    输出："abccdcdcdxyz"
 */
var decodeString = function(s) {
    let Str = ''
    let stack = []
    let add = 0
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if(ch == '['){
            stack.push(ch)
            add = 0
        }else if(ch == ']'){
            let str = ''
            let temp = ''
            // console.log(stack)
            while(stack[stack.length - 1] != '['){
                temp += stack.pop()
            }
            stack.pop()
            let count = stack.pop()
            // console.log(str, count)
            if(!isNaN(Number(count))){
                for (let i = 0; i < count; i++) {
                    str += temp
                }
                // console.log(str, count)
            }else{
                str = count + str
            }
            // console.log(stack, str)
            while(stack.length > 0 && stack[stack.length - 1] != '['){
                str = stack.pop() + str
            }
            // console.log(stack, str)
            stack.push(str)
            add = 1
        }else if(isNaN(Number(ch))){
            stack.push(add == 1 ? stack.pop() + ch : '' + ch)
            add = 1
        }else{
            stack.push(add == 2 ? stack.pop() + ch : '' + ch)
            add = 2
        }
    }
    return stack.reduce((prev, item) => prev + item,'')
};

var decodeString = function(s) {
    let res = ''
    for (let i = 0; i < s.length;) {
        if(isNaN(Number(s[i]))) res += s[i++]
        else{
            let k = 0
            while (!isNaN(Number(s[i]))) k = k * 10 + (s[i++] - 0)
            let j = i + 1
            let sum = 1
            while (sum > 0){
                if(s[j] == '[') sum++
                if(s[j] == ']') sum--
                j++
            }
            let r = decodeString(s.substr(i + 1, j - i - 2))
            while (k--) res += r
            i = j
        }
    }
    return res
}

console.log(decodeString('3[a2[c]]') == 'accaccacc')
console.log(decodeString('abc3[cd]xyz') == 'abccdcdcdxyz')
console.log(decodeString('2[abc]3[cd]ef') == 'abcabccdcdcdef')
console.log(decodeString('3[a]2[bc]') == 'aaabcbc')
console.log(decodeString("sd2[f2[e]g]i"))

console.log(decodeString("sd2[f2[e]g]i") == "sdfeegfeegi")



/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 17:11:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 17:32:27
 * @FilePath: /js-demo/leetcode/面试金典/01.03.js
 */
/**
 * @param {string} S
 * @param {number} length
 * @return {string}
面试题 01.03. URL化
    URL化。编写一种方法，将字符串中的空格全部替换为%20。
    假定该字符串尾部有足够的空间存放新增字符，并且知道字符串的“真实”长度。
    （注：用Java实现的话，请使用字符数组实现，以便直接在数组上操作。）
示例 1：
    输入："Mr John Smith    ", 13
    输出："Mr%20John%20Smith"
示例 2：
    输入："               ", 5
    输出："%20%20%20%20%20"
提示：
字符串长度在 [0, 500000] 范围内。
 */
var replaceSpaces = function(S, length) {
    let i = length - 1
    let j = S.length - 1
    let str = S.split('')
    while (i >= 0){
        if(str[i] == ' '){
            str[j--] = '0'
            str[j--] = '2'
            str[j--] = '%'
        }else{
            str[j] = str[i]
            j--
        }
        i--
    }
    // console.log(str, i, j)
    return str.slice(j+1).join('')
};

var replaceSpaces = function(S, length) {
    let i = length - 1
    let j = S.length - 1
    let str = ''
    while (i >= 0){
        if(S[i] == ' '){
            str = '%20' + str
            j-=3
        }else{
            str = S[i] + str
            j--
        }
        i--
    }
    return str
};

console.log(replaceSpaces('Mr John Smith    ', 13))
console.log(replaceSpaces('               ', 5))
console.log(replaceSpaces('ds sdfs afs sdfa dfssf asdf             ', 27))
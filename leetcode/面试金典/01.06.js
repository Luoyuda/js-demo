/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 18:16:28
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 18:20:23
 * @FilePath: /js-demo/leetcode/面试金典/01.06.js
 */
/**
 * @param {string} S
 * @return {string}
面试题 01.06. 字符串压缩
    字符串压缩。利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能。
    比如，字符串aabcccccaaa会变为a2b1c5a3。若“压缩”后的字符串没有变短，
    则返回原先的字符串。你可以假设字符串中只包含大小写英文字母（a至z）。
示例1:
    输入："aabcccccaaa"
    输出："a2b1c5a3"
示例2:
    输入："abbccd"
    输出："abbccd"
    解释："abbccd"压缩后为"a1b2c2d1"，比原字符串长度更长。
提示：
    字符串长度在[0, 50000]范围内。
 */
var compressString = function(S) {
    if(!S.length) return ''
    let prev = S[0]
    let str = ''
    let count = 1
    for (let i = 1; i < S.length; i++) {
        const ch = S[i];
        if(ch != prev) {
            str += `${prev}${count}`
            count = 1
        }else{
            count += 1
        }
        prev = ch
    }
    str += `${prev}${count}`
    return str.length < S.length ? str : S
};

console.log(compressString('aabcccccaaa'))
console.log(compressString('abbccd'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 00:05:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-27 09:26:16
 * @FilePath: /js-demo/leetcode/345.js
 */
/**
 * @param {string} s
 * @return {string}
    345. 反转字符串中的元音字母
        编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
    示例 1：
        输入："hello"
        输出："holle"
    示例 2：
        输入："leetcode"
        输出："leotcede"
    提示：
        元音字母不包含字母 "y" 。
 */
var reverseVowels = function(s) {
    const map = {
        "a": true,
        "e": true,
        "i": true,
        "o": true,
        "u": true,
        "A": true,
        "E": true,
        "I": true,
        "O": true,
        "U": true,
    }
    let left = 0
    let right = s.length - 1
    s = s.split('')
    while(left <= right){
        while(left <= right){
            if(map[s[left]]){
                break
            }else{
                left++
            }
        }
        while(left <= right){
            if(map[s[right]]){
                break
            }else{
                right--
            }
        }
        if(left >= right) break
        let temp = s[left]
        s[left] = s[right]
        s[right] = temp
        left++
        right--
    }
    return s.join('')
};

console.log(reverseVowels('hello'))
console.log(reverseVowels('leetcode'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 17:50:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 17:59:37
 * @FilePath: /js-demo/leetcode/242.js
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
    242. 有效的字母异位词
        给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
    示例 1:
        输入: s = "anagram", t = "nagaram"
        输出: true
    示例 2:
        输入: s = "rat", t = "car"
        输出: false
    说明:
        你可以假设字符串只包含小写字母。
    进阶:
        如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 */
var isAnagram = function(s, t) {
    const sArr = s.split('')
    const tArr = t.split('')
    sArr.sort()
    tArr.sort()
    return sArr.join('') == tArr.join('')
};
var isAnagram = function(s, t) {
    if(s.length != t.length) return false
    let map = {}
    for (let i = 0; i < s.length; i++) {
        const el = s[i];
        if(map[el]){
            map[el] += 1
        }else{
            map[el] = 1
        }
    }
    for (let i = 0; i < t.length; i++) {
        const el = t[i];
        if(!map[el]) return false
        map[el] -= 1
    }
    return true
}

console.log(isAnagram('anagram', 'nagaram'))
console.log(isAnagram('rat', 'car'))
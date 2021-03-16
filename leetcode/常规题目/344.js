/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 11:42:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 11:47:14
 * @FilePath: /js-demo/leetcode/344.js
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
    344. 反转字符串
        编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
        不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
        你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
    示例 1：
        输入：["h","e","l","l","o"]
        输出：["o","l","l","e","h"]
    示例 2：
        输入：["H","a","n","n","a","h"]
        输出：["h","a","n","n","a","H"]
 */
var reverseString = function(s) {
    let len = s.length - 1
    let mid = Math.floor(len / 2)
    for (let i = 0; i <= mid; i++) {
        let temp = s[i]
        s[i] = s[len - i]
        s[len - i] = temp
    }
    return s
};
var reverseString = function(s) {
    let right = s.length - 1
    let left = 0
    while(left < right){
        let temp = s[right]
        s[right] = s[left]
        s[left] = temp
        left++
        right--
    }
    return s
};

console.log(reverseString(["h","e","l","l","o"]))
console.log(reverseString(["H","a","n","n","a","h"]))
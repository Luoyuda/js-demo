/*
 * @Author: xiaohuolong
 * @Date: 2021-08-20 07:56:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-20 07:57:18
 * @FilePath: \js-demo\leetcode\常规题目\541.js
 */
/*
541. 反转字符串 II
    给定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。
    如果剩余字符少于 k 个，则将剩余字符全部反转。
    如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
示例 1：
    输入：s = "abcdefg", k = 2
    输出："bacdfeg"
示例 2：
    输入：s = "abcd", k = 2
    输出："bacd"
提示：
    1 <= s.length <= 104
    s 仅由小写英文组成
    1 <= k <= 104
*/
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    s = s.split('')
    for(let i = 0; i < s.length; i += 2 * k){
        reverse(s, i, i + k - 1)
    }
    return s.join('')
};
var reverse = function(arr, l, r){
    while(l < r){
        let temp = arr[l]
        arr[l++] = arr[r]
        arr[r--] = temp
    }
}
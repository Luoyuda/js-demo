/*
 * @Author: xiaohuolong
 * @Date: 2021-04-21 00:07:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-21 00:20:27
 * @FilePath: /js-demo/leetcode/常规题目/91.js
 */
/* 
91. 解码方法
    一条包含字母 A-Z 的消息通过以下映射进行了 编码 ：
        'A' -> 1
        'B' -> 2
        ...
        'Z' -> 26
    要 解码 已编码的消息，所有数字必须基于上述映射的方法，
    反向映射回字母（可能有多种方法）。例如，"11106" 可以映射为：
    "AAJF" ，将消息分组为 (1 1 10 6)
    "KJF" ，将消息分组为 (11 10 6)
    注意，消息不能分组为  (1 11 06) ，因为 "06" 不能映射为 "F" ，这是由于 "6" 和 "06" 在映射中并不等价。
    给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。
示例 1：
    输入：s = "12"
    输出：2
    解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
示例 2：
    输入：s = "226"
    输出：3
    解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
示例 3：
    输入：s = "0"
    输出：0
    解释：没有字符映射到以 0 开头的数字。
    含有 0 的有效映射是 'J' -> "10" 和 'T'-> "20" 。
    由于没有字符，因此没有有效的方法对此进行解码，因为所有数字都需要映射。
示例 4：
    输入：s = "06"
    输出：0
    解释："06" 不能映射到 "F" ，因为字符串含有前导 0（"6" 和 "06" 在映射中并不等价）。
提示：
    1 <= s.length <= 100
    s 只包含数字，并且可能包含前导零。
*/
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let n = s.length
    let dp = new Array(n + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= n; i++) {
        let s1 = s[i - 1]
        let s2 = s[i - 2]
        if(s1 != '0'){
            dp[i] += dp[i - 1]
        }
        if(s2 && s2 != '0' && ((s2 - 0) * 10 + (s1 - 0)) <= 26){
            dp[i] += dp[i - 2]
        }
    }
    return dp[n]
};
var numDecodings = function(s) {
    let n = s.length
    let a = 0
    let b = 1
    let c = 0
    for (let i = 1; i <= n; i++) {
        c = 0
        let s1 = s[i - 1]
        let s2 = s[i - 2]
        if(s1 != '0'){
            c += b
        }
        if(s2 && s2 != '0' && ((s2 - 0) * 10 + (s1 - 0)) <= 26){
            c += a
        }
        a = b
        b = c
    }
    return c
};

console.log(numDecodings('12'))
console.log(numDecodings('226'))
console.log(numDecodings('0'))
console.log(numDecodings('06'))
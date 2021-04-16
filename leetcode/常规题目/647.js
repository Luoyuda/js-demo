/*
 * @Author: xiaohuolong
 * @Date: 2021-04-14 08:05:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-14 08:53:02
 * @FilePath: /js-demo/leetcode/常规题目/647.js
 */
/**
 * @param {string} s
 * @return {number}
647. 回文子串
    给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
    具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
示例 1：
    输入："abc"
    输出：3
    解释：三个回文子串: "a", "b", "c"
示例 2：
    输入："aaa"
    输出：6
    解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
提示：
    输入的字符串长度不会超过 1000 。
 */
var countSubstrings = function(s) {
    let len = s.length
    let dp = []
    for (let i = 0; i < len; i++) {
        dp.push(new Array().fill(false))
    }
    let ans = 0
    for (let j = 0; j < len; j++) {
        for (let i = 0; i <= j; i++) {
            if(s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1])){
                dp[i][j] = true
                ans++
            }
        }
    }
    return ans
};
var countSubstrings = function(s){
    let ans = 0
    let n = s.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= 1; j++) {
            let l = i
            let r = i + j
            while (l >= 0 && r < n && s[l--] == s[r++])ans++
        }
    }
    return ans
}
// class Solution {
//     public:
//         int countSubstrings(string s) {
//             int num = 0;
//             int n = s.size(); 
//             for(int i=0;i<n;i++)//遍历回文中心点
//             {
//                 for(int j=0;j<=1;j++)//j=0,中心是一个点，j=1,中心是两个点
//                 {
//                     int l = i;
//                     int r = i+j;
//                     while(l>=0 && r<n && s[l--]==s[r++])num++;
//                 }
//             }
//             return num;
//         }
//     };
// var a = 'abc'
var a = "fdsklf"
console.log(countSubstrings(a))
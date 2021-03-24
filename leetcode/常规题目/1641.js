/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 20:57:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-24 20:41:53
 * @FilePath: /js-demo/leetcode/常规题目/1641.js
 */
/**
 * @param {number} n
 * @return {number}
1641. 统计字典序元音字符串的数目
    给你一个整数 n，请返回长度为 n 、仅由元音 (a, e, i, o, u) 组成且按 字典序排列 的字符串数量。
    字符串 s 按 字典序排列 需要满足：对于所有有效的 i，s[i] 在字母表中的位置总是与 s[i+1] 相同或在 s[i+1] 之前。
示例 1：
    输入：n = 1
    输出：5
    解释：仅由元音组成的 5 个字典序字符串为 ["a","e","i","o","u"]
示例 2：
    输入：n = 2
    输出：15
    解释：仅由元音组成的 15 个字典序字符串为
    ["aa","ae","ai","ao","au","ee","ei","eo","eu","ii","io","iu","oo","ou","uu"]
    注意，"ea" 不是符合题意的字符串，因为 'e' 在字母表中的位置比 'a' 靠后
示例 3：
    输入：n = 33
    输出：66045
提示：
    1 <= n <= 50 
 */
var countVowelStrings = function(n) {
    return (n+4)*(n+3)*(n+2)*(n+1)/24;
};
var countVowelStrings = function(n) {
    /**
     * i:长度
     * j:字母区间
     * dp[i][j] = dp[i - 1][j] + dp[i][j-1]
     * 长度为i j结尾的个数
     */
    if(n == 0) return 0
    if(n == 1) return 5
    let dp = []
    for (let i = 0; i <= n; i++){
        dp.push(new Array(5))
    }
    dp[1][0] = 1
    dp[1][1] = 2
    dp[1][2] = 3
    dp[1][3] = 4
    dp[1][4] = 5
    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < 5; j++) {
            if(j == 0) dp[i][j] = dp[i-1][j]
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    // console.log(dp)
    return dp[n][4]
};

console.log(countVowelStrings(33))

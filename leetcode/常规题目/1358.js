/*
 * @Author: xiaohuolong
 * @Date: 2021-07-27 22:37:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-27 22:38:22
 * @FilePath: /js-demo/leetcode/常规题目/1358.js
 */
/*
1358. 包含所有三种字符的子字符串数目
    给你一个字符串 s ，它只包含三种字符 a, b 和 c 。
    请你返回 a，b 和 c 都 至少 出现过一次的子字符串数目。
示例 1：
    输入：s = "abcabc"
    输出：10
    解释：包含 a，b 和 c 各至少一次的子字符串为 "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" 和 "abc" (相同字符串算多次)。
示例 2：
    输入：s = "aaacb"
    输出：3
    解释：包含 a，b 和 c 各至少一次的子字符串为 "aaacb", "aacb" 和 "acb" 。
示例 3：
    输入：s = "abc"
    输出：1
提示：
    3 <= s.length <= 5 x 10^4
    s 只包含字符 a，b 和 c 。
*/
/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    let cnt = new Array(3).fill(0)
    let code = x => x.charCodeAt() - 'a'.charCodeAt()
    let l = r = ans = 0
    let n = s.length
    while(r < n){
        cnt[code(s[r])]++
        while(cnt[0] && cnt[1] && cnt[2]){
            ans += n - r
            cnt[code(s[l])]--
            l++
        }
        r++
    }
    return ans
};
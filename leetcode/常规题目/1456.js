/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 11:58:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 11:59:00
 * @FilePath: /js-demo/leetcode/常规题目/1456.js
 */
/*
定长子串中元音的最大数目
    给你字符串 s 和整数 k 。
    请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
    英文中的 元音字母 为（a, e, i, o, u）。
示例 1：
    输入：s = "abciiidef", k = 3
    输出：3
    解释：子字符串 "iii" 包含 3 个元音字母。
示例 2：
    输入：s = "aeiou", k = 2
    输出：2
    解释：任意长度为 2 的子字符串都包含 2 个元音字母。
示例 3：
    输入：s = "leetcode", k = 3
    输出：2
    解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
示例 4：
    输入：s = "rhythms", k = 4
    输出：0
    解释：字符串 s 中不含任何元音字母。
示例 5：
    输入：s = "tryhard", k = 4
    输出：1
提示：
    1 <= s.length <= 10^5
    s 由小写英文字母组成
    1 <= k <= s.length
*/
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    let n = s.length
    let count = 0
    let check = ch => ['a', 'e', 'i', 'o', 'u'].includes(ch)
    for(let i = 0; i < k; i++) if(check(s[i])) count += 1
    let max = count
    for(let i = k; i < n; i++){
        if(check(s[i - k])) count -= 1
        if(check(s[i])) count += 1
        max = Math.max(max, count)
    }
    return max
};
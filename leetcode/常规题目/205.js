/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 14:01:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 15:48:05
 * @FilePath: /js-demo/leetcode/常规题目/205.js
 */
/*
205. 同构字符串
    给定两个字符串 s 和 t，判断它们是否是同构的。
    如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
    每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，
    相同字符只能映射到同一个字符上，字符可以映射到自己本身。
示例 1:
    输入：s = "egg", t = "add"
    输出：true
示例 2：
    输入：s = "foo", t = "bar"
    输出：false
示例 3：
    输入：s = "paper", t = "title"
    输出：true
提示：
    可以假设 s 和 t 长度相同。
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let s2t = {}
    let t2s = {}
    for (let i = 0; i < s.length; i++) {
        let sCh = s[i];
        let tCh = t[i];
        if((s2t[sCh] && s2t[sCh] != tCh) || (t2s[tCh] && t2s[tCh] != sCh)) return false
        s2t[sCh] = tCh
        t2s[tCh] = sCh
    }
    return true
};

console.log(isIsomorphic('egg', 'add'))
console.log(isIsomorphic('foo', 'bar'))
console.log(isIsomorphic('paper', 'title'))
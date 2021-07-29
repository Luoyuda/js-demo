/*
 * @Author: xiaohuolong
 * @Date: 2021-07-25 21:54:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-25 22:26:22
 * @FilePath: /js-demo/leetcode/常规题目/567.js
 */
/*
567. 字符串的排列
    给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
    换句话说，第一个字符串的排列之一是第二个字符串的 子串 。
示例 1：
    输入: s1 = "ab" s2 = "eidbaooo"
    输出: True
    解释: s2 包含 s1 的排列之一 ("ba").
示例 2：
    输入: s1= "ab" s2 = "eidboaoo"
    输出: False
提示：
    1 <= s1.length, s2.length <= 104
    s1 和 s2 仅包含小写字母
*/
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false;
    }
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()];
    }
    let left = 0;
    for (let right = 0; right < m; ++right) {
        const x = s2[right].charCodeAt() - 'a'.charCodeAt();
        ++cnt[x];
        while (cnt[x] > 0) {
            --cnt[s2[left].charCodeAt() - 'a'.charCodeAt()];
            ++left;
        }
        if (right - left + 1 === n) {
            return true;
        }
    }
    return false;
};
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    let n = s1.length
    let m = s2.length
    if(m < n) return false
    const cnt = new Array(26).fill(0)
    const a = 'a'.charCodeAt()
    const c = x => x.charCodeAt() - a
    for(let x of s1) --cnt[c(x)]
    let l = r = 0
    while(r < m){
        let x = c(s2[r])
        ++cnt[x]
        r++
        while(cnt[x] > 0){
            --cnt[c(s2[l++])]
        }
        if(r - l === n) return true
    }
    return false
};
var tests = [
    [['ab', 'eidbaooo'], true],
    [['ab', 'eidboaoo'], false]
]
tests.forEach(([args, res]) => {
    let ret = checkInclusion(...args)
    if(ret !== res){
        console.log(args)
    }
})
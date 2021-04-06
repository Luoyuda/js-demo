/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 14:29:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 14:34:09
 * @FilePath: /js-demo/leetcode/常规题目/1768.js
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
1768. 交替合并字符串
    给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。
    如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
    返回 合并后的字符串 。
示例 1：
    输入：word1 = "abc", word2 = "pqr"
    输出："apbqcr"
    解释：字符串合并情况如下所示：
    word1：  a   b   c
    word2：    p   q   r
    合并后：  a p b q c r
示例 2：
    输入：word1 = "ab", word2 = "pqrs"
    输出："apbqrs"
    解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
    word1：  a   b 
    word2：    p   q   r   s
    合并后：  a p b q   r   s
示例 3：
    输入：word1 = "abcd", word2 = "pq"
    输出："apbqcd"
    解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
    word1：  a   b   c   d
    word2：    p   q 
    合并后：  a p b q c   d
提示：
    1 <= word1.length, word2.length <= 100
    word1 和 word2 由小写英文字母组成
 */
var mergeAlternately = function(word1, word2) {
    let str = ''
    let i = 0
    let j = 0
    while (i < word1.length || j < word2.length){
        if(word1[i]){
            str += word1[i]
        }
        if(word2[j]){
            str += word2[j]
        }
        i++
        j++
    }
    return str
};

console.log(mergeAlternately('abc', 'pqr'))
console.log(mergeAlternately('ab', 'pqrs'))
console.log(mergeAlternately('abcd', 'pq'))